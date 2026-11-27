export const CV_INICIO = {
  marca: 'Cotorra Viajes',
  slogan: '',
  hero: {
    titulo: 'COTORRA VIAJES',
    parrafos: [
      '¿Siempre has soñado con recorrer los vastos desiertos de Taldain, navegar por los mares de Roshar o perderte en las brumas de Scadrial? En Cotorra Viajes, hacemos que tus sueños se hagan realidad… al menos en tu imaginación.',
      'Somos la primera y única agencia de viajes especializada en el Cosmere, ofreciendo paquetes turísticos para aventureros de todos los niveles. Desde recorridos históricos por Elendel hasta excursiones extremas cerca de la Perpendicularidad de Patji, tenemos la experiencia que necesitas para que tu travesía sea inolvidable.',
    ],
    puntos: [
      {
        icono: 'explore',
        titulo: 'Destinos exclusivos',
        texto: 'Roshar, Scadrial, Nalthis, Taldain y más.',
      },
      {
        icono: 'tour',
        titulo: 'Guías expertos',
        texto: 'Te llevarán por los mejores rincones del Cosmere.',
      },
      {
        icono: 'health_and_safety',
        titulo: 'Recomendaciones de seguridad',
        texto: 'No garantizamos que sobrevivas en Braize.',
      },
      {
        icono: 'star',
        titulo: 'Viajes personalizados',
        texto: 'Según tus intereses: historia, naturaleza, alomancia aplicada…',
      },
    ],
    cierre: '¿Listo para la aventura? Explora nuestras rutas y empieza a planificar tu próximo viaje.',
  },
  regalos: {
    titulo: 'Regalos exclusivos',
    texto:
      'Para completar tu experiencia Cotorra Viajes, al contratar uno de nuestros viajes de larga distancia te obsequiaremos con una bolsa de playa y una botella oficiales.',
    aviso:
      'Advertencia legal: CotorraViajes no se hace responsable de Investidura corrupta, transformaciones irreversibles ni encuentros desafortunados con deidades locales.',
  },
}

export const CV_DESTINOS_INTRO = {
  titulo: 'NUESTROS DESTINOS',
  parrafos: [
    '¿Cansado de la rutina diaria en tu planeta? ¿Buscas una experiencia única que te haga replantearte tu lugar en el universo? En CotorraViajes, te llevamos a los rincones más fascinantes del Cosmere, desde bulliciosas ciudades llenas de historia hasta paraísos ocultos donde la magia y la aventura son parte del paisaje.',
    'Si lo tuyo es el misterio y la modernidad, Scadrial te espera con sus elegantes calles iluminadas por farolas de gas, su red de trenes y sus tabernas llenas de historias que nunca se cuentan dos veces de la misma manera. Pero si prefieres un destino más exótico, Roshar te recibirá con sus majestuosos paisajes de roca esculpidos por tormentas y sus ciudades flotantes donde guerreros legendarios aún caminan entre los mortales.',
    'Para aquellos que buscan una escapada más relajante, las Islas Reshi ofrecen playas de aguas cristalinas, una gastronomía exquisita y la posibilidad de compartir espacio con lagartos gigantes que, con algo de suerte, podrían adoptarte como parte de su familia. Y si lo que deseas es una experiencia verdaderamente única, Taldain te permitirá caminar entre dos mundos: un desierto abrasador de luz perpetua y un reino de sombras frescas y misteriosas.',
    'Cualquiera que sea tu destino, en CotorraViajes nos aseguramos de que cada viaje sea inolvidable. Explora, descubre y sumérgete en culturas únicas que te cambiarán para siempre… o al menos hasta que vuelvas a casa con un par de historias imposibles de explicar.',
  ],
}

