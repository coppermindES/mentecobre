import logging
import threading
import uuid

import requests
from coppermind.models import Page
from django.conf import settings
from django.core.cache import cache
from django.utils.dateparse import parse_datetime

COPPERMIND_URLS = {"en": "https://coppermind.net/w/api.php", "es": "https://es.coppermind.net/w/api.php"}
CACHE_KEY_UPDATE_PAGES_IN_PROGRESS = "coppermind::update_pages::running"
CACHE_KEY_UPDATE_PAGES_STATUS = "coppermind::update_pages::status::"

logger = logging.getLogger("coppermind")


class CoppermindManager:
    class UpdatePagesStatus:
        IN_PROGRESS = "In progress"
        COMPLETED = "Completed"
        ERROR = "Error"
        THREAD_ERROR = "Thread Error"
        THREAD_CREATED = "Thread Created"

    @staticmethod
    def connect_to_coppermind(url, params):

        headers = {"User-Agent": settings.COPPERMIND_USER_AGENT}

        session = requests.Session()
        session.headers.update(headers)

        response = session.get(
            url=url,
            params=params,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()

    def sync_pages(self, url, wiki, namespace=0):

        params = {
            "action": "query",
            "format": "json",
            "prop": "info",
            "generator": "allpages",
            "inprop": "url",
            "gapnamespace": namespace,
            "gaplimit": "max",
        }

        created_or_updated = 0

        while True:
            logging.info("Connecting to Coppermind API")
            response = self.connect_to_coppermind(
                url,
                params,
            )

            logging.info("Processing results from Coppermind API")
            pages_data = response.get("query", {}).get("pages", {})

            pages_to_create = []

            for page_data in pages_data.values():
                pages_to_create.append(
                    Page(
                        wiki=wiki,
                        page_id=page_data["pageid"],
                        ns=page_data["ns"],
                        title=page_data["title"],
                        touched=parse_datetime(page_data["touched"]),
                        fullurl=page_data["fullurl"],
                        editurl=page_data["editurl"],
                    )
                )

            logging.info("Creating/updating values on database")
            Page.objects.bulk_create(
                pages_to_create,
                update_conflicts=True,
                update_fields=[
                    "ns",
                    "title",
                    "touched",
                    "fullurl",
                    "editurl",
                    "synced_at",
                ],
                unique_fields=[
                    "wiki",
                    "page_id",
                ],
            )

            created_or_updated += len(pages_to_create)

            if "continue" not in response:
                logging.info("Reached end of data")
                break

            params.update(response["continue"])

        return created_or_updated

    def update_pages(self, language: str, namespaces: list = settings.COPPERMIND_NAMESPACES, thread_id: str = ""):
        # status = self.UpdatePagesStatus.IN_PROGRESS

        try:
            url = COPPERMIND_URLS[language]
            for namespace in namespaces:
                self.sync_pages(url, language, namespace)

        except Exception as err:
            logging.exception(err)
            # status = self.UpdatePagesStatus.ERROR
            raise err

        # finally:
        #     self.update_thread_status_in_cache(thread_id=thread_id, status=status, timeout=7200)
        #     logger.info(f'Calculate Data Thread {thread_id} completed with status "{status}"')
        #     cache.delete(CACHE_KEY_UPDATE_PAGES_IN_PROGRESS)

    def lock_update_pages_execution(self):
        cache.set(CACHE_KEY_UPDATE_PAGES_IN_PROGRESS, 1, timeout=3600)

    @staticmethod
    def update_thread_status_in_cache(thread_id: str, status: str, timeout: int = 3600):
        cache_key = f"{CACHE_KEY_UPDATE_PAGES_STATUS}{thread_id}"
        cache.set(cache_key, status, timeout=timeout)

    @staticmethod
    def get_thread_status_from_cache(thread_id: str) -> str | None:
        cache_key = f"{CACHE_KEY_UPDATE_PAGES_STATUS}{thread_id}"
        return cache.get(cache_key)

    def init_update_pages(self, language, namespaces):
        """
        Initialize a thread to update pages.

        Only one concurrent thread in allowed. If other thread is already in
        progress, an error will be returned.
        """

        thread_id = str(uuid.uuid4())
        if not cache.set(CACHE_KEY_UPDATE_PAGES_IN_PROGRESS, thread_id, timeout=3600):
            current_thread_id = cache.get(CACHE_KEY_UPDATE_PAGES_IN_PROGRESS)
            return {
                "result": "error",
                "message": f"La actualización ya está en proceso (thread_id: {current_thread_id})",
            }

        self.update_thread_status_in_cache(thread_id, self.UpdatePagesStatus.IN_PROGRESS)

        logging.info(f"Update pages has started (thread_id: {thread_id})")
        process = threading.Thread(
            target=self.update_pages, kwargs={"thread_id": thread_id, "language": language, "namespaces": namespaces}
        )
        process.start()
        return {"result": "Se está procesando la actualización", "thread_id": thread_id}
