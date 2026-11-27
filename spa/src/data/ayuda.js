
import imgTraducir0 from "../assets/images/ayuda/img-1.png";
import imgTraducir1 from "../assets/images/ayuda/img-2.png";
import imgTraducir2 from "../assets/images/ayuda/img-3.png";
import imgTraducir3 from "../assets/images/ayuda/img-4.png";
import imgTraducir4 from "../assets/images/ayuda/img-5.png";
import imgTraducir5 from "../assets/images/ayuda/img-6.png";
import imgTraducir6 from "../assets/images/ayuda/img-7.png";
import imgTraducir7 from "../assets/images/ayuda/img-8.png";
import imgTraducir8 from "../assets/images/ayuda/img-9.png";
import imgTraducir9 from "../assets/images/ayuda/img-10.png";
import imgTraducir10 from "../assets/images/ayuda/img-11.png";
import imgTraducir11 from "../assets/images/ayuda/img-12.png";
import imgTraducir12 from "../assets/images/ayuda/img-13.png";
import imgTraducir13 from "../assets/images/ayuda/img-14.png";
import imgTraducir14 from "../assets/images/ayuda/img-15.png";
import imgTraducir15 from "../assets/images/ayuda/img-16.png";
import imgTraducir16 from "../assets/images/ayuda/img-17.png";
import imgTraducir17 from "../assets/images/ayuda/img-18.png";
import imgTraducir18 from "../assets/images/ayuda/img-19.png";
import imgAct1 from "../assets/images/ayuda/actualizar/img-3.png";
import imgAct2 from "../assets/images/ayuda/actualizar/img-4.png";
import imgAct3 from "../assets/images/ayuda/actualizar/img-5.png";
import imgAct4 from "../assets/images/ayuda/actualizar/img-6.png";
import imgAct5 from "../assets/images/ayuda/actualizar/img-7.png";
import imgAct6 from "../assets/images/ayuda/actualizar/img-8.png";
import imgAct7 from "../assets/images/ayuda/actualizar/img-9.png";
import imgAct8 from "../assets/images/ayuda/actualizar/img-10.png";
import imgAct9 from "../assets/images/ayuda/actualizar/img-11.png";
import imgAct10 from "../assets/images/ayuda/actualizar/img-12.png";
import imgAct11 from "../assets/images/ayuda/actualizar/img-13.png";
import imgAct12 from "../assets/images/ayuda/actualizar/img-14.png";
import imgAct13 from "../assets/images/ayuda/actualizar/img-15.png";
import imgWiki1 from "../assets/images/ayuda/wiki/img-3.png";
import imgWiki2 from "../assets/images/ayuda/wiki/img-4.png";
import imgWiki3 from "../assets/images/ayuda/wiki/img-5.png";
import imgWiki4 from "../assets/images/ayuda/wiki/img-6.png";
import imgWiki5 from "../assets/images/ayuda/wiki/img-7.png";
import imgWiki6 from "../assets/images/ayuda/wiki/img-8.png";
import imgWiki7 from "../assets/images/ayuda/wiki/img-9.png";
import imgWiki8 from "../assets/images/ayuda/wiki/img-10.png";
import imgWiki9 from "../assets/images/ayuda/wiki/img-11.png";
import imgWiki10 from "../assets/images/ayuda/wiki/img-12.png";
import imgWiki11 from "../assets/images/ayuda/wiki/img-13.png";
import imgWiki12 from "../assets/images/ayuda/wiki/img-14.png";
import imgWiki13 from "../assets/images/ayuda/wiki/img-15.png";
import imgWiki14 from "../assets/images/ayuda/wiki/img-16.png";
import imgWiki15 from "../assets/images/ayuda/wiki/img-17.png";
import imgWiki16 from "../assets/images/ayuda/wiki/img-18.png";
import imgWiki17 from "../assets/images/ayuda/wiki/img-19.png";

export function parrafo(texto) {
  return { tipo: "p", texto }
}

export function lista(items, ol = false) {
  return { tipo: ol ? "ol" : "ul", items }
}

export function sublista(items) {
  return { tipo: "sublista", items }
}

export function codigo(texto) {
  return { tipo: "code", texto }
}

export function nota(texto) {
  return { tipo: "nota", texto }
}

export function h3(texto) {
  return { tipo: "h3", texto }
}

export function imagen(src, pie) {
  return { tipo: "imagen", src, pie }
}

export function imagenes(items) {
  return { tipo: "imagenes", items }
}

export function tabla(columnas, filas, subColumnas) {
  return { tipo: "tabla", columnas, filas, subColumnas }
}

