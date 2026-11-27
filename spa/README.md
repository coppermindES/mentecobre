# Mentecobre

Front React + Vite para la Coppermind en español.

Sin `VITE_API_URL`, la aplicación usa las semillas de `src/data/contracts` y `public/data/articles.json`. Con `VITE_API_URL`, llama a la API descrita en `docs/api-contrato-openapi.yml`.

En modo mock los datos se guardan en localStorage con claves `mentecobre.<clave>.vN`, así que editar una semilla no se refleja en un navegador que ya tiene datos guardados: hay que borrar el localStorage. Los usuarios de prueba (`traductor`, `revisor`, `admin`) y sus contraseñas están en `src/auth/mockUsers.js`.

Requiere Node 22.

`npm install`, `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`. Para validar el contrato: `node scripts/validar-openapi.mjs`.

No hay tests automatizados.