export const CV_DESTINOS = [
  {
    slug: 'roshar',
    nombre: 'Roshar',
    intro: [
      'Bienvenido a Roshar, el continente donde la naturaleza ha aprendido a resistir y prosperar en medio de la furia de las altas tormentas. Desde los majestuosos llanos quebrados hasta las bulliciosas calles de Kharbranth, este es un destino que desafía tanto a viajeros intrépidos como a estudiosos de culturas milenarias.',
    ],
    listas: [
      {
        titulo: 'Lo mejor de Roshar',
        items: [
          'Llanuras Quebradas: Vive la emoción de una carrera para atravesarlas… si sobrevives.',
          'Shinovar: Relájate en el único lugar de Roshar con césped de verdad. Sí, ¡hierba que no huye!',
          'Urithiru: Un tour guiado por la legendaria ciudad radiante. Evita las salas sin luz… por seguridad.',
          'Puerto de Thaylenah',
          'Kharbranth, la ciudad del saber: Descubre el Palaneo. ¿Las respuestas que buscas? Quizá. ¿Los secretos que no querrías conocer nunca? Seguro.',
        ],
      },
      {
        titulo: 'Consejos de supervivencia',
        items: [
          'Lleva esferas infusas: No querrás quedarte en la oscuridad… literalmente.',
          'No ofendas a los alezi: Son orgullosos y las espadas se invocan rápido.',
          'Cuidado con los spren: Algunos son inofensivos. Otros… te están observando.',
          'No preguntes por los Portadores del Vacío: Es un tema delicado en ciertos círculos.',
        ],
      },
    ],
    promo: {
      texto:
        'Sólo este mes: ¡Tour exclusivo por la ciudad perdida de Narak! No garantizamos el regreso, pero las vistas son inolvidables',
      disclaimer:
        'Descargo de responsabilidad: Cotorra Viajes no se hace responsable de atracción repentina de spren raros, juramentos accidentales ni Investidura espontánea.',
    },
  },
  {
    slug: 'islas-reshi',
    nombre: 'Islas Reshi',
    intro: [
      'Bienvenido al Resort Islas Reshi, un paraíso tropical en el norte de Roshar donde el tiempo se mueve al ritmo de las olas y la vida es tan relajada como los mismos isleños. Aquí, la hospitalidad es legendaria, la comida es inolvidable y nunca sabes si el que está a tu lado en la taberna es un pescador… o un rey disfrazado.',
    ],
    listas: [
      {
        titulo: 'Disfruta de:',
        items: [
          'Playas de arena fina y aguas cristalinas perfectas para nadar (solo ten cuidado con lo que pueda estar bajo la superficie).',
          'Cabañas flotantes con vistas al amanecer y acceso directo al mar.',
          'Bebidas exóticas preparadas con frutas locales y un toque de misterio (literalmente, no preguntes qué llevan).',
        ],
      },
      {
        titulo: 'Actividades esenciales:',
        items: [
          'Buceo en arrecifes: Descubre la belleza submarina… y, con suerte, evita a los depredadores locales.',
          'Rutas en canoa entre islas: Navega entre las aldeas flotantes y sumérgete en la cultura reshi.',
          'Veladas junto al fuego: Historias, música y danzas tradicionales bajo un cielo estrellado.',
        ],
      },
    ],
    promo: {
      texto:
        '¡Oferta especial! Estancia de 7 noches con un masaje herbal tradicional incluido (Efectividad variable)',
      disclaimer: 'Descargo de responsabilidad: Cotorra Viajes no se hace responsable de caídas desde grandes alturas',
    },
  },
  {
    slug: 'scadrial',
    nombre: 'Scadrial',
    intro: [
      'Bienvenido a Scadrial, un mundo de contrastes donde la modernidad se mezcla con un pasado envuelto en mitos y ceniza. Desde las bulliciosas calles de Elendel hasta los salvajes Áridos, este es el destino perfecto para quienes buscan cultura, aventura y una pizca de emoción al estilo de los nacidos de la bruma.',
    ],
    listas: [
      {
        titulo: 'Descubre Scadrial',
        items: [
          'Elendel, la joya de la Cuenca: Disfruta de su vibrante vida nocturna, su exquisita gastronomía y su red de canales. (¡No garantizamos que todos sean seguros!)',
          'Los territorios del Sur: Explora las enigmáticas tribus y sus avanzadas tecnologías… si logras entender sus costumbres.',
          'Nueva Seran: Ciudad de artistas y comerciantes, ideal para encontrar artefactos únicos (y tal vez algo más).',
          'Excursión por la Cuenca de Elendel: Un viaje en tren con vistas espectaculares y… seguramente bandidos',
        ],
      },
      {
        titulo: 'Experiencias únicas',
        items: [
          'Cata de vinos en la alta sociedad de Elendel: Vístete para la ocasión y sumérgete en la elegancia… y en los chismes más jugosos.',
          'Tiro al blanco en los Áridos: Aprende a disparar como un auténtico forajido.',
          'Tour por las ruinas del Imperio Final: Un viaje al pasado para ver los restos de un mundo gobernado por ceniza y acero.',
          'Noche de brumas: Un recorrido nocturno para los más valientes… ¿Quién sabe qué son las sombras que te acechan?',
        ],
      },
    ],
    promo: {
      texto:
        'Oferta especial: ¡Crucero nocturno por los canales de Elendel con espectáculo de luces y una cena de lujo! (Posibilidad de atraco incluida sin coste adicional)',
      disclaimer:
        'Descargo de responsabilidad: Cotorra Viajes no se hace responsable de desapariciones en las brumas, retenciones en el planeta por cambios en su gobierno ni encuentros desafortunados con ladrones.',
    },
  },
  {
    slug: 'imperio-rosa',
    nombre: 'El Imperio Rosa',
    intro: [
      'Bienvenidos al Imperio Rosa, un mundo lleno de belleza, historia y magia, donde cada rincón te invita a descubrir el arte, la política y los secretos mejor guardados. Ubicado en Sel, este destino está hecho para aquellos que buscan una experiencia única, en un lugar donde lo aparentemente perfecto esconde complejidades y desafíos fascinantes.',
      'En el Imperio Rosa, todo está diseñado para deslumbrar: palacios de mármol y rosa, jardines exuberantes con fuentes de aguas cristalinas y una atmósfera que combina la delicadeza de la cultura y el esplendor de una civilización antigua. Aquí, la magia no solo es parte de la vida diaria, sino que se entrelaza con el arte y la política de forma tan natural que hasta las paredes parecen susurrar secretos.',
      'Pero no todo es calma y perfección. El Imperio Rosa tiene una compleja estructura de poder que puede ser tan seductora como peligrosa. Los turistas deben ser cautelosos, ya que, bajo su apariencia radiante, se ocultan tensiones y conspiraciones que podrían afectar a cualquier persona, especialmente si se meten en los círculos equivocados. El arte de la diplomacia aquí es vital, y un paso en falso podría convertirte en parte de una intriga que ni siquiera los mejores observadores pueden prever.',
    ],
    listas: [],
    promo: {
      texto:
        '¡Vive el lujo y la exclusividad del Imperio Rosa! Reserva tu estancia en uno de los palacios más prestigiosos y disfruta de acceso privado a eventos de la corte',
      disclaimer:
        'Descargo de responsabilidad: Cotorra Viajes recomienda a los viajeros mantenerse atentos a las sutilezas sociales del Imperio Rosa. Las intrigas y los juegos de poder son parte integral de la vida en este destino. La participación en eventos de la corte podría exponer a los visitantes a situaciones inesperadas, por lo que se recomienda prudencia y diplomacia en todo momento.',
    },
  },
  {
    slug: 'treno',
    nombre: 'Treno',
    intro: [
      'Bienvenido a Treno, un planeta que destaca por su ambiente oscuro y misterioso, un lugar lleno de sombras y una atmósfera única, marcado por el constante enfrentamiento con lo desconocido. Es conocido principalmente por su relación con las sombras, que se manifiestan de formas sorprendentes y peligrosas, creando una sensación de inquietud en aquellos que se aventuran a explorar su territorio.',
    ],
    listas: [
      {
        titulo: 'Lo mejor de Treno',
        items: [
          'Paisajes inquietantes: Explora bosques envueltos en niebla y montañas oscuras, donde la luz nunca brilla con fuerza suficiente.',
          'Las umbras: Entidades vivas que afectan el cuerpo y la mente de quienes se acercan demasiado.',
          'Ciudades-fuerte: El único lugar en el que estar a salvo',
        ],
      },
      {
        titulo: 'Consejos de supervivencia',
        items: [
          'Recuerda seguir siempre las Sencillas Reglas:',
          '1. No prendas llamas',
          '2. No derrames la sangre de otros',
          '3. No corras de noche.',
        ],
      },
    ],
    promo: {
      texto:
        'Adéntrate en los bosques del infierno con un guía especializado. ¡Reserva ahora y recibe una linterna de última tecnología* como obsequio!',
      notaPromo: '*Consiste en un tarro de cristal con fuego de Abraham.',
      disclaimer: 'Descargo de responsabilidad: Cotorra Viajes no se hace responsable de absolutamente nada. Viaje a salvo',
    },
  },
  {
    slug: 'primero-del-sol',
    nombre: 'Primero del Sol',
    intro: [
      '¿Te gustan las emociones fuertes? ¿Te atreves a explorar la jungla más salvaje del Cosmere? Si es así, este es el viaje que estabas buscando. Prepárate para vivir una aventura inolvidable llena de riesgos y sorpresas. Enfréntate a animales peligrosos o disfruta de la belleza y diversidad de la naturaleza de Primero del Sol',
    ],
    listas: [
      {
        titulo: 'Actividades ofertadas:',
        items: [
          'Realiza rappel en la Sima de las Cotorras',
          'Recorre la jungla con nuestros tramperos expertos',
          'Disfruta de avistamientos de numerosas especies diferentes',
        ],
      },
    ],
    promo: {
      texto:
        '¡Sólo para las 20 primeras reservas! Consigue tu propio aviar, cortesía de la Compañía Comercial Intereses Norteños',
      disclaimer: 'Descargo de responsabilidad: Cotorra Viajes no se hace responsable de los ataques de los diferentes animales',
    },
  },
  {
    slug: 'lumar',
    nombre: 'Lumar',
    intro: [
      'Navega por los océanos, visita distintas islas y siéntete libre de pasar las vacaciones a tu manera con Cotorra Viajes, donde solo tendrás que deshacer las maletas una vez y podrás relajarte, explorar y descubrir deliciosas opciones gastronómicas cuando te apetezca; donde el entretenimiento más increíble llega directamente desde Elendel y las emocionantes actividades a bordo hacen que la experiencia sea todavía mejor. Todo esto se traduce en un viaje tan emocionante como el destino que vas a visitar. Surca los mares y descubre qué significa sentirse libre.',
      'No te pierdas esta oportunidad única de viajar en un crucero de lujo por el mar Esmeralda, el mar Carmesí, el mar Céfiro y el mar de Rosaíta. Podrás disfrutar de todas las comodidades y servicios que te mereces, así como de actividades divertidas y entretenidas. Y no te preocupes por la seguridad, porque nuestro crucero cuenta con los mejores sistemas de navegación y protección, ya que mantenemos en plantilla y de manera constante más de quince germinadores listos para actuar.',
    ],
    listas: [
      {
        titulo: 'Servicios que ofrecemos',
        items: [
          'Claviterapia: Deja que insertemos clavos metálicos en tu cuerpo para estimular tus nervios y huesos',
          'Experiencias gastronómicas: Con los mejores chefs de todo el Cosmere.',
          'Entretenimiento y diversión: Nuestro club infantil cuenta con los prestigiosos cuidadores kandra.',
        ],
      },
    ],
    promo: {
      texto:
        'Incluido un seguro de viaje en caso de abordajes piratas* (válido hasta el primer cañonazo).',
      notaPromo: '*Sólo válido hasta el primer cañonazo (no incluído)',
      disclaimer:
        'Descargo de responsabilidad: Cotorra Viajes no se hace responsabiliza de efectos secundarios derivados de la claviterapia ni de daños ocasionados por la activación d eninguna espora de éter',
    },
  },
]

export const CV_DESCARGAS = {
  titulo: 'CATÁLOGO',
  texto: '¡Consulta ya nuestro último catálogo!',
  pdf: {
    preview: 'https://drive.google.com/file/d/1deB5_zjEjAq1TbbKk_5kZsTxSoAVWUjy/preview',
    enlace: 'https://drive.google.com/file/d/1deB5_zjEjAq1TbbKk_5kZsTxSoAVWUjy/view?usp=drive_link',
  },
}