export const ARTICULOS = {
  introduccion: {
    slug: "introduccion",
    titulo: "Introducción",
    icono: "menu_book",
    sub: "Cómo funciona el proyecto, quién lo organiza y cuál es el flujo de trabajo.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "¡Bienvenide al proyecto de traducción de la Coppermind al español!"
          ),
          parrafo(
            "Normalmente, la introducción al modelo de trabajo solíamos hacerla a través de videollamada, compartiendo pantalla, enseñando una a una cada una de las herramientas de trabajo y enseñando cada cosa que había que hacer. Pero eso se traducía en, a lo mejor, 2 horas en las que nosotras hablábamos y los nuevos traductores se quedaban con cara de «no sé dónde me he metido ni qué me acaba de contar esta gente». Es por eso que, como primer acercamiento, creemos que es mejor que puedas leerlo a tu ritmo y ya sepas por dónde van los tiros y puedas consultarnos las dudas que te hayan surgido cuando nos reunamos."
          ),
          parrafo(
            "Lo primero de todo, queremos darte las gracias por haberte unido a este proyecto loco que es la traducción de la Coppermind al español. Un trabajo titánico que seguramente dure varios años, ya que su versión en inglés está en continua actualización. Esta será la página de ayuda básica; podrás encontrar el método de traducción, los títulos de las sagas, resolver dudas sobre qué términos van en mayúsculas o minúsculas, cómo traducir las citas, etc. No dudes en consultarla cada vez que lo necesites o preguntarnos a través del servidor de Discord."
          ),
          parrafo(
            "El modo de trabajo que tenemos actualmente parte de un listado de absolutamente todos los artículos que existen en la web original, que nosotros hemos filtrado por universo al que pertenecen (la saga de la que se saca esa información) y más tarde categorizada según la prioridad de traducción que debería tener. De esta forma, cuando empezamos a traducir una saga concreta (actualmente nos centramos en información que comparte todo el Cosmere, Nacidos de la bruma y El archivo de las tormentas), nos centramos primero en sistemas de magia o personajes principales (prioridad alta) antes que en personajes secundarios o lugares del mundo en cuestión (prioridad media o baja)."
          ),
        ],
      },
      {
        h: "¿Qué pasos se siguen para traducir cada artículo?",
        cuerpo: [
          lista([
            "El primero de todos será que te hagas un usuario en la Coppermind en inglés para que nosotros te demos los permisos para que puedas editar en español. Esto solo será necesario la primera vez.",
            "Lo siguiente será la herramienta de gestión, llamada mentecobre (vulgarmente entre nosotros, sirayastein). En ella aparecerán por orden y de uno en uno todos los artículos que existen por cada saga. Normalmente dividimos a los traductores por sagas para poder repartir trabajo y avanzar en varias categorías a la vez. En este momento TODOS hacemos de la sección Cosmere (que sería la prioridad absoluta a la hora de asignarte artículo) y luego dos grupos, uno para Nacidos de la bruma y otro para El archivo de las tormentas. Con un solo clic podrás asignarte el artículo que aparezca como «siguiente artículo disponible». De esta forma quedarás a cargo de él hasta que lo finalices.",
            "Trabajar el código de la copper. Esta es la parte de traducción como tal. Al principio puede asustar un poco, pero en cuanto te hagas a ver el formato que tiene no tendrás ningún problema.",
            "Una vez hayas terminado, puedes volver a la herramienta mentecobre y marcar el artículo como traducido. Asegúrate de que cumple el Check de traducción antes de hacerlo.",
          ]),
          parrafo(
            "Tu trabajo en ese artículo termina aquí. Lo siguiente será que un revisor se lo asigne para comprobar que está todo correcto para marcarlo como finalizado."
          ),
        ],
      },
      {
        h: "¿Y qué pasa cuando los artículos se actualizan en inglés?",
        cuerpo: [
          parrafo(
            "Una vez al mes revisamos todos los cambios que han hecho en la Coppermind en inglés y filtramos los que son de páginas que ya hemos traducido. Si el cambio es pequeño, se hará en ese mismo momento. Si el cambio es grande, el artículo volverá a aparecer en la herramienta mentecobre para que el siguiente traductor libre se lo asigne y edite lo que sea necesario. Luego volvería a pasar por la revisión y así continuamente."
          ),
          parrafo(
            "Como introducción básica al modo de trabajo (los pasos fundamentales que seguimos) puede valer. La recomendación que te hacemos ahora es que sigas navegando por esta web de ayuda y te familiarices con el código de la Coppermind. Arriba del todo tienes otras pestañas con información sobre cómo es, ya en profundidad, traducir cada artículo, así que te animamos a que vayas a «Cómo traducir» y lo veas con tus propios ojos."
          ),
          nota(
            "Recuerda que todo esto te lo explicaremos y resolveremos todas tus dudas cuando hablemos por llamada, que estamos aquí para ayudarte y apoyarte y que siempre estamos dispuestas para resolver cualquier duda cuando te surja."
          ),
        ],
      },
    ],
  },

  "como-traducir": {
    slug: "como-traducir",
    titulo: "Cómo traducir",
    icono: "translate",
    sub: "Pasos y buenas prácticas para traducir un artículo al castellano.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "El método actual de traducción se realiza enteramente en la web de la coppermind, y la gestión y organización se hacen en el llamado «Mentecobre» o «Sirayastein»."
          ),
          parrafo(
            "Para poder empezar a trabajar, lo primero de todo es acceder con tu usuario y contraseña al Mentecobre. Si has olvidado tu contraseña ponte en contacto con Sira a través del discord de traducción para que te ayude en el proceso. Para poder asignarte un artículo, deberás entrar en la pestaña «Traducción»."
          ),
          imagenes([
            [imgTraducir0, "Acceso y autenticación en el Mentecobre"],
            [imgTraducir1, "La pestaña «Traducción» del Mentecobre"],
          ]),
          parrafo(
            "La primera vez que accedas (o cuando no tengas ningún artículo asignado a tu usuario) verás a John Travolta mirando el vacío a su alrededor. La parte de la izquierda es la que te indica el artículo en el que estás trabajando en este momento, y la parte derecha indica el siguiente artículo que habría que asignarse para traducir. En este caso, que no tienes nada pendiente, tendrías que darle al botón que dice «Asignar» de cualquiera de los universos disponibles."
          ),
          imagen(imgTraducir2, "El Mentecobre sin artículos asignados: John Travolta y el botón «Asignar»"),
          parrafo(
            "Una vez asignado un artículo, aparecen las diferentes cosas que lo componen:"
          ),
          lista([
            "El primer texto en azul (Teod, a la izquierda): enlace directo a la página de la coppermind en inglés, para tener el texto de referencia.",
            "El segundo texto en azul (Teod, a la derecha): enlace directo a la coppermind en español, la página en la que debes hacer la traducción.",
            "Elantris: el planeta / saga / sección de la coppermind a la que pertenece este artículo concreto.",
            "Drive: enlace a una traducción previa del artículo. Estará deshabilitado la mayor parte de las veces.",
            "Notas: cuadro de texto en el que puedes dejar avisos o notas a los revisores. En caso de que aparezca «ACTUALIZACIÓN MENSUAL», revisa la página «Cómo actualizar».",
            "Marcar como traducido: botón que sirve para dar como terminada la traducción del artículo y que pase a la fase de revisión.",
          ]),
        ],
      },
      {
        h: "¿Cómo traduzco el artículo?",
        cuerpo: [
          parrafo(
            "Lo primero, entrando en la copper en inglés y copiando todo el código del artículo correspondiente desde la pestaña editar, para asegurarnos de que tenemos la versión más reciente. A continuación accedemos a la coppermind en español y (habiendo accedido con vuestro usuario y contraseña) pegamos el código en la pestaña Editar."
          ),
          parrafo("Los primeros pasos, y fundamentales:"),
          lista([
            "Copiar todo el código.",
          ]),
          lista([
            "Añadir {{in progress}} al inicio. Esto generará un mensaje automático que avise de que el artículo está en proceso de traducción.",
            "Añadir [[en:nombre_del_articulo_en_ingles]]. Esto hará que en la barra de accesos directos de la izquierda de la pantalla aparezca un botón que redirija directamente a la página en inglés de la que hemos sacado la información.",
          ]),
          imagenes([
            [imgTraducir3, "Inicio del código en el artículo «Adonalsium»"],
            [imgTraducir4, "Inicio del código en el artículo «Arcanum ilimitado»"],
          ]),
          parrafo(
            "Una vez el artículo pase por manos de los revisores, cambiarán ese «in progress» y el artículo figurará dentro de la categoría: Artículos ya traducidos."
          ),
          imagen(imgTraducir5, "Vista del artículo una vez pegado el código en la pestaña «Editar»"),
        ],
      },
      {
        h: "La tabla de información básica",
        cuerpo: [
          parrafo(
            "Lo primero de todo hace referencia a la tabla básica de información. Los elementos fijos de la tabla (Recipiente, Lasca, Astilla) se traducen automáticamente, solo debes cambiar lo que hay después del «igual». Fíjate también en cómo los hipervínculos se han modificado para que tenga sentido. Recuerda que los títulos de los libros, novelas y novellas debe ir en cursiva."
          ),
          imagenes([
            [imgTraducir6, "Comparativa de la tabla de información: pestaña «Editar» y «Leer»"],
            [imgTraducir7, "Detalle de la tabla de información básica"],
            [imgTraducir8, "Hipervínculos adaptados en la tabla de información"],
          ]),
        ],
      },
      {
        h: "Las citas y las referencias",
        cuerpo: [
          parrafo(
            "Este es el formato con el que aparecen las citas. Normalmente, cuando aparece una, suele ser al inicio del todo, pero en artículos largos o de personajes importantes, pueden aparecer unas cuantas. Traducimos manteniendo el sentido en los hipervínculos en caso de que aparezca algún verbo conjugado, plurales o abreviaturas."
          ),
          imagen(imgTraducir9, "Formato con el que aparecen las citas"),
          parrafo(
            "Las referencias ({{wob ref|8042}}, {{book ref|mb6|22}} o {{epigraph ref|sa3|40}}) marcan en qué lugar de qué libro aparece esa frase o información. Esa parte no se toca, ya que se genera automáticamente y el nombre del libro en cuestión aparecerá en español directamente. Las referencias deben ir siempre colocadas después del signo de puntuación:"
          ),
          codigo(
            '...en su enfrentamiento con [[Yezriar]]{{book ref|sa3|3}}.  ->  INCORRECTO\n...en su enfrentamiento con [[Yezriar]].{{book ref|sa3|3}}  ->  CORRECTO'
          ),
          nota(
            "Si en algún momento, cuando reviséis las referencias os aparece «Faltan metadatos de Arcanum» en rojo, solo tenéis que hacer clic en ese mismo enlace. Se os abrirá una página de edición de la coppermind que se autorellena. No tenéis más que darle a Guardar cambios y el error estará solucionado."
          ),
          imagenes([
            [imgTraducir10, "El error «Faltan metadatos de Arcanum» en la referencia"],
            [imgTraducir11, "Página de edición que se autorellena para corregir la referencia"],
          ]),
        ],
      },
      {
        h: "El artículo propiamente dicho",
        cuerpo: [
          parrafo(
            "Lo siguiente ya es artículo puro y duro. Texto, texto, texto y más texto. Tendrás que ir comparando el texto que hizo el anterior traductor con lo que aparece en la coppermind en español (una vez has copiado el código con los posibles cambios). Puedes directamente copiar y pegar respetando siempre las referencias. En caso de que elimines alguna o algún caracter que necesite para funcionar, aparecerá texto en lugar del formato del número, que suele ser el número entre corchetes y en superscript."
          ),
          imagen(imgTraducir12, "Referencias marcadas en amarillo dentro del texto del artículo"),
          parrafo(
            "Estamos en proceso de subir las imágenes de dentro de los libros y que tienen texto en ellas, ya que por el momento solo están en inglés. Cuando os encontréis con alguna de ellas, consultad «Imágenes con texto» para ver si se encuentra en el listado. Solo tendréis que cambiar un nombre por otro como se os indica allí. En caso de que la imagen no aparezca en esa lista, comentadlo por el canal de Discord para que la busquemos y subamos lo antes posible."
          ),
          imagenes([
            [imgTraducir13, "Ejemplo de imagen de un libro con texto en inglés (mapa manuscrito)"],
            [imgTraducir14, "Tabla de metales de las artes metálicas de Scadrial"],
          ]),
        ],
      },
      {
        h: "Las categorías",
        cuerpo: [
          parrafo(
            "El último paso es traducir las categorías que aparecen al final del texto y que son las que ayudan a catalogar cada uno de ellos en su saga correspondiente, así como para poder diferenciar si es un personaje, una localización, etc. También permite agrupar a los personajes por el sistema de magia al que tienen acceso, y es por esto por lo que cada artículo puede tener varias categorías a las que pertenece."
          ),
          parrafo(
            "Las categorías se asignan a una página simplemente poniendo su enlace en ellas. Todas siguen esta estructura [[Categoría:Nombre de la categoría]]. Al igual que en cualquier tipo de enlace, las mayúsculas son importantísimas o no se enlazará a la categoría completa. Muchas de las categorías se asignan mediante las plantillas."
          ),
          parrafo(
            "En el caso de que os encontréis alguna categoría asignada al final del artículo en el que estáis trabajando, hemos creado un buscador (tenéis acceso a él en la mentecobre o este enlace) para que sepáis qué tenéis que poner. Buscáis el nombre y copiáis lo que os aparezca literalmente como traducción. Si algún nombre no aparece, podéis avisar a través del Discord, porque será una categoría nueva y habrá que crearla. Si cuando cambiáis el nombre de la categoría, esta aparece en rojo igualmente, revisad que esté correctamente escrita."
          ),
          imagenes([
            [imgTraducir15, "Categorías al final del código del artículo"],
            [imgTraducir16, "Categoría traducida y enlazada"],
            [imgTraducir17, "El buscador de categorías del Mentecobre"],
          ]),
        ],
      },
      {
        h: "Guardar y marcar como traducido",
        cuerpo: [
          parrafo(
            "Una vez lo tienes todo copiado, vete a la parte inferior de la pantalla. Tienes la opción de darle a «Guardar cambios» (lo que te llevará a la pestaña Leer con todos los cambios que has hecho guardados) o darle a «Mostrar cambios» (una manera de ver cómo quedaría y si hay algún error en la página)."
          ),
          imagen(imgTraducir18, "El artículo terminado en la pestaña «Leer»"),
          parrafo(
            "Ahora que tu artículo está en español, bonito, precioso, revisa que todos los hipervínculos estén en azul y no haya nada en rojo. Una vez estés conforme, puedes volver al Mentecobre/Sirayastein y marcar el artículo como traducido."
          ),
          nota(
            "RECUERDA QUE CUALQUIER DUDA QUE TENGAS LA PUEDES PREGUNTAR POR EL CANAL #CONSULTAS DEL DISCORD, Y QUE SI NECESITAS QUE SE TE EXPLIQUEN LAS COSAS VARIAS VECES, SOLO COBRAMOS A PARTIR DE LA NÚMERO 16, POR ESO DE MANTENER EL LORE Y TAL..."
          ),
        ],
      },
    ],
  },

  "como-actualizar": {
    slug: "como-actualizar",
    titulo: "Cómo actualizar",
    icono: "update",
    sub: "Cómo mantener al día las ediciones y novedades de la Coppermind.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "Con el trabajo impresionante que ha realizado nuestro equipo, hemos alcanzado un punto increíble: ¡la Coppermind en español está prácticamente al día en lo referente a los universos del Cosmere! Esto nos permite dar un paso adelante en nuestra misión y enfocarnos en mantener la Coppermind en español actualizada con cada nueva publicación, revelación y detalle que surja."
          ),
          parrafo(
            "A partir de ahora, la tarea de actualización será responsabilidad compartida de todo el equipo. Este nuevo enfoque nos permitirá garantizar que cada artículo refleje la información más reciente, manteniendo siempre el estándar de calidad que nos caracteriza. Para facilitar el proceso, hemos creado esta guía con pasos claros y herramientas útiles. Las dos primeras secciones servirán para localizaros según desde dónde trabajéis (Trello o Mentecobre), mientras que en la tercera se detalla todo lo referido al cambio mensual en sí, ya dentro de la propia Coppermind."
          ),
          parrafo("Si surge cualquier duda, no dudéis en contactarnos."),
        ],
      },
      {
        h: "Sección Trello",
        cuerpo: [
          parrafo(
            "¡Bienvenides al Trello de los Cambios Mensuales! Trello es el espacio de trabajo donde hemos estado administrando, hasta ahora, los cambios mensuales de la web. El espacio de trabajo se gestiona en columnas de tarjetas."
          ),
          imagenes([
            [imgAct1, "El tablero «Cambios Mensuales» del Trello"],
            [imgAct2, "El espacio de trabajo gestionado en columnas de tarjetas"],
          ]),
          parrafo("En la primera columna, a la izquierda del todo, nos aparecen los tipos de cambios mensuales:"),
          lista([
            ["Páginas a crear", "son nuevas en la Coppermind en inglés y debemos crearlas en la nuestra. Al ser cosas que hay que añadir en la base de datos no tenéis que preocuparos por estas."],
            ["HTUP", "entendido como «Houston, tenemos un problema». Han sido artículos que han trasladado o cambiado el nombre, por lo que hay que hacer cambios en la base de datos. Tampoco tenéis que preocuparos por estos."],
            ["Páginas no traducidas", "han sufrido cambios en la Coppermind en inglés pero su versión en la nuestra no ha sido traducida o terminada. CUIDADO CON ESTO: lo primero es fijarnos en si alguien se ha asignado el artículo. Si la traducción está empezada, debemos hacer los cambios como los de las páginas traducidas. Si no, simplemente tendremos que copiar el código completo de la página en inglés y pegarlo en la página en español (habiendo borrado previamente el contenido de esta última)."],
            ["Páginas traducidas", "han sufrido cambios en la Coppermind en inglés pero ya están traducidas en la nuestra. Aquí no vale con copiar y pegar todo; tendremos que ir ubicando y traduciendo los cambios de uno en uno. Los pasos a seguir los encontraréis en la sección Cambios mensuales de esta misma página."],
          ], true),
          parrafo(
            "La segunda columna contiene los cambios pendientes. En ella aparecerá una tarjeta por cada artículo que necesite ser actualizado, cada una con su color correspondiente según el tipo de cambio. Aparecerán ordenadas por tipo de cambio (primero las páginas a crear, después las páginas traducidas, luego las no traducidas y, por último, los HTUP) y, dentro de cada tipo, por orden alfabético. Recordad que podéis filtrar las tarjetas por colores."
          ),
          parrafo(
            "Al empezar a trabajar en los cambios de un artículo, sean del tipo que sean, antes de nada tendremos que deslizar la tarjeta desde la columna «Pendientes» hasta la columna «En progreso» y asignárnosla. Es muy sencillo: con arrastrarla hasta la columna «En progreso» y esperar un momento debería asignársenos automáticamente. Si eso no ocurre, siempre podemos hacerlo de forma manual: al hacer click en la tarjeta y pulsar el botón «Unirse»."
          ),
          imagenes([
            [imgAct3, "Arrastrar la tarjeta hasta la columna «En progreso»"],
            [imgAct4, "Asignación de la tarjeta de forma manual"],
          ]),
          parrafo(
            "Por último, en la columna de la derecha tenemos tres botones al final. Estos no se tocan hasta que hayamos terminado el cambio de ese artículo, y los emplearemos de la siguiente manera:"
          ),
          lista([
            ["Cambios - Muchos", "el único caso en el que no hemos llevado a cabo la actualización del artículo. Lo hemos abierto, hemos visto que han añadido muchísima información y no nos apetece pararnos mucho rato con él. Al marcarlo así, enviamos la tarjetita a la columna «Artículos con cambios grandes» y queda pospuesto. ¡No te olvides de desasignártelo!"],
            ["Cambios - Ninguno", "resulta que había un gazapo en inglés que han corregido, alguna mayúscula que se les había colado o alguna expresión que ha cambiado. Los cambios realizados en el artículo en inglés no influyen en el artículo en español, así que marcamos esta casilla ¡y a por el siguiente!"],
            ["Cambios - Pocos", "ha habido algún que otro cambio pero en cinco minutines estaba listo. ¡Marcamos y a por el siguiente!"],
          ], true),
          parrafo(
            "En los dos últimos casos, marcar estas casillas hace que la tarjeta viaje automáticamente a la columna «Terminados». Si ya hemos terminado todos los cambios mensuales y solo quedan los artículos con cambios grandes, vamos a la columna, escogemos el primer artículo y arrastramos su tarjetita a la columna «En progreso». Al terminarlo, en lugar de marcar de nuevo «Cambios - Muchos», simplemente arrastramos la tarjeta a la columna «Terminados»."
          ),
          imagen(imgAct5, "Flujo completo de la tarjeta en el Trello"),
        ],
      },
      {
        h: "Sección Mentecobre",
        cuerpo: [
          parrafo(
            "¿Qué hacer si en las notas de un artículo a traducir pone «ACTUALIZACIÓN MENSUAL»? Lo primero que hay que hacer es revisar la fecha que aparece en la nota. Esta indicará el día desde el que hay que aplicar los cambios. Al entrar en la herramienta de traducción mentecobre, nos aparece que el siguiente artículo a traducir es, por ejemplo, Adolin Kholin, pero en notas especifica que es una actualización mensual. Por ello, al irnos a la Coppermind habremos de tener en mente esta fecha."
          ),
          imagen(imgAct6, "La nota «ACTUALIZACIÓN MENSUAL» en el artículo Adolin Kholin"),
        ],
      },
      {
        h: "Cambios mensuales",
        cuerpo: [
          parrafo(
            "Da igual que los estéis haciendo desde el Trello o, cuando esté implementado, desde la mentecobre: en esta sección encontraréis los pasos a seguir para llevar a cabo los cambios mensuales de cada artículo sin ningún problema."
          ),
          parrafo(
            "Lo primero de todo es entrar en el artículo en inglés e ir hasta la página «Historia», en la parte superior derecha del artículo (justo al lado de «Editar»). Aparecerán las fechas de las ediciones que ha tenido la página. Buscamos en ese listado una de las siguientes fechas, según de dónde vengamos:"
          ),
          lista([
            "Desde la mentecobre: la fecha que nos indique la nota.",
            "Desde el Trello: la fecha del último cambio del artículo en español. Si no hay fecha especificada, lo más normal es que tengamos que fijarnos en los cambios del mes anterior.",
          ]),
          imagenes([
            [imgAct7, "La fecha indicada en la nota de la pestaña Traducción"],
            [imgAct8, "El historial de ediciones del artículo en inglés"],
          ]),
          nota(
            "En el caso de artículos que estén siendo o hayan sido traducidos hace poco, tendremos que rebuscar en fechas anteriores. Es posible que quien esté haciendo la traducción haya añadido algunos de los cambios o incluso todos, pero ante la duda es mejor que nos cercioremos."
          ),
          parrafo(
            "Cuando sepamos qué fecha necesitamos, pulsamos en el círculo que aparece a su izquierda. Acto seguido, le damos al botón «Compare selected versions» o «Comparar versiones seleccionadas». Lo ideal es dejar el artículo lo más actualizado posible, por eso estaríamos añadiendo los cambios que han incluido recientemente aunque estemos haciendo los cambios mensuales de otro mes; ya que trabajamos en el artículo, podemos dejarlo con todos los cambios que aparecen y, el mes que viene, ahorrarle un poco de trabajo a otro compañero."
          ),
          imagen(imgAct9, "Selección de las versiones a comparar en la página «Historia»"),
          parrafo(
            "Una vez pulsamos el botón de comparar versiones nos encontraremos con una comparativa muy visual de las cosas que se han cambiado. Un resumen rápido, y bastante intuitivo, es:"
          ),
          lista([
            "símbolo «-» y color naranja/amarillo: cosas eliminadas.",
            "símbolo «+» y color azul: cosas añadidas.",
            "símbolo «↳»: cosas que se han movido de sitio.",
          ]),
          parrafo(
            "Además, cada frase eliminada o editada aparecerá resaltada con esos mismos colores. En esta página no aparecerá todo el código del artículo, solo aquellos párrafos que han sufrido edición y el inmediatamente anterior y posterior, lo cual nos viene genial para ayudarnos a ubicar el texto dentro del artículo."
          ),
          parrafo(
            "A partir de aquí consiste, simple y llanamente, en ir cambiando la información que ha quedado obsoleta o que era errónea, las erratas y fallos que se han podido cometer en la estructuración de los artículos. Una vez hayáis finalizado la actualización, solamente hay que volver a marcar el artículo como traducido en la herramienta de gestión, la mentecobre."
          ),
          nota(
            "Ahora os dejamos con un montón de ejemplos de cambios realizados y de la explicación. En caso de que os encontréis con algún otro que creáis que puede ser de ayuda para el equipo, solo tenéis que avisarnos y lo añadimos. Y, por supuesto, cualquier duda que surja, estamos a vuestra disposición."
          ),
          parrafo(
            "Aquí han añadido dos parámetros nuevos en la infobox del artículo, y, además, han eliminado la plantilla que marca que el artículo tiene spoilers."
          ),
          imagenes([
            [imgAct10, "Parámetros nuevos añadidos en la infobox"],
            [imgAct11, "Plantilla de spoilers eliminada del artículo"],
          ]),
          parrafo(
            "Aquí han añadido un libro nuevo dentro del parámetro «libros» de la infobox."
          ),
          parrafo(
            "Aquí un muy buen ejemplo de párrafos completos eliminados y añadidos en una actualización total del artículo y su información."
          ),
          imagenes([
            [imgAct12, "Párrafos completos eliminados y añadidos en una actualización"],
            [imgAct13, "Detalle de la comparativa de párrafos eliminados y añadidos"],
          ]),
          parrafo(
            "Y por último un ejemplo de un párrafo colocado en otra parte del artículo, por lo que aparece con la flecha. Podéis ver que cuando hay que mover un párrafo, este también puede tener información que añadir o eliminar."
          ),
        ],
      },
    ],
  },

  "como-revisar": {
    slug: "como-revisar",
    titulo: "Cómo revisar",
    icono: "fact_check",
    sub: "El proceso de revisión para garantizar la coherencia y calidad.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "El método actual de traducción se realiza enteramente en la web de la coppermind, y la gestión y organización se hacen en el llamado «Mentecobre» o «Sirayastein»."
          ),
          parrafo(
            "Para poder empezar a trabajar, lo primero de todo es acceder con tu usuario y contraseña al Mentecobre. Si no sabes aún cuál es tu usuario o has olvidado tu contraseña, ponte en contacto con Sira a través del discord de traducción para que te ayude en el proceso. Para poder asignarte un artículo, deberás entrar en la pestaña «Revisión». Esta parte funciona exactamente igual que para asignarte un artículo para traducir."
          ),
          nota(
            "Recuerda que una buena revisión no consiste siempre en retraducir el trabajo ya hecho, ya que respetamos el estilo propio que tenga cada uno de los traductores siempre y cuando la frase sea correcta. No buscamos la literalidad, sino que la información sea entendible por la persona que consulta la wiki."
          ),
          parrafo(
            "Antes de poder marcar un artículo como revisado, hay que comprobar lo que se va a guardar. Para darlo como válido se puede utilizar la siguiente lista para hacer la comprobación."
          ),
        ],
      },
      {
        h: "Lista de comprobación",
        cuerpo: [
          lista([
            "Enlace a la coppermind en inglés con el formato [[en:Nombre del artículo]].",
            "Tabla de información básica traducida (la que aparece a la derecha del artículo).",
            "Sumario inicial en español (para comprobar que hemos traducido también el título de todos los apartados).",
            "Mismo número de referencias en la web en español y en la web en inglés. Recuerda que no solo hay que revisar el número de referencias que hay, sino la cantidad de veces que aparece cada una de ellas. Cuando una misma referencia aparece varias veces, tendrá antes del nombre una letra, empezando por la «a» y avanzando por «b», «c», «d», etc., cada vez que se mencione en el texto.",
            "Todas las referencias aparecen en español (excepto las que hacen referencia a convenciones o firmas de libros que tienen nombre propio). Revisar que las referencias a archivos concretos de la coppermind están en un solo idioma.",
            "Misma información en los artículos en ambos idiomas (asegurarnos de que la información está actualizada a la versión más reciente de la coppermind en inglés).",
            "Pies de foto traducidos.",
            "Imágenes que tienen texto en la propia imagen en español en lugar de en inglés.",
            "Ningún hipervínculo de la página en rojo, deberían estar todos en azul.",
            "Categoría a la que pertenece el artículo en español (suelen aparecer al final del todo del código, después de las referencias).",
            "En caso de que el artículo haya sido marcado como {{completed}} en la Coppermind en inglés y tenga la fecha en la que se ha marcado como tal, hay que ponerla en español (solo traducir el mes, la fecha se debe dejar como estaba).",
          ]),
        ],
      },
      {
        h: "Marcar como revisado",
        cuerpo: [
          parrafo(
            "Una vez revisadas todo lo que aparece arriba, se puede proceder a sustituir el {{in progress}} de la parte superior (plantilla que indica que se está trabajando de forma activa en el artículo) por el {{translated page}}, que añade el artículo al listado de páginas ya finalizadas."
          ),
          parrafo(
            "También tienes que ir al artículo en la Coppermind en inglés y editar su código. Desplázate hasta el final del código de la página y añade [[es:nombredelarticulo]], sustituyendo «nombredelarticulo» por el título del artículo en español. ¡¡Recuerda que tiene que aparecer AL FINAL DEL TODO DEL CÓDIGO!!"
          ),
          nota(
            "RECUERDA QUE CUALQUIER DUDA QUE TENGAS LA PUEDES PREGUNTAR POR EL CANAL #CONSULTAS DEL DISCORD, Y QUE SI NECESITAS QUE SE TE EXPLIQUEN LAS COSAS VARIAS VECES, SOLO COBRAMOS A PARTIR DE LA NÚMERO 16, POR ESO DE MANTENER EL LORE Y TAL..."
          ),
        ],
      },
    ],
  },

  "check-de-traduccion": {
    slug: "check-de-traduccion",
    titulo: "Check de traducción",
    icono: "verified",
    sub: "Lista de comprobación antes de marcar un artículo como traducido.",
    secciones: [
      {
        h: "Lista de comprobación",
        cuerpo: [
          parrafo(
            "Antes de poder marcar un artículo como traducido, hay que revisar lo que se va a subir. Para darlo como válido se puede utilizar la siguiente lista para hacer la comprobación."
          ),
          lista([
            "Plantilla {{in progress}} al inicio del código.",
            "Enlace a la coppermind en inglés con el formato [[en:Nombre del artículo]].",
            "Tabla de información básica traducida (la que aparece a la derecha del artículo).",
            "Sumario inicial en español (para comprobar que hemos traducido también el título de todos los apartados).",
            "Mismo número de referencias en la web en español y en la web en inglés. Recuerda que no solo hay que revisar el número de referencias que hay, sino la cantidad de veces que aparece cada una de ellas. Cuando una misma referencia aparece varias veces, tendrá antes del nombre una letra, empezando por la «a» y avanzando por «b», «c», «d», etc., cada vez que se mencione en el texto.",
            "Todas las referencias aparecen en español (excepto las que hacen referencia a convenciones o firmas de libros que tienen nombre propio). Revisar que las referencias a archivos concretos de la coppermind están en un solo idioma.",
            "Misma información en los artículos en ambos idiomas (asegurarnos de que la información está actualizada a la versión más reciente de la coppermind en inglés en caso de que estemos subiendo contenido anterior).",
            "Pies de foto traducidos.",
            "Imágenes que tienen texto en la propia imagen en español en lugar de en inglés.",
            "Ningún hipervínculo de la página en rojo, deberían estar todos en azul.",
            "Categoría a la que pertenece el artículo en español (suelen aparecer al final del todo del código, después de las referencias).",
          ]),
          nota(
            "Esta página estará en constante cambio a medida que vayamos avanzando en el trabajo de traducción y surjan nuevas necesidades que tengamos que suplir."
          ),
        ],
      },
    ],
  },

  "mayus-minus": {
    slug: "mayus-minus",
    titulo: "Mayús / Minús",
    icono: "format_size",
    sub: "Guía de estilo sobre mayúsculas y minúsculas aplicadas a la terminología canon.",
    secciones: [
      {
        h: "Títulos",
        cuerpo: [
          parrafo(
            "Los títulos de los libros y novellas irán capitalizados solo en la inicial de la primera palabra, a no ser que haga referencia a un elemento particular con nombre propio. De esta forma, los títulos quedarían como Brazales de Duelo, Palabras radiantes o El ritmo de la guerra por poner varios ejemplos. Recordad además, que deberán ir en cursiva dentro de la Coppermind."
          ),
          nota(
            "Pequeño recordatorio de que en la saga Mistborn ha habido varios cambios importantes que afectan tanto al nombre de la saga como del primer libro."
          ),
        ],
      },
      {
        h: "Dentro del Cosmere: Mistborn",
        cuerpo: [
          parrafo("Mistborn (anteriormente «saga Nacidos de la bruma»)."),
          lista([
            "Era 1 (también llamada «trilogía original»):",
          ]),
          lista([
            "Nacidos de la bruma (anteriormente conocido como El Imperio Final)",
            "El Pozo de la Ascensión",
            "El Héroe de las Eras",
            "Historia secreta",
            "El undécimo metal",
          ]),
          parrafo("Era 2 (también llamada «saga de Wax y Wayne»):"),
          lista([
            "Aleación de ley",
            "Sombras de identidad",
            "Brazales de Duelo",
            "El metal perdido",
            "Alomante Jak y los Pozos de Eltania",
          ]),
          parrafo("Era 3 (también llamada «trilogía Sangre Espectral»)."),
        ],
      },
      {
        h: "El archivo de las tormentas",
        cuerpo: [
          parrafo("Arco 1:"),
          lista([
            "El camino de los reyes",
            "Palabras radiantes",
            "Danzante del Filo",
            "Juramentada",
            "Esquirla del amanecer",
            "El ritmo de la guerra",
            "Viento y verdad",
          ]),
          parrafo("Novelas y relatos independientes:"),
          lista([
            "Elantris",
            "La esperanza de Elantris",
            "Arcanum ilimitado",
            "El alma del emperador",
            "Sexto del Ocaso",
            "Trenza del mar Esmeralda",
            "Yumi y el pintor de pesadillas",
            "Arena Blanca",
            "El aliento de los dioses",
            "Sombras por Silencio en los Bosques del Infierno",
            "El Hombre Iluminado",
          ]),
        ],
      },
      {
        h: "Fuera del Cosmere",
        cuerpo: [
          parrafo("Alcatraz contra los bibliotecarios malvados:"),
          lista([
            "Alcatraz contra los bibliotecarios malvados",
            "Los Huesos del Escriba",
            "Los Caballeros de Cristalia",
            "Las Lentes Fragmentadas",
            "El Talento Oscuro",
            "Bastille contra los bibliotecarios malvados",
          ]),
          parrafo("Reckoners:"),
          lista([
            "Steelheart",
            "Firefight",
            "Calamity",
            "Lux",
            "Mitosis",
          ]),
          parrafo("Legión:"),
          lista([
            "Legión",
            "A flor de piel",
            "Las mentiras del contemplador",
            "Las múltiples vidas de Stephen Leeds",
            "Stephen Leeds: Death & Faxes",
          ]),
          parrafo("Citoverso. Saga Spensa:"),
          lista([
            "La defensa del Elíseo",
            "Escuadrón",
            "Estelar",
            "Citónica",
            "Desafiante",
            "Solar",
            "ReAlba",
            "Perpetua",
            "Hiperladrón",
          ]),
          parrafo("Otras historias:"),
          lista([
            "La original",
            "Firstborn",
            "Heuristic Algorithm and Reasoning Response Engine",
            "Dreamer",
            "Snapshot",
            "Guía del mago frugal para sobrevivir en la Inglaterra del medievo",
            "The Most Boring Book Ever",
            "I Hate Dragons",
            "El rithmatista",
            "Perfect State",
            "Children of the Nameless",
          ]),
        ],
      },
      {
        h: "Términos en los que se usa SIEMPRE la mayúscula",
        cuerpo: [
          parrafo(
            "SIEMPRE, independientemente del contexto:"
          ),
          lista([
            "Cosmere.",
            "Fortuna, Conexión, Intención, Identidad, Mandato: siempre que hagan referencia a los conceptos característicos de la Realmática.",
            "Esquirla: fragmentos de Adonalsium. (*Consultar apartado 3)",
            "Astilla: fragmento de una Esquirla.",
            "Astillar: el acto de crear una Astilla.",
            "Lasca: quien ha poseído el poder de una Esquirla y luego lo ha soltado.",
            "Potencia o Potencias: fuerzas fundamentales. Todos los nombres de las Potencias también llevan mayúscula (Cohesión, Gravitación...).",
            "Ritmos: los utilizados por los cantores.",
            "Reino Físico, Cognitivo y Espiritual. (*Consultar apartado 3)",
            "Teoría Realmática. (*Consultar apartado 3)",
            "Shaod, Ascender, Retornar y Romper: procesos de cambio espiritual. (*Consultar apartado 3)",
            "Desolación/es y Regreso/s: cualquier otro evento de importancia.",
            "Fusionados, Caballeros Radiantes, Retornados, Insomnes...: agrupaciones o individuos dentro de un colectivo.",
            "Recipiente.",
            "AonDor (término compuesto, se mantiene como en el original).",
            "Anti-Investidura (Investidura debe aparecer siempre en mayúsculas).",
            "Luzdeplata (todo junto y capitalizado por ser el nombre de un lugar).",
            "La batalla de la Explanada Thayleña (todos los nombres de batallas relevantes, pero con la palabra «batalla» en minúscula).",
          ]),
          nota(
            "Para Esquirla, Reinos, Teoría Realmática y los procesos de cambio espiritual (Shaod, Ascender...), ver el apartado 3 de «contextos concretos»."
          ),
        ],
      },
      {
        h: "Términos en los que NUNCA se usa la mayúscula",
        cuerpo: [
          parrafo(
            "NUNCA se escriben con mayúscula, independientemente del contexto (sí bajo reglas ortográficas normales, como principio de oración):"
          ),
          lista([
            "ADN espiritual, aspecto espiritual, ideal espiritual, atributo cognitivo, redespíritu... todas las formas derivadas de aspectos relacionados con los reinos.",
            "Alta tormenta, tormenta eterna.",
            "Brillante, alto príncipe, alto mariscal, general... y cualquier otro término de rango.",
            "Decantar, almacenar...",
            "Dysian aimiano y siah aimiano (seguimos la gramática española para los gentilicios).",
            "Esquirlada: armas y armaduras rosharianas. (*Consultar apartado 3)",
            "Éter o éteres.",
            "Fin-positivo, fin-neutral, fin-negativo.",
            "Hibridación y derivados.",
            "Hoja(s) de Honor.",
            "Luces y todos sus derivados: Luz tormentosa, luz del vacío, antiluz...",
            "Mente de metal (siempre en minúscula sea cual sea el metal que la componga).",
            "Nacido del metal.",
            "Nombres de los sistemas de magia y de los usuarios de dichos sistemas, exceptuando agrupaciones específicas: alomancia, potenciación, despertar, lanzamonedas, chocador, ajustador, aplacador...",
            "Portador/portadores de Honor (solo se utiliza la mayúscula en la palabra Honor).",
            "Red espiritual.",
            "Resonancia.",
            "Saltamundos.",
            "Seon, skaze, spren, aviares...",
            "Sistema roshariano.",
            "Sombras cognitivas.",
            "Subastral (Shadesmar sí irá con mayúscula).",
            "Títulos nobiliarios y de jerarquía: rey, almirante, comandante, lord, etc., incluido el «lord Legislador».",
            "Vínculo Nahel.",
          ]),
        ],
      },
      {
        h: "Términos que usan mayúscula en contextos concretos",
        cuerpo: [
          parrafo("Dependen del contexto (y bajo reglas ortográficas normales):"),
          lista([
            ["Aliento Divino", "único tipo de aliento que siempre llevará mayúscula. Los alientos biocromáticos, o de forma general, siempre en minúscula."],
            ["Aones en concreto / aones genéricos", "el nombre de un Aon concreto lleva mayúscula, pero «aon» va en minúscula (aon Rao, aon Ehe). «Raoden dibujó un aon en el aire». AonDor: siempre en mayúscula."],
            ["Ascender / Retornar / Romper", "en mayúscula cuando sea un evento de alteración espiritual («Kelsier Rompió en los Pozos de Hathsin»); en minúscula el resto de casos (quebrar, subir, volver)."],
            ["Avatar / avatares", "Avatar en concreto siempre en mayúscula («Patji es un Avatar de Autonomía»); los avatares de forma genérica en minúscula."],
            ["Canto del alba", "capitalizado cuando hace referencia al texto escrito; en minúscula al referirse a la lengua y a las personas que la hablaban."],
            ["Desvanecedores", "el grupo es «los Desvanecedores»; cada integrante de forma individual va en minúscula."],
            ["Generaciones kandra", "de manera general y cada generación concreta irán en mayúsculas."],
            ["Investidura / investidura", "el poder en general dentro del Cosmere siempre con mayúscula; los sistemas de magia no llevan mayúscula (alomancia, despertar...)."],
            ["Las casas o Casas", "en Roshar, «casa» en minúscula y el apellido en mayúscula (casa Kholin); en Scadrial, tanto «Casa» como el apellido en mayúscula (Casa Ladrian)."],
            ["Moldeado de almas", "la Potencia siempre en mayúscula; el objeto en minúsculas («un moldeador de almas»)."],
            ["Monasterios de Shinovar", "el Monasterio de una Orden Radiante siempre con mayúscula; un monasterio sin especificar siempre en minúscula."],
            ["Nacido de la bruma", "un usuario en minúscula; el libro «Nacidos de la bruma» capitalizado solo en su primera letra; «lord Nacido de la Bruma» como título de persona se capitaliza en todas, ya que funciona como nombre propio."],
            ["Perpendicularidad/es", "perpendicularidades concretas en mayúsculas (La Perpendicularidad de Honor); el término genérico en minúsculas."],
            ["Primera Gema", "como título en mayúscula («Hoid, portador de la Primera Gema»); el objeto no lleva mayúsculas."],
            ["Realmática", "los reinos en minúsculas como terminología genérica; mayúscula al hablar de su nombre específico (Reino Físico, Cognitivo y Espiritual)."],
            ["Shard", "los fragmentos de Adonalsium se traducen como Esquirla (mayúscula); shardblades o shardplates se traducen como esquirladas (minúscula). (*Consultar apartado 2)"],
            ["Undécimo metal", "el metal (malatium) en mayúscula: Undécimo Metal; la novella en minúscula: El undécimo metal."],
          ], true),
        ],
      },
      {
        h: "Denominación de escritos",
        cuerpo: [
          parrafo(
            "Hay varias formas de denominar la extensión de los escritos, y para ello hay que tener en cuenta la extensión del mismo. Según el número de palabras el término correcto en inglés y su traducción al español es:"
          ),
          lista([
            ["Entre 5 y 1.000 palabras", "Flash Fiction", "Micro-relatos"],
            ["Entre 3.500 y 7.500", "Short stories", "Relato"],
            ["Entre 7.500 y 17.000", "Novelletter", "Relato largo o noveleta"],
            ["Entre 17.000 y 40.000", "Novella", "Novela corta"],
            ["Más de 40.000", "Novela", "Novela"],
          ], true),
        ],
      },
    ],
  },

  "formatos-de-la-wiki": {
    slug: "formatos-de-la-wiki",
    titulo: "Formatos de la wiki",
    icono: "code",
    sub: "Los símbolos que modifican el aspecto visual del texto en la Coppermind.",
    secciones: [
      {
        h: "1.- Tablas de información básica",
        cuerpo: [
          parrafo(
            "Las plantillas para las tablas de información general del artículo, que podemos encontrar en cada artículo a la derecha del todo de la pantalla. Pueden ser sobre mundos esquirlados, personajes, formas de vida, esquirlas, libros publicados, etc. En resumen: hay muchas diferentes. Cada una de ellas tiene la posibilidad de mostrar una serie de datos específicos."
          ),
          parrafo(
            "En el caso de los personajes (dónde reside, su familia, si tiene acceso a algún tipo de investidura...) cada uno de esos datos diferentes se indica con una pleca (|), el nombre de lo que se va a hacer referencia (viene dado por la propia plantilla) y lo único que debemos cambiar es lo que hay después del signo igual (=). Permite utilizar hipervínculos para navegar más fácilmente por la coppermind."
          ),
          imagenes([
            [imgWiki1, "Plantilla de la tabla de información básica de un personaje"],
            [imgWiki2, "Ejemplo de tabla de información de un mundo"],
          ]),
        ],
      },
      {
        h: "2.- Formato del texto",
        cuerpo: [
          parrafo(
            "El modo de crear el esquema inicial es un índice de contenidos interactivo que permite viajar a diferentes puntos del artículo directamente y solo con un clic. La base es colocar el símbolo igual (=) delante y después del título de la sección. A medida que se vayan colocando más símbolos igual (=), se crearán diferentes secciones dentro de una misma."
          ),
          imagenes([
            [imgWiki3, "Esquema inicial o índice de contenidos interactivo"],
            [imgWiki4, "Ejemplo de secciones creadas con el símbolo igual (=)"],
          ]),
          parrafo(
            "Para el texto propiamente dicho se utiliza la comilla simple ('). Con 3 comillas simples antes y después del texto se crea negrita; con dos comillas simples, cursiva."
          ),
          imagenes([
            [imgWiki5, "Formato de texto: negrita con tres comillas simples"],
            [imgWiki6, "Formato de texto: cursiva con dos comillas simples"],
          ]),
        ],
      },
      {
        h: "3.- Vínculos",
        cuerpo: [
          parrafo(
            "En la parte de los vínculos tenemos varias opciones. Lo único que debemos saber es a dónde queremos ir. Lo que tienen todas las opciones en común es que el texto debe ir entre doble corchete."
          ),
          h3("3.1. Queremos ir a un artículo"),
          parrafo(
            "Si el artículo al que quiero que lleve y lo que tengo que poner en el texto traducido coincide, es tan simple como enmarcar la palabra entre dos corchetes. Para el plural simple (que se construye añadiendo una S solamente) se puede incluir junto a los corchetes del final. Este último ejemplo solo funciona si el enlace tiene una sola palabra, o el plural lo lleva la última."
          ),
          codigo(
            "[[Adonalsium]] fue dividido en dieciséis [[Esquirla]]s\nEn Sel podemos encontrar [[seon]]es"
          ),
          parrafo(
            "Ejemplo de cómo NO deben hacerse los plurales, ya que ambas palabras deben tener la «S» final. Debería ser de la siguiente forma:"
          ),
          codigo(
            "INCORRECTO:\n... utilizando para esto las [[armadura esquirlada]]s\n\nCORRECTO:\n... utilizando para esto las [[armadura esquirlada|armaduras esquirladas]]"
          ),
          parrafo(
            "Si el artículo al que quiero que lleve y lo que tengo que poner en el texto no coinciden, hay que construir el vínculo en dos partes. Empezamos con el doble corchete, después el nombre del artículo al que queremos ir, una pleca «|» y el texto que queremos que aparezca."
          ),
          codigo(
            "Lift viajó con [[Wyndle|su spren]]  ->  El enlace debe llevar a Wyndle\nLift viajó con su spren"
          ),
          h3("3.2. Queremos ir a la sección concreta de un artículo"),
          codigo(
            "Una [[Piedrabase#Gemas perfectas|gema perfecta]] podría conservar la luz tormentosa tanto tiempo, pero son muy caras"
          ),
          h3("3.3. El enlace debe llevar a la wikipedia"),
          codigo(
            "...en Roshar, cuyos ojos carecen de [[wikipediaes:Pliegue epicántico|pliegues epicánticos]]."
          ),
        ],
      },
      {
        h: "4.- Citas",
        cuerpo: [
          parrafo(
            "Esta es la plantilla que da forma a las citas. Con un {{quote indica el punto en el que empieza. La primera pleca (|) marca dónde empieza la frase literal de los libros a los que hace referencia. La segunda pleca (|) sería la persona que dice dicha frase."
          ),
          imagenes([
            [imgWiki7, "Plantilla {{quote}} que da forma a las citas"],
            [imgWiki8, "Ejemplo de cita con su referencia al libro y su autor"],
          ]),
        ],
      },
      {
        h: "5.- Referencias",
        cuerpo: [
          parrafo(
            "Las referencias son el código que hace que se genere un numerito en superscript y que al final del artículo nos diga de dónde ha salido esa información."
          ),
          imagenes([
            [imgWiki9, "Código de las referencias dentro de un artículo"],
            [imgWiki10, "Ejemplo de numerito en superscript en el texto"],
            [imgWiki11, "Listado de referencias al final del artículo"],
            [imgWiki12, "Diferentes tipos de ref: book ref, wob ref, map ref y file ref"],
          ]),
          h3("5.1. Referencia a texto"),
          parrafo(
            "La primera de todas, y la más común, la book ref, interpreta que la información ha salido de un libro ya publicado. Los códigos para los libros son: sa1 para El camino de los reyes, sa2 para Palabras radiantes, sa3 para Juramentada... y así sucesivamente. En el caso de mistborn es mb1, mb2, etc. Lo siguiente y último en el código es un número, que indica el capítulo específico. Así, {{book ref|sa1|2}} es el capítulo 2 de El camino de los reyes."
          ),
          codigo(
            "{{book ref|mb3|23}}  ->  veríamos El Héroe de las Eras capítulo 23"
          ),
          parrafo(
            "Otra plantilla es la que habla de información extraída de una wob. Cada pregunta-respuesta realizada tendrá un número de identificación asociado, por lo que el formato es muy sencillo: {{wob ref|1231}}."
          ),
          h3("5.2. Referencia a imágenes"),
          parrafo(
            "También existe la posibilidad de que se haga referencia a una imagen concreta (ilustraciones, representaciones de los planetas, continentes o sistemas planetarios, por ejemplo), y son los map ref y los file ref."
          ),
          codigo(
            "{{map ref|Taldain system|sistema de Taldain}}\n\n{{file ref|Bridge Four tattoos page.jpeg|text=Tatuajes del Puente Cuatro}}\n\n(Recordad que hay que poner «text» y no «texto»; solo se cambia lo que hay detrás del signo igual.)"
          ),
        ],
      },
      {
        h: "6.- Imágenes",
        cuerpo: [
          parrafo(
            "La plantilla para insertar imágenes. Tras decirnos la plantilla que es, lo siguiente es el nombre del archivo que queremos que aparezca, y por último, separado también por una pleca (|), el texto que queremos que aparezca en el pie de foto. Se puede ver que dentro de este código se aceptan los diferentes cambios de formato e hipervínculos de la propia wiki. Por último, la posibilidad de colocarlo a un lado de la pantalla (a la derecha/right) y con unas medidas específicas (300 píxeles de ancho)."
          ),
          imagenes([
            [imgWiki13, "Plantilla para insertar imágenes"],
            [imgWiki14, "Ejemplo de imagen insertada con tamaño y alineación"],
          ]),
        ],
      },
      {
        h: "7.- Texto oculto",
        cuerpo: [
          parrafo(
            "También está la posibilidad de dejar notas dentro del código de la coppermind. Pueden ser notas sobre cosas a revisar más adelante o aclaraciones sobre por qué se ha escrito cierta cosa."
          ),
          codigo(
            "<!-- Esto solo se vería en la pestaña «Editar» -->\n<!-- Esta frase tampoco se vería -->"
          ),
          imagen(imgWiki15, "Notas ocultas dentro del código de la Coppermind"),
        ],
      },
      {
        h: "8.- Notas del traductor",
        cuerpo: [
          parrafo(
            "Otro tipo de referencias o anotaciones que se pueden añadir son las Notas del Traductor. Para cualquier aclaración que se quiera hacer respecto al término elegido para la edición en español o posibles dudas que puedan surgir al respecto."
          ),
          codigo(
            "{{ref|group=NdT|text=\"texto que queremos\"}}\n\n== Notas del traductor ==\n<references group=NdT/>"
          ),
          imagenes([
            [imgWiki16, "Ejemplo de Notas del Traductor visible en el artículo"],
            [imgWiki17, "Las Notas del Traductor al final del artículo"],
          ]),
        ],
      },
    ],
  },

  "imagenes-con-texto": {
    slug: "imagenes-con-texto",
    titulo: "Imágenes con texto",
    icono: "image",
    sub: "Imágenes (mapas, bocetos...) con texto en inglés y qué poner para que salga su versión en español.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "En algunos de los artículos, nos podremos encontrar imágenes (bien sean mapas, bien bocetos, etc) que tienen texto en inglés. La mayor parte de esas imágenes tienen una versión en español que poco a poco estamos localizando en los libros y subiendo a la Coppermind. Así mismo, a veces esas imágenes no salen en el texto, pero sí son referenciadas en las notas al final. Un ejemplo de ello puede ser la tabla de metales alománticos."
          ),
          parrafo(
            "En esta página hay una lista en constante crecimiento, con las imágenes que se han subido su versión al español y qué poner para que salgan estas en vez de su versión inglesa."
          ),
          nota(
            "Cuando encontréis una imagen con texto en inglés, consultad esta página para ver si se encuentra en el listado. Solo tendréis que cambiar un nombre por otro. En caso de que la imagen no aparezca, comentadlo por el canal de Discord para que la busquemos y subamos lo antes posible."
          ),
        ],
      },
      {
        h: "Elantris",
        cuerpo: [
          h3("Mapa de Sycla"),
          codigo(
            "SI aparece:\nSycla-Opelon Map.jpg / image=Sycla-Opelon Map.jpg / {{image|Sycla-Opelon Map.jpg|...}} / {{map ref|Sycla}}\n\nSE CAMBIA POR:\nMapaSycla.png / image=MapaSycla.png / {{image|MapaSycla.png|...}} / {{map ref|Sycla}}"
          ),
          h3("Mapa de Arelon"),
          codigo(
            "SI aparece:\nArelon Map.jpg / image=Arelon Map.jpg / {{image|Arelon Map.jpg|...}} / {{map ref|arelon}}\n\nSE CAMBIA POR:\nMapaArelon.png / image=MapaArelon.png / {{image|MapaArelon.png|...}} / {{map ref|arelon}}"
          ),
          h3("Mapa de Elantris-Kae"),
          codigo(
            "SI aparece:\nElantris-Kae_Map.jpg / image=Elantris-Kae_Map.jpg / {{image|Elantris-Kae_Map.jpg|...}} / {{map ref|elantris}}\n\nSE CAMBIA POR:\nMapaElantris-KAE.png / image=MapaElantris-KAE.png / {{image|MapaElantris-KAE.png|...}} / {{map ref|elantris}}"
          ),
        ],
      },
      {
        h: "Nacidos de la bruma",
        cuerpo: [
          h3("Tabla de metales alománticos"),
          codigo(
            "SI aparece:\nTable of Allomantic Metals.jpeg / image=Table of Allomantic Metals.jpeg / {{image|Table of Allomantic Metals.jpeg|...}} / {{file ref|Table of Allomantic Metals.jpeg|Allomantic Table}}\n\nSE CAMBIA POR:\nTabla-metales-alomanticos.png / image=Tabla-metales-alomanticos.png / {{image|Tabla-metales-alomanticos.png|...}} / {{file ref|Tabla-metales-alomanticos.png|Tabla alomantica}}"
          ),
          h3("Tabla de metales feruquímicos"),
          codigo(
            "SI aparece:\nFeruchemical table.jpg / image=Feruchemical table.jpg / {{image|Feruchemical table.jpg|...}} / {{file ref|Feruchemical table.jpg|Feruchemic Table}}\n\nSE CAMBIA POR:\nTabla-metales-feruquimicos.png / image=Tabla-metales-feruquimicos.png / {{image|Tabla-metales-feruquimicos.png|...}} / {{file ref|Tabla-metales-feruquimicos.png|Tabla feruquimica}}"
          ),
          h3("Tabla de metales hemalúrgicos"),
          codigo(
            "SI aparece:\nHemalurgy table.jpg / image=Hemalurgy table.jpg / {{image|Hemalurgy table.jpg|...}} / {{file ref|Hemalurgy table.jpg|Allomantic Table}}\n\nSE CAMBIA POR:\nTabla-metales-hemalurgicos.png / image=Tabla-metales-hemalurgicos.png / {{image|Tabla-metales-hemalurgicos.png|...}} / {{file ref|Tabla-metales-hemalurgicos.png|Tabla alomantica}}"
          ),
          h3("Mapa del Imperio Final"),
          codigo(
            "SI aparece:\nFinal Empire.png / image=Final Empire.png / {{image|Final Empire.png|...}} / {{map ref|final empire}}\n\nSE CAMBIA POR:\nMapaImperioFinal.jpg / image=MapaImperioFinal.jpg / {{image|MapaImperioFinal.jpg|...}} / {{map ref|Imperio Final}}"
          ),
          h3("Mapa del Imperio Final (10 aniversario)"),
          codigo(
            "SI aparece:\nFinal Empire Map.jpg / image=Final Empire Map.jpg / {{image|Final Empire Map.jpg|...}} / {{map ref|final empire 1021}}\n\nSE CAMBIA POR:\nMapaImperioFinal 10aniversario.png / image=MapaImperioFinal 10aniversario.png / {{image|MapaImperioFinal 10aniversario.png|...}} / {{map ref|Imperio Final 1021}}"
          ),
          h3("Plano de Elendel"),
          codigo(
            "SI aparece:\nElendel.jpg / image=Elendel.jpg / {{image|Elendel.jpg|...}} / {{map ref|elendel}}\n\nSE CAMBIA POR:\nPlanoElendel.png / image=PlanoElendel.png / {{image|PlanoElendel.png|...}} / {{map ref|Elendel}}"
          ),
          h3("Mapa de la Cuenca de Elendel"),
          codigo(
            "SI aparece:\nElendel Basin.png / image=Elendel Basin.png / {{image|Elendel Basin.png|...}} / {{map ref|elendel basin}}\n\nSE CAMBIA POR:\nMapaCuencaElendel.png / image=MapaCuencaElendel.png / {{image|MapaCuencaElendel.png|...}} / {{map ref|Cuenca de Elendel}}"
          ),
        ],
      },
      {
        h: "Archivo de las tormentas",
        cuerpo: [
          h3("Mapa de Roshar"),
          codigo(
            "SI aparece:\nOB Roshar.jpg / image=OB Roshar.jpg / {{image|OB Roshar.jpg|...}} / {{map ref|roshar}}\n\nSE CAMBIA POR:\nMapaRosharColorES.png / image=MapaRosharColorES.png / {{image|MapaRosharColorES.png|...}} / {{map ref|Roshar}}"
          ),
          h3("Funcionarios azishianos"),
          codigo(
            "SI aparece:\nAzish Public Servant Designs.jpeg / image=Azish Public Servant Designs.jpeg / {{image|Azish Public Servant Designs.jpeg|...}} / {{file ref|Azish Public Servant Designs.jpeg|...}}\n\nSE CAMBIA POR:\nDiseño-Funcionarios-Azishianos.png / image=Diseño-Funcionarios-Azishianos.png / {{image|Diseño-Funcionarios-Azishianos.png|...}} / {{file ref|Diseño-Funcionarios-Azishianos.png|...}}"
          ),
          h3("Cenizaspren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Ashspren.jpg\n\nSE CAMBIA POR:\nCenizaspren.png"
          ),
          h3("Mapa de Makabak oriental"),
          codigo(
            "SI aparece:\nMap of Eastern Makabak.jpg / {{map ref|eastern makabak}}\n\nSE CAMBIA POR:\nMapa-Makabak-Oriental.png / {{map ref|Makabak Oriental}}"
          ),
          h3("Mapa de Shadesmar"),
          codigo(
            "SI aparece:\nShadesmar (TWoK).jpg / {{map ref|shadesmar}}\n\nSE CAMBIA POR:\nMapaShadesmar.png / {{map ref|Shadesmar}}"
          ),
          h3("Mapa de Alezkar"),
          codigo(
            "SI aparece:\nAlethkar Color.jpg / {{map ref|Alethkar}}\n\nSE CAMBIA POR:\nMapaAlezkar.png / {{map ref|Alezkar}}"
          ),
          h3("Apuntes sobre cimática de Kabsal"),
          codigo(
            "SI aparece:\nFour Cities.jpg\n\nSE CAMBIA POR:\nApuntes-Cimática-Kabsal.png"
          ),
          h3("Glifos alezi (primera y segunda parte)"),
          codigo(
            "SI aparece:\nAlethi Glyphs Page 1.jpg / Alethi Glyphs Page 2.jpg\n\nSE CAMBIA POR:\nGlifos-Alezi-Primera-Parte.png / Glifos-Alezi-Segunda-Parte.png"
          ),
          h3("Plano de Kholinar"),
          codigo(
            "SI aparece:\nKholinar.jpg / {{map ref|Kholinar}}\n\nSE CAMBIA POR:\nPlano-Kholinar.png / {{map ref|Kholinar}}"
          ),
          h3("Plano de Ciudad Thaylen"),
          codigo(
            "SI aparece:\nThaylen City.jpg / {{map ref|thaylen city}}\n\nSE CAMBIA POR:\nPlano-Ciudad-Thaylen.png / {{map ref|Ciudad Thaylen}}"
          ),
          h3("Mapa de las Tierras Heladas"),
          codigo(
            "SI aparece:\nFrostlands map.jpeg / {{map ref|frostlands}}\n\nSE CAMBIA POR:\nMapa-Tierras-Heladas.png / {{map ref|Tierras Heladas}}"
          ),
          h3("Tatuajes del Puente Cuatro"),
          codigo(
            "SI aparece:\nBridge Four tattoos page.jpeg\n\nSE CAMBIA POR:\nTatuajes-Puente-Cuatro.png"
          ),
          h3("Vinos de Roshar"),
          codigo(
            "SI aparece:\nRosharan Wines.jpg\n\nSE CAMBIA POR:\nVinosdeRoshar.png"
          ),
          h3("Vinospren"),
          codigo(
            "SI aparece:\nalespren.jpg\n\nSE CAMBIA POR:\nvinospren.jpg"
          ),
          h3("Escaleras de Nohadon"),
          codigo(
            "SI aparece:\nNohadons Stairways Sea of Souls map crop.png\n\nSE CAMBIA POR:\nEscaleras-nohadon-recorte-mar-almas.png"
          ),
          h3("Mapa del Mar de las Luces Perdidas"),
          codigo(
            "SI aparece:\nSea of Lost Lights.jpg / {{map ref|sea of the lost light}}\n\nSE CAMBIA POR:\nMarLucesPerdidas.png / {{map ref|Mar de las Luces Perdidas}}"
          ),
          h3("Cuaderno de bocetos de Shallan: Patrón"),
          codigo(
            "SI aparece:\nPattern.jpeg\n\nSE CAMBIA POR:\nBocetosShallan-Patron.png"
          ),
          h3("Batalla de la Torre"),
          codigo(
            "SI aparece:\nBattle of the Tower.jpg / {{map ref|battle of the tower}}\n\nSE CAMBIA POR:\nBatallaTorre.png / {{map ref|Batalla de la Torre}}"
          ),
          h3("Mapa de las Llanuras Quebradas"),
          codigo(
            "SI aparece:\nShattered Plains.jpg / {{map ref|shattered plains}}\n\nSE CAMBIA POR:\nMapaLlanurasQuebradas.png / {{map ref|Llanuras Quebradas}}"
          ),
          h3("Pergamino de Posiciones"),
          codigo(
            "SI aparece:\nScroll of Stances.jpeg\n\nSE CAMBIA POR:\nPergaminoPosiciones.png"
          ),
          h3("Representación de la forma"),
          codigo(
            "SI aparece:\nShattered_Plains_WoR_map.jpeg\n\nSE CAMBIA POR:\nRepresentacionLlanurasQuebradas.png"
          ),
          h3("Mapa del Mar de las Almas"),
          codigo(
            "SI aparece:\nSea of Souls.jpg / {{map ref|sea of souls}}\n\nSE CAMBIA POR:\nMarAlmas.png / {{map ref|Mar de las Almas}}"
          ),
          h3("Rocabrotes"),
          codigo(
            "SI aparece:\nRockbuds.jpg\n\nSE CAMBIA POR:\nRocabrote.png"
          ),
          h3("Ciclo vital del chull"),
          codigo(
            "SI aparece:\nChull Life Cycle.jpeg\n\nSE CAMBIA POR:\nCiclo-vital-chull.png"
          ),
          h3("Lait"),
          codigo(
            "SI aparece:\nLait.jpeg\n\nSE CAMBIA POR:\nLait-Esp.png"
          ),
          h3("Posiciones de las Puertas Juradas"),
          codigo(
            "SI aparece:\nOathgate Locations.jpg / {{map ref|oathgates}}\n\nSE CAMBIA POR:\nPuertas-Juradas-Localizacion.png / {{map ref|Puertas Juradas}}"
          ),
          h3("Armaduras esquirladas"),
          codigo(
            "SI aparece:\nShardplate.jpeg\n\nSE CAMBIA POR:\nArmadura-esquirlada.png"
          ),
          h3("La historia del hombre"),
          codigo(
            "SI aparece:\nThe History of Man.jpg\n\nSE CAMBIA POR:\nLa-historia-del-hombre.png"
          ),
          h3("Spren de Kholinar"),
          codigo(
            "SI aparece:\nKholinar Spren.jpg\n\nSE CAMBIA POR:\nSpren-de-Kholinar-.png"
          ),
          h3("Mapa de los Reinos Plateados"),
          codigo(
            "SI aparece:\nSilver Kingdoms.jpg / {{map ref|silver kingdoms}}\n\nSE CAMBIA POR:\nReinosPlateados.JPG / {{map ref|Reinos Plateados}}"
          ),
          h3("Altospren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Highspren.jpg\n\nSE CAMBIA POR:\nAltospren.png"
          ),
          h3("Anguilas aéreas"),
          codigo(
            "SI aparece:\nSkyeel.jpg\n\nSE CAMBIA POR:\nAnguilas-aereas.png"
          ),
          h3("Spren de Shadesmar"),
          codigo(
            "SI aparece:\nShadesmar_Spren.jpg\n\nSE CAMBIA POR:\nSpren-de-shadesmar.png"
          ),
          h3("Abismoide"),
          codigo(
            "SI aparece:\nChasmfiend.jpeg\n\nSE CAMBIA POR:\nAbismoide.png"
          ),
          h3("Crípticos"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Cryptics.jpg\n\nSE CAMBIA POR:\nCripticos.jpg"
          ),
          h3("Cultivacispren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Cultivationspren.jpg\n\nSE CAMBIA POR:\nCultivacispren.png"
          ),
          h3("Urithiru"),
          codigo(
            "SI aparece:\nUrithiru.jpg\n\nSE CAMBIA POR:\nShallan-Urithiru.png"
          ),
          h3("Urithiru-atrio"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - The Atrium.jpg\n\nSE CAMBIA POR:\nUrithiru-atrio.png"
          ),
          h3("Urithiru en el mapa"),
          codigo(
            "SI aparece:\nUrithiru on the map.png\n\nSE CAMBIA POR:\nUrithiru-en-el-mapa.png"
          ),
          h3("Jah Keved en el mapa"),
          codigo(
            "SI aparece:\nJah Keved on the World Map.jpg\n\nSE CAMBIA POR:\nJah-Keved-en-el-mapa.PNG"
          ),
          h3("Ciudad Thaylen en el mapa"),
          codigo(
            "SI aparece:\nThaylen City on the map.jpg\n\nSE CAMBIA POR:\nCiudad-Thaylen-en-el-mapa.PNG"
          ),
          h3("Chulls"),
          codigo(
            "SI aparece:\nChull.jpg\n\nSE CAMBIA POR:\nShallan-Chulls.png"
          ),
          h3("Sabueso-hacha"),
          codigo(
            "SI aparece:\nAxehound by Shallan.jpg\n\nSE CAMBIA POR:\nSabueso-hacha.png"
          ),
          h3("Honorspren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Honorspren.jpg\n\nSE CAMBIA POR:\nBocetosShallan-Honorspren.png"
          ),
          h3("Nota final Juramentada"),
          codigo(
            "SI aparece:\nOB_Endnote.jpg\n\nSE CAMBIA POR:\nJuramentada-notafinal.png"
          ),
          h3("La tomadora de secretos"),
          codigo(
            "SI aparece:\nThe_Taker_of_Secrets.jpg\n\nSE CAMBIA POR:\nTomadora-de-secretos.jpg"
          ),
          h3("Palabras radiantes nota final"),
          codigo(
            "SI aparece:\nWoR_Endnote.jpg\n\nSE CAMBIA POR:\nPalabras Notafinal.jpeg"
          ),
          h3("Tintaspren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Inkspren.jpg\n\nSE CAMBIA POR:\nTintaspren.png"
          ),
          h3("Campamentos de guerra alezi"),
          codigo(
            "SI aparece:\nWarcamps.jpg / {{map ref|warcamps|...}}\n\nSE CAMBIA POR:\nCampos-de-guerra-alezi.png / {{map ref|warcamps|...}}"
          ),
          h3("Moda contemporánea masculina"),
          codigo(
            "SI aparece:\nContemporary Male Fashion.jpg\n\nSE CAMBIA POR:\nModa-masculina-contemporanea.png"
          ),
          h3("Moda thayleña"),
          codigo(
            "SI aparece:\nContemporary Thaylen Female Fashion.jpg\n\nSE CAMBIA POR:\nModa-thaylena.png"
          ),
          h3("Alcanzadores"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Reachers.jpg\n\nSE CAMBIA POR:\nBocetosShallan-Alcanzadores.png"
          ),
          h3("Cumbrespren"),
          codigo(
            "SI aparece:\nShallan's Sketchbook - Peakspren.jpg\n\nSE CAMBIA POR:\nBocetosShallan-cumbrespren.png"
          ),
          h3("Havah vorin"),
          codigo(
            "SI aparece:\nVorin Havah.jpg\n\nSE CAMBIA POR:\nhavah-vorin-es.png"
          ),
          h3("Ba-Ado-Mishram"),
          codigo(
            "SI aparece:\nPage from Mythica - Ba-Ado-Mishram.jpg\n\nSE CAMBIA POR:\nPágina_de_Mítica_-_Ba-Ado-Mishram.png"
          ),
        ],
      },
      {
        h: "Guía de mundo de Archivo",
        cuerpo: [
          h3("Herdaz"),
          codigo(
            "SI aparece:\nSLWG Travelogue Herdaz.png\n\nSE CAMBIA POR:\nGMAT cronica Herdaz.jpg"
          ),
          h3("Rall Elorim"),
          codigo(
            "SI aparece:\nSLWG Travelogue Rall Elorim.png\n\nSE CAMBIA POR:\nGMAT cronica Rall Elorim.png"
          ),
          h3("Campamento"),
          codigo(
            "SI aparece:\nSLWG Travelogue Warcamps.png\n\nSE CAMBIA POR:\nGMAT cronica Campamento.jpg"
          ),
          h3("Celebrant"),
          codigo(
            "SI aparece:\nSLWG Travelogue Celebrant.png\n\nSE CAMBIA POR:\nGMAT cronica Celebrant.jpg"
          ),
        ],
      },
      {
        h: "Arena Blanca",
        cuerpo: [
          h3("Mapa del lado diurno de Taldain"),
          codigo(
            "SI aparece:\nDayside map.jpg / {{map ref|dayside}}\n\nSE CAMBIA POR:\nMapa-lado-diurno.png / {{map ref|lado diurno}}"
          ),
        ],
      },
      {
        h: "Aliento de los dioses",
        cuerpo: [
          h3("Mapa de T'Telir"),
          codigo(
            "SI aparece:\nT-Telir.png / {{map ref|T-Telir}}\n\nSE CAMBIA POR:\nMapaT'Telir.png / {{map ref|T'Telir}}"
          ),
        ],
      },
    ],
  },



  "periodicos-era-2": {
    slug: "periodicos-era-2",
    titulo: "Periódicos Era 2",
    icono: "newspaper",
    sub: "Transcripción de los cuatro periódicos incluidos en las novelas de Era 2, para facilitar la búsqueda de datos.",
    secciones: [
      {
        h: 'Introducción',
        cuerpo: [
          parrafo('Os traemos transcritos los cuatro periódicos que están incluidos en las novelas de Era 2, para facilitar la búsqueda de datos concretos en ellos. Con un simple Ctrl + F y el término podréis leer de manera rápida cualquier parte de ellos.'),
        ],
      },
      {
        h: 'El Diario de Elendel',
        cuerpo: [
          parrafo('¡Noticias destacadas de todos los octantes!'),
          parrafo('4 de Doxil, 341 – Precio 2'),
          h3('¡Una nueva historia de los Áridos!'),
          parrafo('¡Explorando los Pozos de Eltania!'),
          parrafo('En nuestra serie exclusiva, Alomante Jak continúa sus hazañas explorando los lejanos Áridos.'),
          parrafo('En este capítulo, escribe sobre los días que pasó en los tristemente célebres Pozos de Eltania, donde las tribus koloss gobiernan la tierra y pueden descubrirse metales preciosos y desconocidos. Historia completa tras el pliegue. ¡Cien por cien auténtico y escrito por el mismísimo explorador!'),
          h3('La Casa Tekiel revela el “Inexpugnable”'),
          parrafo('Con intención de revolucionar la seguridad y el transporte, Reshelle Tekiel anunció el nuevo vagón blindado de su Casa, destinado al transporte y protección de bienes valiosos por ferrocarril. El vagón está en exposición para el público en los Talleres Evergall hasta el día 19.'),
          parrafo('Diseñado específicamente como respuesta a los terribles y cada vez más repetidos ataques de bandidos por parte de grupos como los “Desvanecedores”, el nuevo tren Inexpugnable está fabricado con el mejor acero, diseñado con la línea más moderna y sellado por una enorme puerta con cerradura iguales a las que se encuentran en las cajas fuertes de los bancos Tekiel.'),
          parrafo('El mecanismo de tiempo de esta cerradura científicamente avanzada garantiza que, una vez cerrada, el vagón no puede volver a abrirse hasta que ha llegado a su destino. Así el Inexpugnable permite que incluso los caballeros más preocupados descansen con la certeza de que su valiosa carga puede viajar sin ser molestada por las vías de la Cuenca de Elendel y las tierras de más allá.'),
          parrafo('De hecho, cada vez hay mayor preocupación a la luz de los recientes ataques a los viajeros de los ferrocarriles cercanos a nuestra bella Elendel. Ninguno está a salvo de las ansiosas costumbres de los Desvanecedores, que despojan a damas y señores de sus valiosas posesiones a punta de pistola. Aunque todavía no se ha derramado sangre en estos ataques, recientemente han empezado a añadir el secuestro a su lista de pecados, y parece solo cuestión de tiempo que haya heridos.'),
          parrafo('En vez de esperar a las dolorosamente lentas maquinaciones d ellos otros señores para defender vidas y bienes de estos ladrones por medio del Senado, la Casa Tekiel ha dado una vez más un paso adelante con una ingeniosa solución que toma una mano activa en la lucha contra estos malvados.'),
          h3('¡El tren fantasma!'),
          parrafo('¡Descrito por testigos!'),
          parrafo('En este emocionante reportaje, tres testigos hablan de la noche en que su tren fue asaltado por los Desvanecedores. Uno de ellos es la maquinista misma, que explica con gran detalle la espectral aparición. Descubran los hechos por sí mismos, y vean por qué este fantasma es demasiado silencioso, demasiado brillante y demasiado espectral para ser otra cosa sino una fuerza del más allá. Los expertos de la universidad comparan los desastres ferroviarios para determinar cuál es el origen de la aparición, y las listas de muertos dan idea de qué pueden desear los fantasmas. ¡Reportaje exclusivo, solo aquí! Contraportada.'),
          h3('¿Hay vida al otro lado del océano?'),
          parrafo('Hace dos años, el navío de exploración costera “Vista de Hierro” fue sorprendido por una terrible tormenta y arrastrado a las profundidades del océano. Sin ver tierra, no fue posible navegar adecuadamente, y los valientes marineros se encontraron rezando por sus vidas mientras navegaban de vuelta al este con la esperanza de hallar tierra.'),
          parrafo('Armonía los favoreció, y acabaron encontrando tierra: una isla llena de extraños animales. Allí encontraron también un refugiado, un único superviviente que contó la terrible historia de cómo su barco fue atacado por un extraño pueblo marinero.'),
          parrafo('Mucho después de que sus seres queridos los dieran por muertos, los marineros regresaron a la civilización, trayendo consigo a ese refugiado. Su historia está llena de terror, preocupación y maravilla. Lean y descubran las verdades de los pueblos de los océanos y sus místicos Metales Desconocidos. Historia completa en contraportada.'),
          h3('¡Los Carruajes sin caballo son una amenaza!'),
          parrafo('Los carruajes sin caballo son una amenaza para  nuestra ciudad y nuestro modo de vida. Estos artilugios sin alma no tienen el sentido común de un caballo y un cochero, que disfrutan de años de práctica y permiso para proteger a sus pasajeros del peligro. Las estadísticas muestran que accidentes y fatalidades son comunes con los coches de motor. No pongan su vida, ni la de sus seres queridos, a merced de algo frío, de acero, y sin vida. ¡Defiendan lo que es justo!'),
          parrafo('DENUNCIEN LOS CARRUAJES SIN CABALLO'),
          parrafo('Pagado por el sindicato de cocheros. Las palabras de este anuncio no reflejan las opiniones de los editores o el personal de este periódico.'),
          h3('Compramos metales'),
          parrafo('¡Compramos sus restos de metal a precios competitivos! ¡La pureza no es un problema! Briggs & Hijos Metalúrgicos Licenciados. 3217 avenida de las Fundiciones, 6º Octante.'),
          h3('¡Los avistamientos de ojos de hierro aumentan!'),
          parrafo('Las noticias inundan la ciudad: avistamientos de Ojos de Hierro en persona. Cuando la Muerte camina por las calles de Elendel, ¿cómo puedes saber que estás a salvo? Aquí se incluyen dieciséis consejos para mantener a Ojos de Hierro lejos de su casa. Se incluyen amuletos para que pase de largo mientras duerme, y para espantarlo si sucede lo peor si lo encuentra en persona. Reportaje exclusivo en la contra, cuarta columna. ¡No sea el único sin protección adecuada! ¡Lea, o prepárese para lo peor!'),
          h3('¡Los inmortales Sin Rostro me salvaron la vida!'),
          parrafo('Una mujer del Quinto Octante sufrió una terrible experiencia cuando se produjo un incendio en su casa. Una figura en sombras los salvó a ella y a sus hijos, y ella sostiene que tenía el rostro de su difunto esposo. ¿Un avistamiento de uno de los Inmortales Sin Rostro? ¿Simple casualidad? Usted decide. Historia en la contra, quinta columna.'),
          h3('¡Vote por la pasión! ¡Vote por la libertad! ¡Vote por Feltri!'),
          parrafo('Un mensaje de los trabajadores del Canal por Feltri.'),
          h3('¡El automóvil es superior al caballo!'),
          parrafo('Un reciente estudio científico y veraz encargado por la Asociación d ellos Intereses del Transporte revela que el coche de motor tiene muchas ventajas sobre el simple coche de caballos. EL automóvil es capaz de conseguir velocidades que solo consiguen los mejores motores de tren, y nunca se cansa. ¡Nunca más tendrá que temer perder su montura ante los depredadores o el hambre cuando viaje a largas distancias! ¡Nunca tendrá que alimentar o limpiar a una desagradecida bestia de carga! ¡No sea esclavo de su cochero!'),
          parrafo('¡ENGANCHE EL PODER DEL FUTURO, HOY!'),
          parrafo('La Asociación de los Intereses del Transporte es una división del Conglomerado del Automóvil de la Gran Cuenca, y es responsable del contenido de este mensaje.'),
          h3('Líder sindical abandona solidaridad con miembros del partido de los sindicatos'),
          parrafo('En un giro sorpresivo respecto a la postura oficial del partido, el líder sindical Elors Durnsed anunció su intención de abstenerse de cualquier objeción al cierre de las negociaciones entre los representantes del Sindicato de Comerciantes Unidos y  el Colectivo de las Casas Nobles en sus largas disputas. Los rumores de una serie de reuniones secretas entre el líder sindical y ciudadanos privados, cuyos intereses sirven a las Casas siguen siendo cuestión de especulación, donde se descartan comentarios. El anuncio fue recibido casi con violencia por los miembros del Partido de la Unión Sindical entrevistados por este periódico. Un remachador del Edificio Columna de Hierro que dijo llamarse Brill le contó a este periodista que el señor Durnsed debería “mantener su cabeza condenadamente lejos de aquí si sabe lo que le conviene”. Antes de que pudiera explicarse, su representante sindical intervino y aseguró que el hombre hablaba metafóricamente. Sin embargo, los ánimos de los remachadores y paleadores estaban decididamente en contra del señor Durnsed.'),
          parrafo('La decisión del líder sindical implica que el contrato escrito se mantiene durante el resto del trimestre financiero. Tras esta revelación, las acciones industriales subieron, e incluso de las de Tekiel, recientemente a la baja, experimentaron un alza positiva.'),
          h3('¡Alivio a sus dolores!'),
          parrafo('La señora Halez, alomántica, ha abierto un nuevo salón de aplacamiento. En sus instalaciones puede encontrarse alivio a la tensión, la ansiedad, y la preocupación… para salir con el corazón animado y la mente despejada. Nuestro reportero visita el salón para informar de lo que sucede. Un espléndido masaje, dulces aromas, y un aplacador de servicio para dar un “Masaje emocional” único que le dejará tan bien por dentro como por fuera. Lea el reportaje en la contra, columna siete.'),
          h3('¡Feltri es un encendedor!'),
          parrafo('Se rumorea que Alloran Feltri, candidato favorito al segundo escaño de los Trabajadores del Canal en las elecciones de este año, ha estado usando habilidades alománticas para crear seguidores. En un escándalo que sacudirá la ciudad hasta sus cimientos, una antigua amante lo ha descubierto todo. Historia completa en la contra, tercera columna.'),
          h3('Alománticos en alquiler'),
          parrafo('Todos. Lanzamonedas, brazos de peltre para la industria o protección. Alománticos temporales para manipulación del tiempo. Aplacadores, encendedores para las fiestas. Feruquimistas disponibles con reserva, Metalúrgicos Aliados, Plaza Carronberry, 7º Octante. ¿Es un nacido del metal y desea ganar lo que se merece? Venga a vernos. Pregunte por Jarrington.'),
          h3('¡Explorando los Pozos de Eltania!'),
          parrafo('Mi querido editor, y también ustedes, mis queridos lectores: espero que mi misiva los encuentre bien y en disposición de un oído atento, pues los increíbles sucesos acaecidos en mi experiencia reciente pueden llenarlos de incredulidad y sorpresa. Les juro de todo corazón que todas y cada una de las palabras que les escribo son reales y veraces. Vivo estas historias para que puedan aprender de los Áridos y las fascinantes gentes que viven más allá de las montañas, más allá de la ley, y más allá de la razón cultivada.'),
          parrafo('Cuando escribí mi anterior misiva, estaba seguro de que había llegado mi fin. De hecho, fui capturado y retenido por los brutos kilos de los Pozos de Eltania, y me habían dicho que iban a ejecutarme y devorarme al amanecer. ¡Temí un final horrible, y admito que recé con todas mis ganas al Superviviente esa noche! ¡Si alguien necesitaba protección de El Que Vivió, ese era yo!'),
          parrafo('Pueden asumir por la presente que escapé. Bueno, en parte es cierto: pero no he dejado el campamento de los koloss de piel azul, Les escribo esta carta desde la misma cámara donde iban a ejecutarme esa noche. ¡Solo que ahora no es una prisión, sino un gran palacio! Al menos así lo consideran los salvajes que me retiene a Para mí, sigue siendo simplemente una choza de suelo de barro. Dormir bajo las estrellas habría sido preferible, sobre todo si pudiera haber tenido a mi lado a la señorita Dramali. Pero mi misión para localizar adónde se la habían llevado debe esperar hasta más tarde.'),
          parrafo('Los koloss intentan que me acomode a mi nuevo entorno. Me han traído animales muertos para alimentarme, y me han encendido una hoguera, signo de que me consideran digno de gran atención. U me han dado varias armas de construcción propia, Como he mencionado antes, esas armas son de una elegancia increíble. Creía que esas criaturas eran incapaces de crear nada bello.'),
          parrafo('Pero me entretengo en los insignificante. Por favor, perdónenme; en mi mente continúa enfrascada en los acontecimientos de esta semana. ¡Pues, en efecto, ceo que no solo me he salvado de la muerte, sino que me han nombrado rey de esta tribu!'),
          parrafo('Empezó el amanecer de mi mencionada ejecución. Después de que me despertaran de manera no demasiado agradable, me encontré bajo el sol avasallador, caminando por el terreno rojo y polvoriento. Los brutos formaban silenciosas filas y me miraban con sus ojillos brillantes la piel de un azul más oscuro, del color de un bello pañuelo azul que hubiera sido chamuscado por el fuego. El polvo rojo manchaba sus cuerpos, y muchos llevaban la más sucinta de las ropas.'),
          parrafo('Le debo la vida a Handerwym. Al fiel Handerwym. Bendito sea el día en que lo saqué de aquel lago, empapado y casi ahogado. El fiel terrisano, aunque ha jurado no dañar ni matar, ha demostrado su valor cien veces. Los koloss parecían respetarlo, y le permitieron que se acercara por ultima vez para abrazar a su amo, que pronto iba a ser asesinado del modo más horrible.'),
          parrafo('Tras ese abrazo, encontré a mi Destello mi querido revolver, en mi mano, atada a mi espalda. Pregunté cómo se lo había quitado a los koloss, y el explico que había hecho uso de una de sus mentes de metal para crear una conexión con los koloss. Es un arte arcano que emplea, inexplorado y desconocido, y desea que escriba muy poco a modo de explicación, ya que considera su poder sagrado.'),
          parrafo('Bien, estaba armado, pero atado todavía. Conexión aparte, los koloss se lo llevaron aunque no parecieron advertir lo que había hecho, Y nunca había tenido motivos para bendecir las larguísimas mangas de la chaqueta que recibí a cambio de ese bandido semanas atrás, pero en este caso, puede que hayan sido mi salvación.'),
          parrafo('Cuando les cuente este disparo, pido que no piensen demasiado bien de mí. Fue más la casualidad que la habilidad la que demostró ser mi amiga ese día. Había conseguido zafarme levemente de las ligaduras, de modo que pude mover una mano bajo la otra. Torcí el revolver entre mis dedos y pude colocarlo plano sobre mi palma, el cañón apuntando hacia arriba por mi brazo. En el último momento antes de enfrentarme al verdugo, eché la cabeza hacia delante y apreté el gatillo.'),
          parrafo('Preservación prevaleció, y aunque sentí la bala rozarme la nuca, también pasó a través de mis ataduras. Un rápido tirón de las manos me liberó en ese punto, y aunque estaba agotado, todavía me quedaba un poco de estaño. Lo quemé, amplificando mis sentidos, y alcé el arma para dispararle al verdugo entre los ojos. Los koloss son fuertes, pero incluso ellos pueden caer con una bala bien colocada.'),
          parrafo('El siguiente disparo abatió al mas grande de sus lideres. Esperaba que esto solo me asegurara su asombro, pero, aunque los detuvo, no los hizo liberarme. Destello solo tenia tres balas cuando la dejé: miré a Handerwym, y el negó ominosamente con la cabeza. No tenía munición para recargarla.'),
          parrafo('Solo tenia una bala y una aldea entera llena de monstruos. ¡No mentiré y diré que confiaba en mis posibilidades! Sin embargo, debería mencionarles un aspecto curioso de los koloss. Verán, desde su primera interacción conmigo, habían insistido en que cualquiera podía unirse a ellos. Cualquier hombre que consideren digno puede ser nombrado koloss. De hecho, varios de sus guerreros mas brutales y poderosos decían haber sido antaño hombres de la Ciudad. Obviamente es falso, pero hay algo en su estructura mental que les hace creerlo así.'),
          parrafo('Y por eso, con mi única bala, decidí demostrarles que era digno de unirme a ellos. Solo una prueba de la mayor habilidad podía demostrarlo, decidí, y por eso alcé el arma y… (¡Continuará la próxima semana!)'),
          h3('¡Immering convierte al hombre corriente en lanzamonedas!'),
          parrafo('¡El Mecanismo Patentado Rompedor Immerling asegura una rápida y fácil recarga cuando más lo necesita! ¡Un motivo más por el que los expertos vigilantes prefieren Immerling! Modelo 44. ¡Para gran precisión! Modelos 44-S. ¡Para gran discreción!'),
          parrafo('Armas Immerline Est. 314'),
          h3('¡Que no le pillen a oscuras!'),
          parrafo('Los caballeros cultivados de todos los octantes están de acuerdo. ¡Solo la luz eléctrica vale! Envíen mensajero a Brigs Wennington con número de habitaciones para presupuesto. 4567 plaza Cunning 5º Octante.'),
        ],
    },
      {
        h: 'El Archivo Local',
        cuerpo: [
          parrafo('1º de Doxil, 342 Edición matinal Copyright 342, Lesan Calour & Hijas & Hijos'),
          parrafo('El diario de la civilización, la sociedad, y la cultura'),
          parrafo('Precio 3 – numero / 20 – semanal'),
          parrafo('Apertura de Mercado Acciones de BVCE +0,5% Mercancías -2,1'),
          parrafo('El tiempo Vientos suaves del oeste soplarán al atardecer'),
          h3('“El caballero Jak en la ciudad de las fuentes”'),
          parrafo('Parte Seis'),
          parrafo('"¡La velada siniestra!"'),
          parrafo('No tengo más que recordar a mis astutos lectores la precaria situación en la cual me encontré al final de la comuna de la semana pasada, pero para aquellos de ustedes cuyos mejorados gustos acaban de llevarles de las entrañas del periodismo más vergonzoso a las nobles páginas de "El Archivo Local", dejen que les presente una breve recapitulación.'),
          parrafo('gracias a mi labia de plata y a mi veloz mente de estaño, conseguí acceder a la fiesta privada de lady Lavont en Nueva Seran donde ella planeaba subastar los únicos botones que quedan del batín preferido del lord Nacido de la Bruma. Harderwym, mi fiel mayordomo terrisano, consiguió la información relacionada con que el líder del gremio de remendones planeaba robar los botones intercambiándolos por indistinguibles falsificaciones durante la noche.'),
          parrafo('Mientras Harderwym observó los botones de estaño desde la mesa de los entrantes, yo me codeaba con lady Lavont y su círculo privado, a los cuales les parecí realmente encantador. Entonces fue cuando el hombre vestido con un traje blanco a rayas me apuntó con un arma. (¡Continúa más abajo!)'),
          h3('A todos los niños les encantan los cachorritos soonie'),
          parrafo('¡Puedes mover sus patas! ¿Pelaje real! ¡El nuevo mejor amigo de vuestros hijos! Tan solo 75 óbolos, o una arquilla con cincuenta por dos'),
          h3('Editorial invitado. ¡La molesta negligencia de los lanzamonedas!'),
          parrafo('En los últimos dieciséis meses he reparado tres farolas, una verja de hierro, y dos campanarios de aguja; todo ello en mi casa del paseo Madison Ways. Mi residencia en el Sexto Octante, mucho más cercana al Eje, ha necesitado el doble de atención debido a estar situada en la principal ruta de los mensajeros lanzamonedas. Coches a motos, carruajes, estatuas de bronce. Nada de esto está a salvo de sufrir el mismo destino. ¿Deben nuestros ilustres vecinos verse como si hubieran vuelto al Mundo de Ceniza?'),
          parrafo('¡Dejad que recuperemos nuestra dignidad! (Continúa detrás)'),
          h3('Elendel siente los efectos de la inundación de Corbeau'),
          parrafo('El precio elevado de las mercancías afecta al desarrollo del mercado.'),
          parrafo('Mientras una de las regiones de la cuenca clave en producción de grano se esfuerza en reconstruir la presa cerca de Corbeau, preguntas sin respuesta todavía acechan el confort de aquellos en el corazón de la cuenca. El círculo financiero Argien-Oh, el mayor y más prestigioso comité de banqueros y otros líderes financieros de Elendel, ha convocado una reunión de emergencia para determinar si envían auxilio al área afectada por la inundación. La gran pregunta que acecha al circulo es su la inversión en arquillas y recursos será suficiente para afectar el mercado de mercancías, el cual acaba de empezar a irse a pique bajo las predicciones de que las cosechas de grano serán la mitad de las del año pasado.'),
          parrafo('“Hay suministros de sobra en reserva para cubrir la mayor parte de las demandas de los cuatro próximos meses”, dice lord Chapmot Haviers, un miembro del Círculo con fuertes lazos en Corbeau. “Pero después, la mayor parte del grano irá al mayor postor. Si eres dueño de panaderías, te lo pensarás dos veces antes de vender barras de pan a cinco óbolos cuando podrías vender whisky por cuarenta óbolos la botella”.'),
          h3('Visitantes de otros mundos'),
          parrafo('En raras ocasiones El Archivo Local aporta noticias sensacionalistas, pero la respetable lady Nicelle Sauvage de Nueva Seran nos ha explicado algo que os asombrará.'),
          parrafo('“Estaba perdida en las montañas del sur de los Áridos meridionales”, dice Sauvage. “Y mis acompañantes me habían abandonado o habían muerto. Fue entonces cuando me encontré con un lago de montaña del más perfecto azul, nutrido pro la nueve derretida de los picos. Armonía, pensé que había alcanzado el paraíso.”'),
          parrafo('Dado que el crepúsculo cayó antes, como es costumbre en las montañas, Sauvage vio una figura encorvada sobre el lago. “Solo una sombra, todo sea dicho”, afirmó. “Ojos penetrantes, y un rostro como de una bestia de otro mundo de una de esas horrorosas historias sensacionalistas. Siento decir que no tuve el coraje de interactuar con el visitante. EN vez de eso, su horrible rostro se me quedó clavado en el corazón. Dejé que el instinto de supervivencia tomara el control y corrí durante una hora antes de volver a acampar. (Continúa detrás, columna 4.)'),
          h3('Tónica gaseosa Vif'),
          parrafo('¡Cura la fatiga!'),
          parrafo('Los doctores Fronks & Selvest Vif tienen el remedio para el mareo y la irritabilidad causadas por los microbios, úlceras, y la mala nutrición.'),
          parrafo('¡Recuerda que los doctores dirían! ¡Bebe tónica gaseosa Vif cada día!'),
          h3('Pectin-ada'),
          parrafo('El piscolabis preferido de la cuenca'),
          parrafo('¡Prueba los ocho sabores! Solo diez óbolos cada caja. ¡Te alegrarás de haberte quedado por la PECTIN-ADA!'),
          h3('Pomos y cerraduras de aluminio'),
          parrafo('No te quedes vulnerable a los rufianes alománticos. ¡Instalamos entre semana! Calle Adamus 42.'),
          h3('¿Sabes contar historias?'),
          parrafo('Ediciones Calour busca novelas que aleen "Los horribles" de Dechane, y "Miedo & ferocidad" de Ausdenec. Envía tu manuscrito a Calour & D, & S. Morise, 211, el Eje, Sexto Octante.'),
          h3('Se buscan inversores'),
          parrafo('Invertir en eléctricas hará crecer su patrimonio. Contacta con S.T., Plaza Stranat, 15.'),
          h3('¡La velada siniestra!'),
          parrafo('Describí a mi asaltante vistiendo un traje blanco a rayas, pero eso no es del todo específico. EN Elendel, alguien vestido como he descrito destacaría como el té de la tarde entre koloss, pero en Nueva Seran, los hombres circulan con tan extravagantes trajes que uno puede llegar a pensar que son artistas que llegan tarde al circo. Por lo que seré más específico. El pistolero también tenía bigotes encerados formando una larga horizontal que terminaba en una punta perfecta. Las mujeres a ambos lados del hombre se echaron atrás, no solo porque esgrimiera una pistola, sino porque además temían perder algún ojo debido al afilado y brillante cabello facial.'),
          parrafo('Quemé lo poco que quedaba de mis reservas de estaño. (Recordaréis que detallé la semana pasada, en "Un deporte de espíritus", que tuve que consumir la mayor parte de mi estaño para contrarrestar los efectos de ganar el caballeroso y espontaneo concurso de cata de vinos aquella tarde.)'),
          parrafo('"Baje el arma, caballero", dije, maldiciéndome por haber dejado a Destello en mi abrigo, el cual se llevó el servicio cuando entré a la fiesta. ¿Me había ablandado tanto desde que dejé los Áridos que me sentí cómodo sin Destello conmigo? ¡Jamás! Inconscientemente supe que incluso sin mi fuel arma era un oponente para cualquier persona en la sala. ¿Acaso no había vencido a las tribus en los Pozos de Eltania? ¿Acaso no había sido el primero en contar de nuevo historias sobre las laderas de los montes de ceniza, ahora cubiertas de verde y vegetación? ¿Acaso no fui yo el que domesticó los legendarios caballos cuellilargos de las Llanuras de Kaermeron?'),
          parrafo('"No bajaré el arma", dijo el hombre, "hasta que pagues por tus crímenes".'),
          parrafo('Mis sentidos aumentados captaron un leve temblor en las palabras del hombre. Noté los movimientos casi imperceptibles de sus ojos de derecha a izquierda. no era un miembro de la banda de los Remendones como había creído al principio. Era un hombre buscando venganza, y no estaba del todo seguro que yo fuera de quien tuviera que cobrarla.'),
          parrafo('"Dialoguemos con tranquilidad", sugerí. Aparté con suavidad los dedos temblorosos de lady Lavont de mi brazo. "Todo se solucionará, mi señora", dije, notando un leve suspiro cuando mis dedos rozaron los suyos por un breve momento.'),
          parrafo('Bigotes se envaró. "Mataste a mi hermano hace tres años en los Áridos, cerca de Covingtar", dijo.'),
          parrafo('Necesitaba tiempo para pensar en la acusación, por lo que di un paso adelante, levanté las manos, y dije, "Como puede ver, voy desarmado", me di la vuelta para mostrarlo a toda la multitud que en efecto no llevaba armas. Y si, con bravura, le di la espalda a Bigotes, confiando en que su incertidumbre respecto a mi identidad.'),
          parrafo('Cuando me volví, pensé sobre mi apuro. Era cierto que tres años atrás estuve en la zona de Covingtar. ¿Pero había matado al hermano de alguien allí? Sin duda había dejado a muchos hombres sin hermanos, pero nunca a propósito. La propia idea de matar a un hombre por el deseo concreto de dejar a alguien sin hermano me resulta extremadamente repugnante.'),
          parrafo('"No soy el hombre que buscas", dije, levantando mi vaso para dar otro sorbo, porque, por los Sin Rostro, que si iba a morir sería bebiendo aquel estupendo Chamblis Montreau 328.'),
          parrafo('El cañón del arma se agitó más. Si mi jugada hubiera fallado, habría lucido otra cicatriz de bala en mi robusto abdomen. La piel y el músculo se curarían, pero la camisa de tan delicado tejido había sido un regalo de la hija del propietario de Gilles & Gilles -esquina de la avenida Canton con la calle Troncheau- sastres de exquisitos y elegantes camisas de vestir para quienes quieren ir a la moda y miembros de la alta sociedad. No me apetecía arruinarla con mi digna sangre."¿Entonces quién eres?", preguntó Bigotes, su pistola cayendo un poco más. El momento de peligro todavía no había terminado, pero mi propia respiración se había normalizado. Mis sentidos aumentados notaros que los latidos de Bigotes se calmaban hasta llevan un ritmo razonable.'),
          parrafo('"Caballero Jak", dije con humildad. "Con toda probabilidad habrás escuchado hablar de mí".'),
          parrafo('"Entonces tú no eres ese tipo, Waxillium Ladrian?"'),
          parrafo('"¡Por el Superviviente, no!" Mi ira creció sin avisar. Muchos hombres han conocido el tacto de mis honestos nudillos por tales comentarios, pero aqui, en los apenas civilizados alrededores de las ciudades exteriores, sabía que no debía castigar a este poco informado paleto por su disparate.'),
          parrafo('"Buen hombre, no", dije ahora más calmado y soltando una generosa carcajada. Temblando se guardó la pistola en la funda Una sonrisa torcida se le dibujó entre los bigotes afilados. Me acerqué a él como me acercaría a un león de la pradera, pero instantes después estaba palmeando su espalda como si fuera un antiguo amigo (y por poco esquivando que la punta de sus bigotes no atravesara el lóbulo de mi oreja derecha, un agujero que sin duda hubiera provocado celos en el honorable Handerwym por las mentes de metal que podría colgarme de ahí).'),
          parrafo('"Una copa", rugí. "¡Una copa para mi amigo" ¡Porque yo también apuntaría con un arma a Waxillium Ladrian si me lo encontrara en personal!"'),
          parrafo('Evitando el peligro, lady Lavont vino de nuevo junto a mí, con una sonrisa asomando a sus labios. Entonces noté en la multitud un par de brazos levantados que reconocí al instante como los de Handerwyn. Al intentar captar mi atención a través de la multitud, había agitado sus brazos con tanta exasperación que una de sus mentes de metal había salido volando de su muñeca y había aterrizado como un saltador de cataratas de una ciudad exterior en el burbujeante ponche, salpincando gotas rojas manchando el traje de noche color pastel de lady Lavont.'),
          parrafo('Las convulsiones de mi fiel acompañante solo se podían interpretar de una forma. Durante mi distracción con Bigotes, los únicos botones restantes del lord Nacido de la Bruma habían sido robados, intercambiados por las indistinguibles copias, y ni yo, si Handerwyn habíamos estado en posición de interceptar a los perpetradores.'),
          parrafo('Necesitaba mis sentidos aumentados para rastrear a los ladrones, pero había usado mi última pizca de estaño para calmar los intentos de Bigotes de llevarme cara a cara con el viejo Ojos de Hierro.'),
          parrafo('Me abrí paso a empujones a través de la multitud hacia la única fuente de estaño de la sala. El broche del lord Nacido de la Bruma, que yo sabía que era falso.'),
          parrafo('-¡Continuará la siguiente semana!-'),
          h3('¡Lo mejor de la Cuenca!'),
          parrafo('El caballero Jak recomienda un Chamblis 328 con una caja de puros de la marca Doxonar.'),
          parrafo('Todas las aventuras del caballero Jak de las páginas de "El Archivo Local", recogidas por primera vez y anotadas por su fiel escriba terrisano. ¡Ya disponible en las mejores librerías de todos los octantes!'),
          h3('Árido imprudente arrestado, asesina al Tirador'),
          parrafo('Ha pasado un año de la impopular decisión de la comisaría del Cuarto Octante de poner como representante al controvertido vigilante de los Áridos, lord Waxillium Ladrian, y el octante continúa incrementando al lista de bochornos que el hombre ha causado.'),
          parrafo('Más importantes son los temerarios intentos de Waxillium "Wax" Ladrian por arrestar al infame Tirador, el cual ha robado de instituciones esenciales para el comercio de nuestra gran ciudad y que se llevó la vida de una niña inocente.'),
          parrafo('La última aventura de "Wax", aunque funcionó, también terminó con la muerte del acusado (además de un testigo no identificado), arrebatando a la ciudad la oportunidad de ver la justicia llevada a cabo en un juicio apropiado. En el proceso, Ladrian destruyó el coche a motor de lady Dorise Chevalle, la cual estaba disfrutando de un paseo de ocio, y tiró las oficinas de contabilidad de Linville & Lyons, provocando alrededor de 400 arquillas en daños. Ambos tienen abogados de oficio.'),
          h3('Alboroto en la casa de campo de Winsting Innate'),
          parrafo('Ver reverso, columna 8.'),
          h3('Brumoso de cadmio'),
          parrafo('Ralentiza el tiempo para "pulsar" durante una aburridísima reunión directiva - Ver reverso, columna 4.'),
          h3('Famoso pastelero'),
          parrafo('Decora tartas exquisitas con copos de atium - Ver reverso, columna 5.'),
          h3('Las “carreras callejeras” amenazan el gran deporte antiguo'),
          parrafo('¿Qué es lo que más se escucha una vez llegas al Eje y se empieza a hacer tarde? Motores de automóvil rugiendo como bestias áridas y el chirriar de los neumáticos derrapando en las calles. Ha pasado media década por lo menos desde que uno pudiera escuchar el ruido de golpear de cascos nocturno en el empedrado y el canto de los grillos. En los últimos seis meses, las jóvenes damas y los jóvenes lores -¡algunos de ellos los hijos de nuestros lectores!- se han puesto a retarse en carreras en algunas de nuestras calles más conocidas. Las apuestas y el intercambio de arquillas no tardaron en aparecer, y los jóvenes empezaron a pagar a bandas de niños callejeros para que alejaran deliberadamente s los agentes de estas carreras callejeras a ciertas horas predeterminadas.'),
          parrafo('El lugar más concurrido es el Tercer Octante con sus fangosas calles paralelas y sus largas rectas, y en poco menos de un mes la joven lady Carmine Feltry abrirá un circuito exclusivo para conches a motor en la antigua feria contigua al rio Puerta de Hierro.  (Continúa detrás.)'),
          h3('Un Héroe para Todas las Eras'),
          parrafo('Sablerfils & Buissonommes'),
          parrafo('¡Una guerra para acabar con el mundo! ¡Amor para alcanzar la eternidad!'),
          parrafo('La nueva operetta histórica YA en escena en Teatro Clarvonne. Calle Bonweather, 1818'),
        ],
    },
      {
        h: 'El Nuevo Ascendiente',
        cuerpo: [
          parrafo('Vol. 6, nº 220. Nueva Seran, 8 de cladence de 342. Precio 2'),
          h3('Alomante Jack presenta Nicki Salvaje, detective de lo paranormal en “Los artefactos de la antigüedad”'),
          parrafo('Cuando alguien roba un enorme mapa de Nueva Seran, la señorita Salvaje se encarga del caso. Oculto en un compartimento secreto, el mapa contiene el último regalo que le hiciera su padre: la ubicación de una tribu de seres metálicos (los kalkis), creaciones perdidas del lord Legislador. ¡El único obstáculo que se interpone entre nuestra intrépida debutante y el secreto de estos misteriosos artefactos de la antigüedad es el mágico ladrón al que llama el Hombre Encantado!'),
          parrafo('Segunda parte: "¡El funesto funicular!"'),
          parrafo('Llegué justo cuando las puertas del funicular se cerraban y la cabina se ponía en marcha con una sacudida. El Hombre encantado sonreía tras las puertas de cristal, iluminado desde abajo por el resplandor verde de sus artefactos.'),
          parrafo('Corrí en paralelo al vagón, igualando su velocidad mientras sacaba mi infalible botellín para pegar un rápido trago de cromo. La calidez se propagó desde mi estómago hasta mi garganta, aumentando a la par que mi confianza.'),
          parrafo('Cuando la cabina empezaba a alejarse ya del andén, me impulsé por los aires de un salto.'),
          parrafo('(Continúa por debajo del pliegue)'),
          h3('Los nuevos buques de Bilming “entretienen” a las autoridades de Elendel'),
          parrafo('Hace una semana, el lord alcalde de Bilming, Bastien Severington, acudió al impresionante puerto de la ciudad para recibir a las autoridades y los nobles del senado de Elendel. Al igual que la apacible tortuga (símbolo de la gran ciudad de Bilming), la cordial invitación del gobernador Severington a la élite de Elendel ha sido vista como un gesto de amistad y unidad.'),
          parrafo('Aún más impresionantes que el puerto son las filas de barcos amarrados en él. Clíperes y cargueros convencionales, en su mayoría, pero entre ellos flotan bestias metálicas como tiburones entre tortugas. Se trata de los buques de guerra diseñados por el lord alcalde Severington y el difunto doctor Florin Malin, predecesor en el cargo del actual ministro de Ciencia y Tecnología de la Cuenca.'),
          parrafo('«Cada uno de estos navíos está equipado con ocho cañones gemelos de 12 pulgadas, con un alcance de veinticuatro kilómetros», según palabras de Severington. «Otras mejoras incluyen cascos reforzados, telémetros eléctricos y una velocidad punta de 40 kilómetros por hora. Los llamamos Peltrenautas.»'),
          parrafo('Algunos de los integrantes de la delegación de Elendel, sin embargo, no se mostraron impresionados.'),
          parrafo('«Qué colección de juguetes más graciosa» observó el senador Inis Julien. «¿Para qué necesitamos acorazados? La Cuenca no tiene rival ni por mal ni por tierra. ¿De quién necesitamos defendernos?»'),
          h3('¿Tiene metal Armonía?'),
          parrafo('Galabris Menthon, filósofo de la Primera Era, planteó esta pregunta con carácter retórico, pero incluso el lord Nacido de la Bruma estaba pensando en ello cuando formuló sus famosas palabras: «¿En teniendo metal que lo tiene Sazed?»'),
          parrafo('El debate se perpetúa en consejos y tabernas por igual. Pero ahora, los adelantos científicos nos acercan a la respuesta.'),
          parrafo('(Continúa en la parte de atrás.)'),
          h3('Golpe en la mansión de los Farthing'),
          parrafo('Un acto de vandalismo y latrocinio tiene en vilo a la élite de la ciudad. Alguien entró en la Mansión Farthing ayer por la noche, se llevó algunos objetos y pintó un símbolo de oro invertido en la pared.'),
          parrafo('Lady Farthing ofrece una recompensa a quien le devuelva sus joyas. Tengan la bondad de presentar cualquier información que posean en la comisaría del centro.'),
          h3('Obreros uníos'),
          parrafo('Multitudinaria reunión esta noche en la 7º hora en el Cuce de Embel con la 5º. Manifestación contra los impuestos injustos y los salarios bajos.'),
          h3('La elección del aplacador'),
          parrafo('Goma de mascar.'),
          parrafo('Pasa de Del y compra local. La Elección del Aplacador es la ÚNICA elección.'),
          h3('Pasajeros atrapados por la avería de un funicular'),
          parrafo('Según la Autoridad de Transportes de Nueva Seran, un fallo no identificado detuvo ayer la Línea de Cinc alrededor del anochecer. La ATNS llevó a los pasajeros a sus hogares a la antigua usanza, recorriendo los caminos llenos de altibajos montados en burros y velocípedos. Consideramos esto prueba suficiente de que sería necesario diseñar un sistema de transporte de emergencia.'),
          h3('¡Beba a la salud de Elendel!'),
          parrafo('El whisky Brand siempre se ha cultivado y destilado exclusivamente en las ciudades exteriores. Puesto que no se vende en Elendel, no pasa nunca por la Guarida del León y, por consiguiente, está libre de impuestos. Sabe mejor que cualquier producto central, y su carácter autóctono le garantiza que su dinero no va a parar en los bolsillos de la tiranía. ¡Larga vida a Brand!'),
          h3('¿Busca aventuras? ¡Bill de la Cuenca le está buscando!'),
          parrafo('En la Ascensión Final se perdieron cientos de ciudades. ¡Artefactos mágicos, tesoros y fama pueden ser suyos! Persónese en la Antigua Taberna & Casa de Apuestas de Bill de la Cuenca.'),
          h3('¿Le hablan sus herramientas metálicas?'),
          parrafo('Sus vecinos seguramente no querrán ni oír hablar de ellos, ¡pero nosotros sí! Visite la Plaza de Ralen 27 y pregunte por K. o por N. Lleve con usted los metales parlantes.'),
          h3('¡ESTRENO! En el Teatro Trío del Centro “¡La guarida del superviviente!”'),
          parrafo('Un equipo de luchadores por la libertad se laza contra la opresión y derroca un gobierno corrupto. Protagonizada por Javier DaLeuc y Penelope Portreau. ¡Asista a la representación de esta historia atemporal hasta finales del próximo mes!'),
          h3('Se necesitan alomantes en potencia'),
          parrafo('Para probar nuevas aleaciones metálicas. Gracias a los nuevos adelantos científicos se ha descubierto un método COMPLETAMENTE SEGURO para descubrir nuevas habilidades alománticas. ¡Desate su potencial latente! Persónese en la Vivienda 1447, Distrito de la Caja, en la esquina frente a la planta para el aprovechamiento de residuos animales de Meprisable.'),
          h3('¡Escriba fantasías científicas!'),
          parrafo('¡B. Sablerfills, creador de «Un héroe para todas las eras» le enseñará cómo hacerlo! Pregunte en la Universidad de Nueva Seran.'),
          h3('El funesto funicular'),
          parrafo('Los monjes de Baz-Kor me habían entrenado bien; sus ágiles movimientos están diseñados para conseguir que una sanguijuela se acerque lo suficiente a otro alomante y drenar sus reservas. Pero fueron las clases de ballet lo que me permitió llegar de un salto desde el andén al funicular en marcha.'),
          parrafo('Ejecuté el aterrizaje perfecto en la pequeña plataforma que rodeaba el fondo del vagón y conseguí agarrarme con firmeza a las manillas de la puerta. Estaba a salvo, de momento, pero el asidero donde tenía apoyados los pies apenas medía unos centímetros de ancho. Como no encontrase una forma de entrar en el funicular pronto, incluso mis dedos reforzados por el ballet sucumbirían, condenándome a una caída de treinta metros de altura sobre la ciudad, cuyos tejados relucían como arquillas con los últimos rayos de sol.'),
          parrafo('La claridad etérea que emanaba del interior de la cabina proyectaba la sombra del hombre encantado sobre las ventanillas. Cada nueva ráfaga de luz lo mostraba pugnando por preparar algún tipo de artefacto arcano, sin duda con la intención de escapar.'),
          parrafo('Saqué de mi bandolera el instrumento que le había sustraído la última vez que forcejeamos. Cubierto de símbolos extraños y curiosamente cálido al tacto, pesaba mucho más de lo que parecía a simple vista; no tenía ni idea de cómo accionarlo.'),
          parrafo('La ignorancia, sim embargo, no es rival para la inventiva- Utilicé las varillas de metal para, de un golpe, hacer añicos el cristal de la puerta.'),
          parrafo('Me recibió una violenta explosión, y los reflejos adquiridos en Baz-Kor me impulsaron de súbito a un lado al tiempo que un proyectil pasaba aullando por mi lado. No era ni una flecha ni una bala, sino una ráfaga de energía pura en forma de espectro. Su alarido, espeluznantemente humano, me puso el vello de punta; el marco de la puerta dañada se oxidó y deformó tras su estela. ¿Qué clase de hombre podía dominar el poder de los muertos? Si la energía me hubiera envuelto también a mí, ¿me habría desintegrado yo también en un mero instante? Respiré hondo e irrumpí en el interior del vagón.'),
          parrafo('El suelo estaba sembrado de extraños componentes mecánicos, y sobre ellos se alzaba el hombre encantado. La última vez que nos enfrentamos llevaba puesto un gabán de bruma, cuya capucha le ocultaba el rostro, pero ahora pude ver sus facciones con toda claridad. Sus fríos ojos relampagueaban, y el viento le alborotaba los cabellos del color de la arena. En una mano sostenía el tapiz enrollado, empuñándolo como si de un bastón se tratara. Con la otra apuntaba hacia mí una pistola cuyo modelo me resultaba desconocido. Origen. sin duda, del fantasma que acababa de disparar.'),
          parrafo('Las runas que cubrían los costados del arma centelleaban con un resplandor esmeralda. Quemé cromo y me abalancé sobre él con un movimiento de Baz-Kor di señado para incapacitar a los lanzamonedas antes de que estos pudieran dejarte como un colador. Cuando las runas verdes empezaban a emitir un fulgor rojo, mi mano rozó el metal del artefacto.'),
          parrafo('Cuando dreno las reservas de metal de un brumoso, me sobreviene una sensación que sólo puedo describir como si extrajera poder del metal y lo devolviera a algún tipo de fuerte externa. El metal se queda en su sitio, pero la energía se desvanece.'),
          parrafo('Supongo que ocurrió algo parecido cuando toqué la pistola. Extraje el poder que habitaba en su interior y lo envié de regreso a... otra parte.'),
          parrafo('El resplandor rojo de las runas se apagó como la llama de una vela azotada por el viento.'),
          parrafo('¡Funcionó! El artefacto encantado sin duda provenía de otro mundo, no era feruquímico ni alomántico, pero había reaccionado al contacto con mi cromo.'),
          parrafo('El hombre encantado observó la pistola de reojo y rechinó los dientes.'),
          parrafo('- Helmore... ¿Qué has hecho?'),
          parrafo('Tocó unas cuantas de las runas que recubrían el costado de su artefacto, parecido a una pistola, y los símbolos empezaron a brillar otra vez. Me apuntó con el arma, en esta ocasión a escasos centímetros de mi cara. La estratagema con el cromo no había estropeado la pistola. como esperaba. Ya que no podía absorber su poder por completo, tendría que arrebatársela al hombre encantado.'),
          parrafo('Me dejé llevar por el adiestramiento que había recibido en Baz-Kor y ejecuté una maniobra diseñada para desarmar a cualquier agresor. Una ágil finta me llevó detrás de mi adversario, lejos del alcance de la pistola. Ahora el hombre encantado se interponía entre la herrumbrosa puerta del funicular y yo. Mi siguiente movimiento lanzó la extraña pistola lejos de la mano del hombre, volando por los aires.'),
          parrafo('El hombre encantado se giró en redondo para encararse conmigo, con un brillo de sorpresa en los ojos. Aproveché la ocasión para coger el mapa.'),
          parrafo('Solo pude agarrar un extremo, por desgracia, y se desenrolló entre el hombre encantado y yo. Cada uno de nosotros tiraba de un extremo distinto del mapa Únicamente necesitaba encontrar el bolsillo secreto cosido en su interior que contenía las instrucciones de mi padre. Después de aquello, que el ladrón se quedase con el resto del tapiz o no carecería de importancia.'),
          parrafo('- ¡Sombras, mujer! ¡Déjame en paz!'),
          parrafo('Reafirmó si presa sobre el extremo del mapa y saltó por el boquete practicado en el lateral del vagón.'),
          parrafo('El inesperado tirón sobre el tapiz me derribó y me arrastró por el suelo hasta que mi cabeza y mis brazos quedaron en suspensión sobre el vacío, aunque conseguí sujetar con ambas manos mi extremo del mapa, lo único que evitaba que el hombre encantado se precipitara a su fin.'),
          parrafo('- ¡Helmore! -chilló- ¿Por qué no te das por vencida?'),
          parrafo('- ¡Nunca! -me aferré a la tela aún con más fuerza.'),
          parrafo('-No es más que un estúpido mapa. -Observó el tapiz. Ajustando su presa unos centímetros hacia el costado, arrugó la tela entre los dedos y empezó a trepar.'),
          parrafo('- ¿Es mi legado! -Grité a mi vez.'),
          parrafo('- Como si es el albornoz del Superviviente. ¡Dámelo!'),
          parrafo('- ¡Eres un ser miserable!'),
          parrafo('- Veo que empiezas a conocerme.'),
          parrafo('Espero que no seáis muy duros conmigo si os confieso que ese agradable timbre de aquel desconocido tan cómico me tenía absolutamente embelesada. Su cabello dorado, sus ojos de hielo azul... Si alguna vez nos vemos en persona, con mucho gusto os proporcionaré una descripción más detallada.'),
          parrafo('- En verdad -dije-, un ápice de cortesía por tu parte podría haber evitado toda esta debacle y ahora no estarías colgando a quince metros de tu muerte, agarrado a los hilos de un mapa mal dibujado. Sube. Lleguemos a un acuerdo.'),
          parrafo('Extendió la mano, como si se dispusiera a aceptar mi oferta, pero algo centelleó en ella a la luz de las estrellas. Quemé metal por instinto, liberando una mano para tocar el objeto.'),
          parrafo('Era un cuchillo de caza corriente y moliente,'),
          parrafo('- «Cortesía...» -se burló-. Eso no va conmigo.'),
          parrafo('Sujetó su extremo del tapiz y rebanó el borde con el cuchillo. Entre nosotros se formó una V de tela antes de que el mapa se partiera completamente por la mitad.'),
          parrafo('Me aparté del borde, tanteé desesperadamente mi mitad del mapa en busca del bolsillo oculto, y lo encontré casi al instante. A falta de un cuchillo, sin embargo, tendría que esperar hasta que volviera a la mansión para abrirlo. Pese a todo, me aliviaba saber que, si bien el hombre encantado ya no existía y el mapa de mi padre había quedado arruinado, poseía la información necesaria para proseguir con mi misión. Aunque confieso, no obstante, que si el hombre encantado hubiera llegado a sobrevivir a la caída, se habría quedado con la mitad más importante del mapa.'),
          parrafo('Tras desembarcar del funicular, encaminé mis pasos hacia el punto donde mi adversario tendría que haberse estrellado contra el suelo. No hallé ni rastro de él, y aunque nadie presenció su final, un joven con el pelo blanco que andaba por los alrededores se ofreció a contarme una historia... Oferta que decliné.'),
          parrafo('Una vez en casa, encendí la lámpara eléctrica y encontré a Rodena Alhumaja III dormida en mi cama con sus gatitos. Con cuidado para no despertarlos, utilicé un cuchillo de costura para abrir el bolsillo oculto del tapiz en un abrir y cerrar de ojos. Dentro, en una hoja de vitela plegada, la elegante caligrafía de mi padre rezaba:'),
          parrafo('«Mi queridísima Nicelle,'),
          parrafo('En esta misiva habré de desvelarte. por fin, el secreto de los misteriosos artefactos de la antigüedad...»'),
          parrafo('(¡¡¡Continuará la semana que viene!!!)'),
        ],
    },
      {
        h: 'Las Dos Estaciones',
        cuerpo: [
          parrafo('Bilming - “No hay dos estaciones iguales”, proverbio de los Originadores. Precio – 5'),
          h3('“Handerwym presenta: Nicky Salvaje y la brújula de los espíritus”'),
          parrafo('En mi última misiva presencié, junto con el Hombre Encantado y mis dos acompañantes Inmortales sin Rostro, cómo la lanzamonedas Vila Mecant me arrebataba la Brújula de los Espíritus y se arrojaba a las brumas desde un saliente de piedra. No obstante, la llave de aluminio que activaba el artefacto seguía en mi poder. Sabiendo que Vila iba a regresar, confié la llave al Hombre Encantado, que utilizó sus pistolas infernales para impulsarse hasta otro saliente mientras yo me quedaba intentando convencer a mis amigos sin rostro de que tenía un plan, lo cual, por supuesto, era cierto.'),
          parrafo('CAPÍTULO 8: «EL VUELO DEL ORNISAURIO»'),
          parrafo('KeSun puso los ojos en blanco.'),
          parrafo('- ¿Y cómo pretendes seguir a Vila y hacer que salga?'),
          parrafo('- Usando los huesos de aluminio que recogimos en la cantera de los ornisaurios -respondí, dando una palmada en el gigantesco morral que llevaba Tabaar.'),
          parrafo('El kandra dio un profundo gemido en su robusto cuerpo.'),
          parrafo('- Oh, no.'),
          parrafo('- Eres muy bueno en la imitación -lo animé- ¿Te acuerdas de cuando interpretaste a Humano el koloss en «Un héroe para todas las Eras»? ¡Estuviste magistral! ¡Puedes hacerlo!'),
          parrafo('- No puede -replicó KeSun, cruzándose de brazos-. No sin mí. Yo soy la que tiene experiencia imitando a aves. -Y volviéndose hacia Tabaar añadió-: Si estás dispuesto a cederme parte del control, llevaremos a la señorita Sauvage al otro lado de este abismo.'),
          parrafo('- Pero el resto de mi colección... -protestó él, y el morral lleno de huesos se movió a su espalda.'),
          parrafo('- Te prometo que volveremos a por ella -dijo KeSun, con una compasión en la voz que reservaba solo a Tabaar. Se dirigió a mi arqueando una ceja-. ¿Te importa mirar hacia otro lado? Preferimos que no nos veas mientras nos...'),
          parrafo('- ...fusionamos -terminó la frase Tabaar.'),
          parrafo('Lo que ocurrió a continuación fue una de las cosas más extrañas que me han pasado nunca, más incluso que la Bestia de Belmon Couture o la ocasión en la que fui ayudante de Alomante Jak.'),
          parrafo('(Continúa bajo el pliegue)'),
          h3('Las Dos Estaciones se retracta'),
          parrafo('Las Dos Estaciones se retracta de los comentarios vertidos por nuestra apreciada directora Kyndlip Ternavyl hace dos semanas, previos a su desaparición, en los que comparaba a nuestro querido alcalde con un «verraco irascible, aunque no tan listo, menos atractivo e incapaz de contenerse cuando ve un lodazal donde revolcarse».'),
          h3('Carta a la directora'),
          parrafo('Me veo obligado a objetar de nuevo a que su pasquín publique anuncios de Industrias Soonie, fabricante del «Cachorrito Soonie», empresa que también ha hecho caso omiso a mis numerosas cartas relativas a su históricamente ofensiva representación del compañero de la Guerrera Ascendente como un perro lobo terrisano, cuando los académicos han demostrado repetidas veces que las razas de perro modernas aún no se habían establecido en los Tiempos de Ceniza, y que el guardián de la Guerrera Ascendente no era un absoluto un perro lobo, sino un lobero'),
          parrafo('Un reacio saludo del profesor Olin Tober.'),
          parrafo('Universidad de Elendel'),
          h3('Editorial invitado'),
          parrafo('Por Gemmes Millis, director en funciones.'),
          parrafo('¡APLIQUEN LA PROHIBICIÓN DEL BALONMORRO!'),
          parrafo('Los vemos en todos los terrenos sin sembrar y solares sin construir: maleantes y haraganes, entre ellos nuestros propios hijos, congregándose en pandillas y «jugando» al juego del mismísimo Muerte, el balonmorro. ¡Esos «jugadores» deberían estar en clase o trabajando en la fábrica! Pero en vez de eso, sus balones mal apuntados impactan contra incautos conductores y llenan de obstáculos las calzadas. El alcalde prohibió tal desaguisado hace meses, y aun así los alguaciles no hacen cumplir la ley. ¡Herr*mbre y R*ina, algunos hasta se unen al juego! ¡Acudan todos a la manifestación contra el balonmorro convocada el próximo aces por la tarde en el parque Tabret, cerca del centro, y súmense a Una Causa Digna!'),
          h3('Visite el templo de los brazales de duelo'),
          parrafo('Viaje con la Agencia Bill de la Cuenca al lugar donde Disparo al Amanecer se enfrentó al destino. Recreaciones diarias protagonizadas por Trevva Cett-Venture y Penelope Porteau. ¡Ya disponibles nuestras excursiones diarias a las fuentes termales!'),
          h3('No son monedas'),
          parrafo('Son peligrosos talismanes malwish que deben ser entregados a las autoridades para su eliminación. Protéjase usted mismo y a los suyos de la perversa brujería malwish. Contacte con N & N en la c/ Dieciséis, 42 para una generosa RECOMPENSA.'),
          h3('Beba el delicioso choc-o-tonic'),
          parrafo('¡LE HARÁ CHISPEAR LOS OJOS!'),
          parrafo('CHOC-O-TONIC'),
          parrafo('¿Sospecha de otras tónicas gaseosas y sus supuestas «fórmulas secretas»? ¿Busca una bebida gaseosa cuyo sabor sea identificable son contratas a un químico? ¡Pues no busque más! El sabor de nuestra tónica procede solo del mejor cacao malwish importado, tostado y condensado en nuestra tonificante bebida. ¡Pídala por su marca!'),
          h3('La ley de la supremacía de Elendel amenaza la unidad de la cuenca'),
          parrafo('En cuestión de días, el Senado de Elendel someterá a votación lo que la mejor mente política de Bilming, el profesor Garven Munz, califica como «el cambio más monumental en nuestra estructura de gobierno desde las Palabras de instauración».'),
          parrafo('Se prevén jornadas enteras de discursos, debates y posicionamientos antes de la votación, y las ciudades exteriores tienen los ojos puestos en el llamado senador alguacil de los Áridos, cuyas recientes visitas al norte de la Cuenca han consolidado la postura que comparte con muchos habitantes de las ciudades exteriores: representación, mejor que supremacía. El gobernador Varlance y sus compinches se oponen con vehemencia a esa actitud, desde un punto de vista que se resume en el atrevido discurso inicial de la vicegobernadora Adawathwyn: «Será necesario que tengamos un líder fuerte y experto cuando nuestros enmascarados amigos sureños nos traigan la guerra». La almirante Jones de la Nación Malwish se mostró visiblemente agitada y no regresó a la cámara tras el receso de la sesión.'),
          parrafo('Cuando se preguntó a Varlance si también opinaba que la Cuenca se dirige a una guerra contra los malwish, el gobernador se limitó a señalarse el pecho, donde llevaba bien visibles sus medallas militares.'),
          parrafo('(Continúa al dorso)'),
          h3('Nuestra directora sigue desaparecida'),
          parrafo('Han transcurrido ocho días desde que el marido y los hijos de nuestra estimada directora imploraron entre lágrimas su regreso. Desde entonces, los reporteros de este pasquín han peinado la ciudad, acosado al alcalde y seguido todas las pistas proporcionadas por nuestros apreciados lectores. Hasta nuevo aviso, y en ausencia de información urgente, las novedades diarias al respecto irán al dorso. Por favor, no dejen de enviarnos indicaciones a nuestra redacción, en la esquina de la 109 con Stratten.'),
          h3('Cuidado'),
          parrafo('LOS IMITADORES ADIRMAN TENER LA FÓRMULA SECRETA'),
          parrafo('Pero esos falsificadores solo buscan vaciarle la carteara y engañarlo para que beba un producto inferior. Si es su botica le dicen que otra marca es «lo bastante buena», responda:'),
          parrafo('«A MI, PLIF, YO QUIERO VIF»'),
          parrafo('(Mensaje sufragado por Gaseosas Vif).'),
          h3('El hombre que electrifico el tiempo'),
          parrafo('La nueva novela del técnico bilimingués Schrib Welfor. ¡Ya en las mejores librerías!'),
          h3('Oferta de trabajo'),
          parrafo('Se busca cocinero brumoso de bendaleo para restaurante de «servicio rápido». Gran sueldo más bonificaciones y extra de bendaleo recreativo para fuera del trabajo. ¡Horario estupendo! Un día libre a la semana y otros dos anuales por el día del Superviviente o la Armondad. Acudir en persona a Kevron, en la esquina de la Segunda con Nellis.'),
          h3('Comida a domicilio'),
          parrafo('Encargue por anticipado nuestra entrega de día o de noche, llueva o brumee, de las viandas de cualquier restaurante abierto. Nuestros repartidores del acero bien entrenados esquivan el tráfico porque se conocen todas las carreteras, derecheras y roderas. Envíe su pedido por la mañana a Vema en la Cocina del Acero para recibirlo el día siguiente.'),
          h3('El tiempo'),
          parrafo('Posibilidad de niebla en Puntafaro. Llegarán tormentas desde el mar, pero la bruma será escasa durante al menos dos semanas. Máxima 26, mínima 17.'),
          h3('Elariel exposición'),
          parrafo('Venga a nuestra tienda principal en la ciudad para admirar los diseños de inspiración terrisana creados por el talento emergente de Idkwyl Elariel.'),
          parrafo('¡A PARTIR DEL LATES!'),
          h3('Cesan los temblores en los túneles por ahora'),
          parrafo('¿El ayuntamiento se dispone a abandonar su ferrocarril subterráneo?'),
          parrafo('Es la protesta favorita de todo bilmingués que se precie: ¿Cuándo terminará la construcción del ferrocarril subterráneo? Emprendido hace más de cuatro años con un presupuesto inflado que oxida los metales de todo contribuyente en Bilming, el proyecto de transporte por túneles debía aliviar los problemas de tráfico de la ciudad. En contraste con el escaso progreso apreciado en la vía subterránea, la Secretaría de Transportes de Bilming ha añadido nuevas líneas al tren elevado y más carriles a las autopistas. Llegado este punto, ¿necesitamos un ferrocarril subterráneo, teniendo en cuenta que su construcción coincide con los leves terremotos que nos sacan de quicio cada pocos meses?'),
          parrafo('Ampliación al dorso: Propietario de salón de aplacimiento, agradecido por la agitación pública.'),
          h3('Alomante Jak y su secuaz hacen las paces'),
          parrafo('Alomante Jak ha llegado a un acuerdo con su anterior acompañante, Handerwym Terrisano, quien acusaba al famoso magnate de esquilmar sus acciones de la empresa para invertir en nuevos negocios, como los evanoteatros que obtuvieron un éxito fugaz hace unos años. Aunque las aventuras de Jak proseguirán en «El Centinela de la Verdad», la sección «Handerwym presenta» será a partir de ahora exclusiva de nuestra cabecera en Bilming.'),
          parrafo('«Fue desde el principio mi intención -dijo Jak a una multitud de enfervorecidos admiradores- entrenar a mi querido Handerwym para que alcanzara la grandeza antes de destetarlo, arrojarlo fuera del nido y ver si vuela o cae. Además, ahora que ya no tengo que pagarle, utilizaré el tiempo y el dinero en escribir mis memorias y explorar nuevos y prometedores medios narrativos. ¿Sabéis qué será lo próximo? ¡Los bislibros! ¡Historias que pueden leer hasta quienes no saben!».'),
          parrafo('Al solicitarle un comentario a estas declaraciones, Terrisano se limitó a cerrar los ojos y suspirar.'),
          parrafo('Más detalles al dorso: Por qué permitió la jueza que Jak conservara el tigre.'),
          h3('El vuelo del ornisaurio'),
          parrafo('Confieso que ardía en deseos de echar un vistazo, pero el respeto que sentía por mis antiguos compañeros me llevó a cumplir sus indicaciones. El sonido de su fusión me recordó a un pulpo besando a una babosa gigante. Durante diez minutos.'),
          parrafo('Cuando me permitieron mirar de nuevo, el animal que tenía ante mí se parecía a una versión sin plumas de las pinturas de ornisaurios que habíamos visto en la cantera, con largos huesos finos y alas como de murciélago. A ambos lados de la cabeza de la criatura, en lugar que deberían ocupar sus ojos, estaban la cara de KeSun a la derecha y la de Tabaar a la izquierda.'),
          parrafo('- ¡Sois una verdadera preciosidad! -exclamé, aplaudiendo'),
          parrafo('- Y tú eres una mujer muy extraña, señorita Sauvage -dijo la bestia desde la boca de Tabaar.'),
          parrafo('Me levantaron del suelo con una zarpa, se lanzaron desde el acantilado y la piel de sus alas se tensó de golpe como un paraguas al abrirse.'),
          parrafo('Por debajo de nosotros empezaron a asomar las puntas de otros salientes de piedra entre una bruma suave y gradual, que imposibilitaba distinguir dónde terminaban las brumas y dónde empezaban los salientes.'),
          parrafo('Busqué algún rastro de Vila. Yo en su lugar esperaría a que entráramos en la bruma para acercarme, así que dirigí a Tebaar-KeSun hacia ella mientras me ponía la nudillera metálica con forma de serpiente en la mano izquierda. En la derecha tenía mi parasol preparado.'),
          parrafo('Nos internamos en la bruma y, tal y como había anticipado, la silueta de Vila apareció y trazó un arco hacia nosotros hasta que colisionamos.'),
          parrafo('- ¿Dónde está la llave? -gritó Vila.'),
          parrafo('- Ya muy lejos de aquí -respondí con una sonrisa.'),
          parrafo('Vila rugió desnudando los dientes. Lo que vino a continuación fue un frenesí de puñetazos y patadas mientras la lanzamonedas trataba de aferrarse a la pata del ornisaurio. Eso me otorgaba ventaja, ya que la garra de Tabaar-KeSun me tenía sujeta con la firmeza suficiente para poder luchar sin caer al abismo.'),
          parrafo('Aporreé a Vila con la punta de mi parasol cerrado y entonces, cuanto la tenía distraída, le aticé un buen puñetazo con la nudillera metálica. Mientras la serpiente de oro conectaba con la mejilla de Vila, quemé cromo y usé mi poder de sanguijuela para agotar sus reservas de acero.'),
          parrafo('- Dame la brújula -le dije- y te dejaremos en el próximo saliente.'),
          parrafo('Vila echó un vistazo atrás y vio la superficie de piedra, cada vez más cercana, donde esperaba el Hombre Encantado.'),
          parrafo('Me miró con los ojos como platos, sin duda comprendiendo que, al no tener acero, no podría usar su poder de lanzamonedas. Estaba atrapada- Se sorprendió tanto que olvidó sujetarse a nada aparte de la brújula.'),
          parrafo('Eso sí que no lo había previsto.'),
          parrafo('- ¡No! -chillé.'),
          parrafo('Solté de inmediato el parasol y traté de agarrar a Vila. La serendipia quiso que mi pulo se cerrara en torno al encaje de su chaqueta con volantes.'),
          parrafo('- ¿Me has salvado? -preguntó-. ¿No quieres que caiga?'),
          parrafo('- Por Armonía, no -dije.'),
          parrafo('Me propinó un golpetazo en la cara con la brújula, lo cual sin duda fue muy mala jugada por su parte. La solté por acto reflejo.'),
          parrafo('Mientras Vila caía, me incliné hacia delante para intentar atraparla de nuevo, pero la serendipia es veleidosa y mi mano y la suya no lograron asirse por un pelo. Horrorizada, vi cómo las brumas se la tragaban. Pero entonces, el súbito movimiento de mi peso hizo que me soltara de la zarpa.'),
          parrafo('Repentinamente ingrávida, temí que aquel fuese mi final.'),
          parrafo('Entonces sentí que el aire se movía empujado por unas enormes alas. Una garra me atrapó en el aire y me dejó caer en el saliente, al lado del Hombre Encantado.'),
          parrafo('Resbalé hasta detenerme casi en el mismo borde y mis botas personalizadas Miele Jedon enviaron piedrecitas repiqueteando precipicio abajo, Bendito sea ese calzado y sus suelas a la moda, pero de gran tracción. (Están a la venta en Ardenne, en la calle Novena. Mis botas son personalizadas, sí, pero los dependientes estarán encantados de ayudar a todo lector que vaya de mi parte).'),
          parrafo('Con el corazón desbocado y el aliento resollante, escruté el abismo desde la plataforma de piedra.'),
          parrafo('- ¡La brújula! ¡Hay que registrar el fondo del acantilado!'),
          parrafo('Tabaar-KeSun aterrizó y abrió su otra garra. La brújula salió rodando y la recogí del suelo. Antes de que pudiera darles las gracias, el Hombre Encantado me cogió la mano y me miró con ojos intensos, desesperados. Dado su habitual gesto ceñudo, esa nueva expresión me resultó tan ajena en él como lo sería un perfume barato en mí.'),
          parrafo('- Mi queridísima Nicelle -dijo, dedicándome una infrecuente sonrisa.'),
          parrafo('- ¿Qué ocurre? -pregunté mientras me buscaba heridas en el cuerpo. Aunque habían saltado algunos botones de mi blusa, al menos no había perdido la camisa entera, como siempre le ocurre a Jak llegado a este momento en sus historias-. Estoy bien. Lo prometo.'),
          parrafo('- Casi te caes -dijo, acunándome la mejilla en una mano grande y áspera.'),
          parrafo('Noté un calor bullente mamando del corazón y no pude evitar devolverle la sonrisa. ¡Cuán lejos habíamos llegado desde nuestro primer encuentro!'),
          parrafo('- No digas bobadas. No te librarás de mi tan fácilmente -repuse-. Tú y yo exploraremos juntos el Cosmere por siempre. Es lo que prometimos.'),
          parrafo('Dejé que el Hombre Encantado me acercara a él y sentí que me embargaba su familiar aroma a fuego infernal y cedro. Con el artejo de su dedo índice me levantó la barbilla para que contemplara sus ojos tempestuosos.'),
          parrafo('¿Iba a besarme? ¿Quería yo que lo hiciera? Por Armonía, sí. En ese instante comprendí que era eso lo que había deseado aquellos últimos seis años, cada vez que el Hombre Encantado aparecía y, de manera inevitable, ponía mi vida patas arriba.'),
          parrafo('- Nicelle... -dijo, con voz grave y susurrante.'),
          parrafo('- ¿Sí?'),
          parrafo('Me puse de puntillas y acerqué la cara a la suya.'),
          parrafo('- No sabes cuánto lo siento.'),
          parrafo('Levantó la Brújula de los Espíritus, insertó la llave de aluminio y la giró. Los pequeños anillos rotaron hasta convertirse en una fluida luz etérea, que se invirtió sobre si misma con un gran estallido que sentí en el alma más que capté con los oídos.'),
          parrafo('Caí hacia delante de rodillas, ya que, sin la presencia del Hombre encantado allí para sostenerme, aunque una imagen residual de él activando el aparato permaneció en el aire un momento antes de disiparse como el humo de una cerilla quemada.'),
          parrafo('El Hombre Encantado lo había conseguido. Había entrado por fin en la dimensión fantasmal.'),
          parrafo('Y lo había hecho sin mí.'),
          parrafo('El muy malnacido me había traicionado. Herrumbres, me había utilizado.'),
          parrafo('Ahorraré al lector los espantosos detalles del subsiguiente berrinche, aunque proferí algunas de las deliciosas maldiciones que aprendí en el tiempo que había pasado con él. Al terminar la rabieta, mi inmaculado maquillaje estaba hecho un desastre, el sombrero con plumas de cuervo era un harapo y Tabaar y KeSun de pronto habían recobrado su forma humana.'),
          parrafo('- ¡Se ha ido! -grité-. ¡Y con él, la única forma de terminar el trabajo! ¡Y ahora estamos perdidos a miles de kilómetros de casa, en el hueco entre continentes!'),
          parrafo('Había creído que le importaba. Él sabía que una traición como esa me dolería, y lo había hecho de todos modos. Herrumbre y Ruina, ojalá llegara demasiado tarde para salvar el mundo, Por mí, que ardieran en el infierno él y su condenado patrono.'),
          parrafo('- Suerte tiene de que no pueda seguirlo.'),
          parrafo('Cerré el puño con tanta fuerza alrededor de la nudillera metálica que los bordes de me clavaron en la palma. Los dos Inmortales sin Rostro cruzaron la mirada y entonces KeSun asintió, como tomando una decisión. Pero fue Tabaar quien habló.'),
          parrafo('- En realidad-dijo-, hay otra manera.'),
          parrafo('______________________________'),
          parrafo('Nota de Handerwym:'),
          parrafo('Han pasado dos semanas desde la última misiva de Nicelle; a estas alturas el lector ya sabe lo intermitente que puede ser su correspondencia. Debo dar por hecho que logró internarse en el dominio fantasmal y, Armonía mediante, pronto conoceremos el final de su aventura'),
          parrafo('¿Continuará la próxima semana?'),
          h3('Nicky Salvaje está patrocinada por el Cachorrito Soonie Veraz de Tober - ¡Bolsillo patentado!'),
          parrafo('¡Canjee un Cachorrito Soonie históricamente erróneo y llévese un flamante Cachorrito Soonie veraz del profesor Tober por solo un quintejo!'),
        ],
      },
    ],
  },

  "nacidos-del-metal": {
    slug: "nacidos-del-metal",
    titulo: "Nacidos del metal",
    icono: "table_chart",
    sub: "Nombres de los usuarios de las artes metálicas y los efectos de los metales.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "Los nombres de los usuarios de las artes metálicas y los efectos de los metales, tal como los recoge la guía de traducción."
          ),
          tabla(
            ["", "METAL", "ALOMANCIA", "FERUQUIMIA", "HEMALURGIA"],
            [
              [{ t: "FÍSICO", cat: true, rowSpan: 8 }, { t: "Hierro", negrita: true, rowSpan: 2 }, { t: "Atraedor", negrita: true }, { t: "Ajustador", negrita: true }, { t: "Roba fuerza", rowSpan: 2 }],
              ["Atrae metales cercanos", "Acumula peso físico"],
              [{ t: "Acero", negrita: true, rowSpan: 2 }, { t: "Lanzamonedas", negrita: true }, { t: "Mensajero de acero", negrita: true }, { t: "Roba alomancia física", rowSpan: 2 }],
              ["Empuja metales cercanos", "Acumula velocidad física"],
              [{ t: "Estaño", negrita: true, rowSpan: 2 }, { t: "Ojo de estaño", negrita: true }, { t: "Susurravientos", negrita: true }, { t: "Roba sentidos", rowSpan: 2 }],
              ["Incrementa los sentidos", "Acumula sentidos"],
              [{ t: "Peltre", negrita: true, rowSpan: 2 }, { t: "Brazo de peltre / violento", negrita: true }, { t: "Bruto", negrita: true }, { t: "Roba feruquimia física", rowSpan: 2 }],
              ["Incrementa las capacidades físicas", "Acumula fuerza física"],
              [{ t: "COGNITIVO", cat: true, rowSpan: 8 }, { t: "Cinc", negrita: true, rowSpan: 2 }, { t: "Encendedor", negrita: true }, { t: "Chispeante", negrita: true }, { t: "Roba fortaleza emocional", rowSpan: 2 }],
              ["Enciende emociones", "Acumula velocidad mental"],
              [{ t: "Latón", negrita: true, rowSpan: 2 }, { t: "Aplacador", negrita: true }, { t: "Alma de fuego", negrita: true }, { t: "Roba feruquimia cognitiva", rowSpan: 2 }],
              ["Aplaca emociones", "Acumula calor corporal"],
              [{ t: "Cobre", negrita: true, rowSpan: 2 }, { t: "Nube de cobre / ahumador", negrita: true }, { t: "Archivero", negrita: true }, { t: "Roba fuerza mental", rowSpan: 2 }],
              ["Oculta pulsos alománticos", "Acumula recuerdos"],
              [{ t: "Bronce", negrita: true, rowSpan: 2 }, { t: "Buscador", negrita: true }, { t: "Centinela", negrita: true }, { t: "Roba alomancia mental", rowSpan: 2 }],
              ["Revela los pulsos alománticos", "Acumula desvelo"],
              [{ t: "HÍBRIDO", cat: true, rowSpan: 8 }, { t: "Cadmio", negrita: true, rowSpan: 2 }, { t: "Pulsador", negrita: true }, { t: "Resollante", negrita: true }, { t: "Roba alomancia temporal", rowSpan: 2 }],
              ["Ralentiza el tiempo", "Acumula aliento"],
              [{ t: "Bendaleo", negrita: true, rowSpan: 2 }, { t: "Deslizador", negrita: true }, { t: "Incorporador", negrita: true }, { t: "Roba feruquimia espiritual", rowSpan: 2 }],
              ["Acelera el tiempo", "Acumula energía"],
              [{ t: "Oro", negrita: true, rowSpan: 2 }, { t: "Augur", negrita: true }, { t: "Hacedor de sangre", negrita: true }, { t: "Roba feruquimia híbrida", rowSpan: 2 }],
              ["Revela el pasado propio", "Acumula salud"],
              [{ t: "Electro", negrita: true, rowSpan: 2 }, { t: "Oráculo", negrita: true }, { t: "Pináculo", negrita: true }, { t: "Roba alomancia de mejora", rowSpan: 2 }],
              ["Revela el futuro propio", "Acumula determinación"],
              [{ t: "ESPIRITUAL", cat: true, rowSpan: 8 }, { t: "Cromo", negrita: true, rowSpan: 2 }, { t: "Sanguijuela", negrita: true }, { t: "Hilador", negrita: true }, { t: "Quizá robe destino", rowSpan: 2 }],
              ["Elimina las reservas alománticas del objetivo", "Acumula Fortuna"],
              [{ t: "Nicrosil", negrita: true, rowSpan: 2 }, { t: "Nicroestallante", negrita: true }, { t: "Portaalmas", negrita: true }, { t: "Roba Investidura", rowSpan: 2 }],
              ["Mejora el siguiente metal quemado por el objetivo", "Acumula Investidura"],
              [{ t: "Aluminio", negrita: true, rowSpan: 2 }, { t: "Mosquito de aluminio", negrita: true }, { t: "Genuino", negrita: true }, { t: "Elimina todos los poderes", rowSpan: 2 }],
              ["Elimina las propias reservas alománticas", "Acumula Identidad"],
              [{ t: "Duraluminio", negrita: true, rowSpan: 2 }, { t: "Mosquito de duraluminio", negrita: true }, { t: "Conector", negrita: true }, { t: "Roba Conexión e Identidad", rowSpan: 2 }],
              ["Mejora el siguiente metal quemado", "Acumula Conexión"],
              [{ t: "DIVINO", cat: true, rowSpan: 8 }, { t: "Atium", negrita: true, rowSpan: 2 }, { t: "Vidente", negrita: true }, { t: "Desconocido", negrita: true }, { t: "Roba cualquier poder", rowSpan: 2 }],
              ["Revela el futuro de otras personas", "Acumula juventud"],
              [{ t: "Lerasium", negrita: true, rowSpan: 2 }, { t: "Desconocido", negrita: true }, { t: "Desconocido", negrita: true }, { t: "Roba todas las capacidades", rowSpan: 2 }],
              ["Concede todas las capacidades alománticas", "Desconocido"],
              [{ t: "Armonium", negrita: true, rowSpan: 2 }, { t: "Desconocido", negrita: true }, { t: "Desconocido", negrita: true }, { t: "Desconocido", rowSpan: 2 }],
              ["Desconocido", "Desconocido"],
              [{ t: "Trellium", negrita: true, rowSpan: 2 }, { t: "Desconocido", negrita: true }, { t: "Desconocido", negrita: true }, { t: "Desconocido", rowSpan: 2 }],
              ["Desconocido", "Desconocido"],
              [{ t: "OTROS", cat: true, rowSpan: 2 }, { t: "Malatium", negrita: true, rowSpan: 2 }, { t: "Desconocido", negrita: true }, { t: "Desconocido", negrita: true }, { t: "Desconocido", rowSpan: 2 }],
              ["Permite ver el pasado de las personas", "Desconocido"],
            ]
          ),
        ],
      },
    ],
  },

  "caballeros-radiantes": {
    slug: "caballeros-radiantes",
    titulo: "Caballeros Radiantes",
    icono: "shield",
    sub: "Relación entre Heraldo, Orden, spren del vínculo Nahel, potencias y spren de la armadura.",
    secciones: [
      {
        cuerpo: [
          parrafo(
            "La relación entre Heraldo, la Orden de Caballeros Radiantes de la que es patrón, el spren que realiza el vínculo Nahel, las potencias que le otorga y qué spren menores forman su armadura esquirlada."
          ),
          tabla(
            [
              { t: "HERALDO", rowSpan: 2 },
              { t: "ORDEN RADIANTE", rowSpan: 2 },
              { t: "SPREN", rowSpan: 2 },
              { t: "POTENCIAS", colSpan: 2 },
              { t: "SPREN ARMADURA", rowSpan: 2 },
            ],
            [
              ["ISHAR", "FORJADORES DE VÍNCULOS", "Vigilante Nocturna / Padre Tormenta / Hermano", "TENSIÓN", "ADHESIÓN", "GLORISPREN"],
              ["JEZRIEN", "CORREDORES DEL VIENTO", "Honorspren", "ADHESIÓN", "GRAVITACIÓN", "VIENTOSPREN"],
              ["NALE", "ROMPEDORES DEL CIELO", "Altospren", "GRAVITACIÓN", "DIVISIÓN", "GRAVITACIONSPREN"],
              ["CHANARACH", "PORTADORES DEL POLVO", "Cenizaspren", "DIVISIÓN", "ABRASIÓN", "LLAMASPREN"],
              ["VEDEL", "DANZANTES DEL FILO", "Cultivacispren", "ABRASIÓN", "PROGRESIÓN", "VIDASPREN"],
              ["PRALLAH", "VIGILANTES DE LA VERDAD", "Brumaspren", "PROGRESIÓN", "ILUMINACIÓN", "CONCENTRASPREN"],
              ["SHALASH", "TEJEDORES DE LUZ", "Crípticos", "ILUMINACIÓN", "TRANSFORMACIÓN", "CREACIONSPREN"],
              ["BATTAR", "NOMINADORES DE LO OTRO", "Tintaspren", "TRANSFORMACIÓN", "TRANSPORTACIÓN", "LOGISPREN"],
              ["KALAK", "ESCULTORES DE VOLUNTAD", "Alcanzadores", "TRANSPORTACIÓN", "COHESIÓN", "ALEGRESPREN"],
              ["TALENEL", "CUSTODIOS DE LA PIEDRA", "Cumbrespren", "COHESIÓN", "TENSIÓN", "UNESPREN"],
            ],
            ["POTENCIA 1", "POTENCIA 2"]
          ),
        ],
      },
    ],
  },
}

export const GRUPOS = {
  dudas: {
    slug: "dudas",
    titulo: "Dudas",
    icono: "quiz",
    sub: "Resolvemos las dudas más frecuentes que surgen a la hora de traducir.",
    items: [
      { slug: "check-de-traduccion", titulo: "Check de traducción", sub: "Lista de comprobación antes de marcar un artículo como traducido.", icono: "verified" },
      { slug: "mayus-minus", titulo: "Mayús / Minús", sub: "Guía de estilo de mayúsculas y minúsculas.", icono: "format_size" },
      { slug: "formatos-de-la-wiki", titulo: "Formatos de la wiki", sub: "Los símbolos que dan formato al texto.", icono: "code" },
      { slug: "imagenes-con-texto", titulo: "Imágenes con texto", sub: "Cómo cambiar las imágenes en inglés por su versión en español.", icono: "image" },
    ],
  },
  recursos: {
    slug: "recursos",
    titulo: "Recursos interesantes",
    icono: "star",
    sub: "Herramientas y tablas de referencia para el trabajo de traducción.",
    items: [
      { slug: "periodicos-era-2", titulo: "Periódicos Era 2", sub: "Transcripción de los periódicos de las novelas de Era 2.", icono: "newspaper" },
      { slug: "nacidos-del-metal", titulo: "Nacidos del metal", sub: "Nombres de los usuarios de las artes metálicas y los efectos de los metales.", icono: "table_chart" },
      { slug: "caballeros-radiantes", titulo: "Caballeros Radiantes", sub: "Relación entre Heraldos, Órdenes, spren y potencias.", icono: "shield" },
    ],
  },
}