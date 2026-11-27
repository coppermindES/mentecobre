import { Link, useParams } from 'react-router-dom'
import n3_0 from '../assets/images/coppernews/n3-0.png'
import n3_1 from '../assets/images/coppernews/n3-1.png'
import n3_2 from '../assets/images/coppernews/n3-2.jpg'
import n3_3 from '../assets/images/coppernews/n3-3.jpg'
import n3_4 from '../assets/images/coppernews/n3-4.png'
import n3_5 from '../assets/images/coppernews/n3-5.png'
import n3_6 from '../assets/images/coppernews/n3-6.png'
import n3_7 from '../assets/images/coppernews/n3-7.jpg'
import n3_8 from '../assets/images/coppernews/n3-8.png'

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  margin: '1.5rem 0',
}

const colStyle = {
  flex: '1 1 50%',
  minWidth: 0,
}

const imgFigure = {
  margin: 0,
  textAlign: 'center',
}

const imgTag = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
}

const imgCaption = {
  fontFamily: 'Droid Sans, Segoe UI, Roboto, sans-serif',
  fontSize: '0.85rem',
  color: 'var(--cn-muted)',
  fontStyle: 'italic',
  marginTop: '0.4rem',
  textAlign: 'center',
}

const separator = {
  border: '0',
  borderTop: '2px solid #d3413f',
  margin: '10px 0',
}

const boxStyle = {
  background: 'var(--cn-surface)',
  border: '1px solid var(--cn-border-strong)',
  padding: '1.5rem 1.75rem',
  margin: '1.5rem 0',
}

const boxTitle = {
  fontFamily: 'Oswald, sans-serif',
  color: '#d3413f',
  textTransform: 'uppercase',
  margin: '0 0 0.6rem',
}

function Columna({ children }) {
  return <div style={colStyle}>{children}</div>
}

function Fig({ img, alt, caption, w }) {
  return (
    <figure style={imgFigure}>
      <img
        src={img}
        alt={alt}
        style={w ? { ...imgTag, width: w } : { ...imgTag }}
      />
      <figcaption style={imgCaption}>{caption}</figcaption>
    </figure>
  )
}

function Receta({ titulo, ingredientes, instrucciones, nota }) {
  return (
    <div style={boxStyle}>
      <h3 style={boxTitle}>{titulo}</h3>
      <h4
        style={{
          fontFamily: 'Oswald, sans-serif',
          textTransform: 'uppercase',
          color: 'var(--cn-heading)',
          fontWeight: 500,
        }}
      >
        Ingredientes
      </h4>
      <ul
        style={{
          fontFamily: 'Droid Sans, Segoe UI, Roboto, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {ingredientes.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h4
        style={{
          fontFamily: 'Oswald, sans-serif',
          textTransform: 'uppercase',
          color: 'var(--cn-heading)',
          fontWeight: 500,
        }}
      >
        Instrucciones
      </h4>
      <ol
        style={{
          fontFamily: 'Droid Sans, Segoe UI, Roboto, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {instrucciones.map((inst, i) => (
          <li key={i}>{inst}</li>
        ))}
      </ol>
      {nota && <p className="cn-paragraph">{nota}</p>}
    </div>
  )
}

function Suceso({ titulo, p }) {
  return (
    <div style={{ margin: '0.5rem 0' }}>
      <h4 style={boxTitle}>{titulo}</h4>
      <p className="cn-paragraph">{p}</p>
    </div>
  )
}

export default function CopperEdicion3HTML() {
  const { edicion } = useParams()

  if (edicion !== 'n3-abril-2023') {
    return (
      <div className="cn-content">
        <h3 className="cn-h1">Edición no encontrada</h3>
        <p className="cn-paragraph">
          No hemos encontrado la edición solicitada.
        </p>
        <Link to="/ocio/coppernews/ediciones" className="cn-btn">
          Ver todas las ediciones
        </Link>
      </div>
    )
  }

  const sucesos = [
    [
      'Desapariciones',
      'Desaparecen 1700 seguidores de una secta en una taberna. Hay quien los denomina los «nuevos iriali», debido a que se desconocen tanto los motivos como el lugar al que han ido a parar.',
    ],
    [
      'Robos',
      'El Palaneo denuncia la desaparición de las cubiertas de numerosos libros de lo que es, a día de hoy, la mayor biblioteca conocida de Roshar, situada en Kharbranth.',
    ],
    [
      'Expulsión',
      'Destituyen, tras años y múltiples quejas, a un profesor de la Universidad de Elendel por tergiversar la historia y enseñar, de manera deliberada, información errónea a sus alumnos. «Nadie era consciente de lo equivocado que estaba», dicen fuentes cercanas.',
    ],
    [
      'El gran debate',
      'Terrible enfrentamiento entre arcanistas. Se reaviva de nuevo el debate sobre el estudio de nuestros mundos. ¿Cómo es mejor estudiar nuestra historia común? ¿En el orden en el que ocurren los sucesos, por orden de importancia, o según el interés del estudio?',
    ],
    [
      'Ataque al mercado',
      'Gran revuelo en el mercado de Celebrant. Una mujer de piel oscura y el pelo largo y negro ha destruido un tapiz que representaba a una mujer de piel oscura y el pelo largo y negro.',
    ],
    [
      'Recaudación',
      'Se inicia la campaña de recaudación bajo el lema «Más pobre que una cotorra de la copper» para poder hacerles llegar, incluso en su cautiverio, algo de pienso para alimentarse.',
    ],
  ]

  const entrevista = [
    [
      'Maxil',
      'Bienvenidas a nuestro periódico, Kokerlii (K), Sak (S) y Cotónica (C).',
    ],
    ['C', 'Gracias por invitarnos.'],
    [
      'M',
      'Bien, como comentábamos antes, atacaron vuestras oficinas hace 5 meses, ¿verdad?',
    ],
    [
      'S',
      'Así es… Lo pasamos… Verdaderamente mal. Mucha angustia, muchos nervios… Los peores días de la Copper sin duda.',
    ],
    [
      'M',
      'Pero afortunadamente, recibisteis mucha ayuda y apoyo por parte de gran parte del mundo, ¿no?',
    ],
    [
      'C',
      'Sí. Estamos muy agradecidas con todos los que quisieron ayudarnos y se ofrecieron a investigar por su cuenta.',
    ],
    [
      'M',
      'Sondeluz ha dicho que la investigación ha llegado a su fin. ¿Quiere decir eso que ya se ha encontrado a los culpables?',
    ],
    [
      'S',
      'Si bueno… Estando todo controlado, ¿qué importa quién tuviera la culpa?',
    ],
    [
      'M',
      '¿Disculpa? Está medio Cosmere pendiente de lo que os pasó y Sondeluz dice que os corresponde a vosotras decir quién hackeó vuestras redes sociales.',
    ],
    ['C', 'Pues es que…'],
    [
      'S',
      'Teníamos hambre… y había un anuncio en una web que decía «Pienso gratis para cotorras» y…',
    ],
    ['K', 'Bueno, que la hemos lia’o parda.'],
    [
      'C',
      'Y no nos quedó más remedio que intentar disimular. ¡Imagínate que se enteran las arcanistas!',
    ],
    ['S', '… pues nos dejan otro mes más sin comer.'],
    ['K', 'Y esto… ¿Cuándo se emite?'],
    ['C', 'Habrá que ir preparando las maletas… ¡Cotorra la última!'],
  ]

  return (
    <div className="cn-content">
      <p className="cn-kicker">23 ABRIL 2023 · EDICIÓN ESPECIAL ANIVERSARIO</p>

      <div style={boxStyle}>
        <h3 style={boxTitle}>Nota de la dirección</h3>
        <p className="cn-paragraph">
          Tal día como hoy, hace un año, empezaba la aventura visible de la
          Coppermind. Fue el momento en el que por fin vio la luz la web en
          español y el día de su inauguración. Pero el verdadero trabajo se hizo
          tanto antes como después de ese día, ya que el proyecto se inició en
          enero de 2021. Cientos de artículos por traducir; cientos de artículos
          traducidos que luego necesitaron actualización y que se convirtieron
          en cientos de artículos que subir a la web… Y hoy nos encontramos en
          más de 1600 artículos ya en español, cuando el anterior 23 de abril
          eran solo 3: Scadrial, el asesinato de Gavilar y Adonalsium.
        </p>
        <p className="cn-paragraph">
          Sabemos que el ritmo al que tenemos disponible los artículos no es
          todo lo veloz que algunos querrían, pero recordad lo que os decimos
          siempre: preferimos calidad en su traducción y veracidad en la
          información a tener todo «legible pero incorrecto».
        </p>

        <p className="cn-paragraph">
          Sí, lo sabemos. Normalmente, el tono en el que escribimos en Twitter
          es más distendido y las cotorras hacen de las suyas… No os preocupéis,
          que en este periódico hay cotorras para rato y unas cuantas
          ocurrencias absurdas de las que nos caracterizan. Pero hoy,
          especialmente hoy, nos ponemos la careta de arcanistas para poder
          comportarnos de una forma más seria y hablaros con sinceridad.
        </p>

        <p className="cn-paragraph">
          A todos nuestros increíbles seguidores, solo queríamos tomarnos un
          momento para expresar nuestra más sincera gratitud por vuestro apoyo.
          Vuestros «me gusta», comentarios y publicaciones compartidas
          significan mucho para nosotras y nos inspiran para seguir creando y
          trabajando en la traducción. Gracias por formar parte de este viaje y
          por creer en el proyecto. Prometemos seguir ofreciéndoos contenido,
          risas, información, locuras y, por supuesto, lore del Cosmere.
        </p>
        <p style={{ ...boxTitle, textAlign: 'center' }}>
          Gracias de nuevo por vuestro apoyo incondicional
        </p>
        <p style={{ ...boxTitle, textAlign: 'center' }}>
          Kokerlii, Sak y Cotónica.
        </p>
        <p
          style={{
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: '0.8em',
          }}
        >
          Tras este pequeño, pero necesario, huequito… Ahora sí, vayamos con el
          periódico como tal. ¡Disfrutadlo!
        </p>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">
            Resuelto el caso del ataque a la coppermind del pasado noviembre
          </h2>
          <p className="cn-paragraph">
            Han pasado ya cinco meses desde que las oficinas de traducción de la
            Coppermind sufrieran un importante hackeo de sus redes sociales. Los
            malhechores intentaron vender Investidura de contrabando utilizando
            su cuenta de Twitter como manera de llegar al mayor número posible
            de gente.
          </p>
          <p className="cn-paragraph">
            HOY, EN PRIMICIA, Kokerlii, Sak y Cotónica, las conocidas como
            «Cotorras de la Copper», rompen su silencio y nos dan todos los
            detalles de lo sucedido.
          </p>
        </Columna>
        <Columna>
          <Fig
            img={n3_0}
            alt="Resuelto el caso del ataque"
            caption="Las Cotorras de la Copper rompen su silencio."
            w="80%"
          />
        </Columna>
      </div>
      <hr style={separator} />
      
      <div style={rowStyle}>
        <Columna>
          <Fig
            img={n3_1}
            alt="Chouta"

          />
        </Columna>
        <Columna>
          <h2 className="cn-article-title">
            Recetas cosmeriles
          </h2>
          <p className="cn-paragraph">
            Han sido varios meses de negociaciones y pruebas, 
            pero al final se ha conseguido. 
            Para todos aquellos de vosotros que disfrutáis con 
            la comida exótica, para los saltamundos frustrados 
            que no podréis ir a su lugar de origen a probarlas y para aquellos que 
            sentís temor a viajar por el Reino Cognitivo… Aquí están, finalmente, las 
            «Recetas Cosmeriles», un espacio en nuestro periódico en el que os ayudaremos 
            a transportaros a otros lugares gracias a vuestras papilas gustativas. 
          </p>
        </Columna>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
        <h2 className="cn-article-title">Nueva sección</h2>
        <h2 className="cn-article-title">¡Pasatiempos!</h2>
        </Columna>
        <Columna>
        <p className="cn-paragraph">
          Como buena celebración de aniversario de la web en activo, queremos
          que os lo paséis bien. Es por esto por lo que tenemos un nuevo
          apartado de ocio. Crucigrama, sopa de letras, sudoku, test de
          personalidad, une los puntos…
        </p>
        </Columna>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        
        <Columna>
        <p className="cn-paragraph">
          Son tiempos oscuros en el Cosmere. 
          Un gran mal nos acecha y es necesario 
          estar preparados para luchar. O, si lo que necesitas 
          es un amigo que no te abandone nunca (para bien o para mal), 
          tenemos una lista de pasos que puedes seguir y aumentar las 
          posibilidades de que un spren se fije en tí al máximo.
        </p>
        </Columna>
        <Columna>
        <h2 className="cn-article-title">¿Cómo atraer un spren?</h2>
        </Columna>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Supervivencia en el cosmere</h2>
        <h3 style={{...boxTitle, textAlign:'center'}}>Sobrevivir a las tormentas: Guía para que no te lleve el viento en Roshar</h3>
        <p className="cn-paragraph">
          Bienvenidos, viajeros del Cosmere, a esta nueva sección de CopperNews.
          Mi nombre es Rick O'Conell y soy un saltamundos especialista en
          supervivencia, no en bienestar. He sido contratado por CopperNews para
          crear un espacio dedicado a los diferentes planetas de nuestro
          universo y a enseñaros diferentes maneras de esquivar los peligros que
          acechan en cada uno. Nuestra primera parada será Roshar (aunque no
          entiendo la obsesión por este mundo yermo y sombrío) por lo que hoy
          vamos a echar un vistazo a sus dos fenómenos meteorológicos más
          importantes e imponentes: las altas tormentas y la tormenta eterna.
        </p>
      </div>
      <div style={rowStyle}>
        <Columna>
          <Fig
            img={n3_2}
            w="80%"
            alt="Altas tormentas de Roshar"
          />
        </Columna>
        <Columna>
          <p className="cn-paragraph">
            En primer lugar, hablemos de las altas tormentas. Estas enormes y
            destructivas tormentas rodean el planeta, causando estragos en todo
            lo que encuentran a su paso. Pero al menos son predecibles, ¿no?
            Siempre puedes contar con que llegará una y te arruinará el día.
          </p>
        </Columna>
      </div>
      <div style={rowStyle}>
        <Columna>
          <p className="cn-paragraph">
            Luego tenemos la tormenta eterna, que es como la 
            gemela malvada de la alta tormenta, que rodea el 
            planeta en dirección opuesta y trae consigo todo 
            tipo de caos y destrucción. Es como si el universo 
            hubiera decidido que una tormenta masiva no era suficiente, 
            así que tuvo que añadir otra solamente por diversión.
          </p>
        </Columna>
        <Columna>
          <Fig img={n3_3}
            w="80%"
            alt="Tormenta eterna"
          />
        </Columna>
      </div>
      <div>
          <p className="cn-paragraph">
            Y no olvidemos que ambas se recargan constantemente, como una
            especie de batería cósmica. ¿Cómo funciona eso? ¿Tienen algún tipo
            de generador de tormentas escondido en algún lugar del planeta?
          </p>
          <p className="cn-paragraph">
            Si vives en Roshar, sabes que ambas son una amenaza constante. Pero
            no temas, porque si eres de fuera tenemos algunos consejos que te
            ayudarán a mantenerte sano y a salvo:
          </p>
          <ul
            style={{
              fontFamily: 'Droid Sans, Segoe UI, Roboto, sans-serif',
              lineHeight: 1.7,
            }}
          >
            <li>
              En primer lugar, asegúrate de tener un refugio resistente para
              esconderte. Esto significa invertir en una casa bien construida,
              con paredes fuertes y un tejado sólido. No querrás que cualquiera
              de las dos te pille fuera.
            </li>
            <li>
              Después, abastécete de provisiones. Asegúrate de que tienes
              suficiente comida, agua y otros elementos esenciales para que te
              duren durante la tormenta. Nunca se sabe cuánto durará, así que es
              mejor estar preparado.
            </li>
            <li>
              Si te ves atrapado en el exterior durante una tormenta, busca
              refugio inmediatamente. Busca un edificio resistente o un refugio
              natural, como una cueva o un saliente. Y hagas lo que hagas, no
              intentes escapar de la tormenta. Simplemente, porque no lo
              conseguirás.
            </li>
            <li>
              Por último, mantente informado. Estate atento a los partes de los
              predicetormentas y escucha a tu tía-abuela cuando dice que le
              duele la cadera. Cuanto antes sepas que viene una tormenta, mejor
              preparado estarás.
            </li>
          </ul>
      </div>
      <div>
        <p className="cn-paragraph">
          Con estos consejos en mente, estarás bien preparado para sobrevivir al
          clima de Roshar. Solo recuerda que, cuando se trata de tormentas,
          siempre es mejor estar seguro que arrepentido.
        </p>
        <p className="cn-paragraph">
          ¡Eso es todo por ahora, amigos! Volveremos con más reflexiones sobre
          los fenómenos más extravagantes del Cosmere. ¿A alguien le apetece una
          visita a Treno?
        </p>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna style={{maxWidth: '30%'}}>
          <Fig
            img={n3_4}
            alt="Supervivencia O'Conell"
            w="30%"
            caption="Supervivencia y Aventuras O'Conell."
          />
        </Columna>
        <Columna style={{minWidth: '70%'}}>
          <div>
            <h2 className="cn-article-title">Supervivencia O'Conell</h2>
            <p className="cn-paragraph">
              Nuestro equipo de expertos está altamente formado en supervivencia
              y aventura, y utilizamos nuestras habilidades para explorar nuevos
              mundos y recopilar información valiosa. Estudiamos el terreno, el
              clima y la fauna de cada planeta que visitamos, así como las
              culturas y costumbres de sus habitantes.
            </p>
            <p className="cn-paragraph">
              Una vez reunida toda la información necesaria, la recopilamos en
              informes detallados que vendemos a empresas de viajes o a viajeros
              individuales que desean visitar esos planetas. Nuestros informes
              están muy solicitados, ya que proporcionan valiosas perspectivas
              sobre los retos y oportunidades únicos de cada planeta.
            </p>
            <p className="cn-paragraph">
              Así que si quieres explorar nuevos mundos y vivir la aventura de
              tu vida, no busques más allá de Supervivencia y Aventuras
              O'Conell. Nuestra pericia y experiencia garantizarán que tu viaje
              sea seguro, emocionante e inolvidable.
            </p>
          </div>
        </Columna>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Recetas cosmeriles</h2>
        <p className="cn-paragraph">
          Han sido varios meses de negociaciones y pruebas, pero al final se ha
          conseguido. Para todos aquellos de vosotros que disfrutáis con la
          comida exótica, para los saltamundos frustrados que no podréis ir a su
          lugar de origen a probarlas y para aquellos que sentís temor a viajar
          por el Reino Cognitivo… Aquí están, finalmente, las «Recetas
          Cosmeriles», un espacio en nuestro periódico en el que os ayudaremos a
          transportaros a otros lugares gracias a vuestras papilas gustativas.
        </p>
        <p className="cn-paragraph">
          Para poder ser lo más fiel posible a la cultura culinaria de cada
          lugar, contaremos con la ayuda de dos grandes chefs de gran
          reconocimiento en el sector como son Aladar Chicote y Goradel Ramsay,
          cuyos nombres seguro que os suenan. En esta primera edición de
          «Recetas Cosmeriles» viajaremos a Roshar para conocer de primera mano
          la elaboración de un plato que ya traspasa fronteras planetarias: la
          chouta. Pero para poder disfrutar de un dulce y delicioso postre,
          tendremos que acercarnos hasta Nalthis, hogar de Retornados, para
          aprender a elaborar bocaditos dulces de la región Pahn Kahl.
        </p>
      </div>
      <div style={rowStyle}>
        <Columna>
        <Fig
            img={n3_5}
            alt="Bocaditos dulces de Pahn Kahl"
            caption="Bocaditos dulces de Pahn Kahl"
            w="80%"
          />
        </Columna>
        <Columna>
        <Fig
            img={n3_6}
            alt="Chouta"
            caption="Chouta"
            w="80%"
          />
        </Columna>
      </div>

      <Receta
        titulo="Bocaditos dulces de pahn kahl"
        ingredientes={[
          '1 sobre de levadura química',
          '4 huevos talla L (a temperatura ambiente)',
          '260 gramos de azúcar',
          'Ralladura de media naranja',
          'Ralladura de medio limón',
          '150 ml de leche evaporada',
          '3 cucharadas de mantequilla derretida',
          'Media cucharadita de canela',
          'Un cuarto de cucharadita de sal',
          'Moldes para magdalenas',
        ]}
        instrucciones={[
          'Tamiza la harina en un bol y reserva.',
          'Ralla la naranja y el limón. También puedes pelarlas y picarla después. Ten cuidado de no llegar a la parte blanca de la piel, ya que dará amargor a la receta.',
          'Mezcla con un robot de cocina o una picadora el azúcar con la ralladura para crear el azúcar cítrico. Separa un par de cucharadas de esta mezcla, porque servirán para la decoración al final.',
          'Bate los huevos hasta que estén esponjosos (a mano es complicado, mejor utiliza varillas manuales o de batidora).',
          'Mezcla la mantequilla derretida, la leche evaporada, la canela, el azúcar y la sal con los huevos batidos.',
          'Añade poco a poco la harina tamizada a la mezcla (mezclar bien cuando vayas añadiendo la harina para evitar grumos). Una vez esté todo integrado, bate hasta que la masa quede suave.',
          'Precalienta el horno a 180 grados centígrados mientras dejas reposar la mezcla unos 10 minutos.',
          'Coloca moldes para magdalenas y vete rellenándolos con la masa, pero solo hasta un tercio de su capacidad (ya que con el horneado subirán y se desbordarán). Espolvorea por encima el azúcar que habías reservado en un primer momento.',
          'Llévalos al horno colocando la bandeja a una altura baja.',
          'Deja que cocinen durante unos 20 minutos. Para comprobar si está listo, utiliza un palillo o cuchillo y pincha uno de los bocaditos. Si el palillo sale limpio, la masa ya está lista. Si sale con masa cruda, necesita estar en el horno más tiempo.',
          'Una vez haya terminado el horneado, pásalos a una rejilla para que puedan enfriar tanto por arriba como por abajo. Una vez estén a temperatura ambiente, están listos para disfrutar.',
        ]}
      />

      <Receta
        titulo="Chouta (adaptación)"
        ingredientes={[
          '1 solomillo de cerdo',
          '1 huevo',
          'Salsa de soja',
          'Vinagre de manzana',
          'Harina de trigo',
          'Lechuga romana',
          'Cebolla morada',
          'Tortilla de trigo o de maíz',
          '20 gramos de mantequilla',
          '300 ml de caldo de carne',
          'Especias al gusto',
          'Abundante aceite para freír',
        ]}
        instrucciones={[
          'Corta el solomillo en trozos del tamaño que prefieras (unos 2 o 3 centímetros de lado en este caso) y colócalos en un bol.',
          'Añade un huevo batido, unas 5 cucharadas de salsa de soja y unas 5 de vinagre de manzana y dale vueltas para que se reparta por la carne y déjalo reposar.',
          'Vete calentando una freidora o sartén con abundante aceite vegetal (el de tu elección).',
          'En una sartén, derrite 20 gramos de mantequilla. Añádele 1 cucharada colmada de harina y cocínala hasta que tueste.',
          'Una vez haya cambiado el color, añade poco a poco, y sin dejar de remover, el caldo de carne.',
          'Es el momento de añadir a la salsa las especias que quieras. En este caso se ha añadido media cucharada de curry, pimienta negra molida. Remueve bien y deja cocinar a fuego lento (dándole una vuelta de vez en cuando) hasta que espese. Si buscas una mayor intensidad en el sabor, puedes añadir una cucharada de concentrado Bovril.',
          'OPCIONAL: si quieres que la salsa quede muy fina, puedes pasarla por un colador.',
          'De nuevo con el bol con el solomillo. Enharina cada pieza de carne y ponla a freír hasta que tenga un color dorado y el exterior haya quedado crujiente. Colócalo sobre papel absorbente para eliminar el exceso de aceite que haya podido quedar.',
          'Corta, en tiras finas, media cebolla morada, lava bien dos o tres hojas de lechuga y prepara el resto de verduras que quieras añadir.',
          'Coloca una de las tortillas (de trigo o de maíz, a tu elección) sobre un plato.',
          'Añade las verduras que quieras sobre la tortilla y varios trozos de carne en fila.',
          'Deja caer sobre la carne la salsa que has preparado y cierra la tortilla hasta envolver todos los ingredientes.',
        ]}
        
      />
      <p className="cn-paragraph">
        Como podéis ver, la primera receta es un 
        manjar típico y muy conocido dentro de la cultura 
        hallandrense. Unos bocaditos que, pese a ser un plato dulce, 
        son muy refrescantes. Para conseguirlo, utilizamos las frutas 
        cítricas que su clima permite recolectar, aprovechando la piel de dos frutas, 
        la naranja y el limón. Son ideales como tentempié a cualquier hora del día, pero 
        nada como deleitarse recostado en un diván, disfrutando del calor de Hallandren como 
        si fueras un verdadero Retornado en la corte. El plato fuerte que os presentamos, es 
        una adaptación de la chouta herdaziana. Es un plato que, en su origen, consiste en un 
        pan plano frito que envuelve carne frita y salsa, y se puede llevar en una mano. 
        El pan plano que se utiliza es muy grueso y la carne utilizada en los campos de guerra 
        suele ser flangria, que se mezcla con lavis molido, se forma en pequeñas bolas, se 
        reboza y se fríe para, a continuación, introducirlo en el pan frito y cubrir todo con una 
        generosa cantidad de salsa oscura. Hemos optado por hacer una adaptación con ingredientes 
        que son más fáciles de conseguir que la lavis, ya que las perpendicularidades rosharianas 
        son un terreno peligroso estos días. 
      </p>
      <p className="cn-article-title">
      En el próximo número de «Recetas Cosmeriles», os traeremos 
        una nueva elaboración: pedos de fervoroso.
        </p>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Sucesos</h2>
        <div style={{ ...rowStyle, flexWrap: 'wrap' }}>
          {sucesos.map(([titulo, texto], i) => (
            <div key={i} style={{ flex: '1 1 30%', minWidth: '250px', boxSizing: 'border-box' }}>
              <div style={boxStyle}>
                <p style={{ fontFamily: 'Oswald, sans-serif', color: '#d3413f', textTransform: 'uppercase', margin: '0 0 0.6rem', textAlign: 'center' }}>{titulo}</p>
                <p className="cn-paragraph">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">
          Gran reunión de eruditos del cosmere en luzdeplata
        </h2>
        <p className="cn-paragraph">
          Los eruditos que se han reunido para este simposio son expertos en sus
          respectivos campos, y se han reunido para compartir entre sí sus
          conocimientos y percepciones.
        </p>
        <p className="cn-paragraph">
          Se ha tratado desde la historia del Cosmere, hasta las propiedades
          únicas de sus diversos planetas y sistemas.
        </p>
        <p className="cn-paragraph">
          Uno de los principales temas de debate serán los sistemas mágicos que
          existen en el Cosmere. Se han explorado las complejidades de estos
          sistemas y cómo interactúan entre sí.
        </p>
        <p className="cn-paragraph">
          Otro tema de debate fueron las distintas razas y culturas que existen
          en el Cosmere. Desde los belicosos alezi hasta los eruditos
          elantrinos, ya que de la gran variedad de pueblos que habitan estos
          mundos, cada uno tiene sus propias costumbres y tradiciones.
        </p>
        <p className="cn-paragraph">
          En general, el simposio ha sido una fascinante exploración del Cosmere
          y todas sus maravillas. Tanto si eres un erudito experimentado como un
          curioso recién llegado, seguro que ha habido algo para ti en esta gran
          reunión de mentes.
        </p>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">
            ¡Gran iniciativa por parte de los posaderos de Treno!
          </h2>
          <p className="cn-paragraph">
            Debido a la creciente actividad turística en Treno, los dueños de
            posadas de los bosques trenoditas (conocidos comúnmente como bosques
            del infierno) han llegado a un acuerdo regulando el precio de la
            estancia en sus establecimientos.
          </p>
          <p className="cn-paragraph">
            Es una gran noticia que las agencias de viajes del Cosmere han
            celebrado, ya que el precio por cada noche había ascendido a la
            locura de media bolsa de plata sin incluir el seguro anti-umbras en
            el importe.
          </p>
          <p className="cn-paragraph">
            A partir de ahora, además de que dicha protección contra las umbras
            estará siempre vigente, el precio será de media bolsa de plata a la
            semana. Pero nos preguntamos… ¿Dónde tienen entonces la ganancia?
          </p>
        </Columna>
      </div>
      <hr style={separator} />

      <div >
              <h2 className="cn-article-title">Artículo de opinión</h2>
              <div style={boxStyle}>
                <div style={rowStyle}>
                  <div>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#d3413f', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
                  Carreras ilegales: Cuando la diversión se convierte en ruina
                </h3>
                <p className="cn-paragraph">Como habitante de Roshar, me preocupa profundamente las carreras ilegales con puentes que se han extendido por nuestra sociedad. En lugar de utilizar los puentes para cruzar los abismos de las Llanuras Quebradas, mucha gente ha empezado a correr ilegalmente con ellos, poniéndose a sí mismos y a los demás en peligro. </p>
                <p className="cn-paragraph">Esta práctica no solo es ilegal, sino también increíblemente peligrosa. Correr por los puentes es una tarea físicamente exigente que requiere mucho entrenamiento y resistencia. Quienes intentan cruzar los puentes sin el entrenamiento adecuado se exponen a sufrir lesiones o incluso a morir. </p>
                <p className="cn-paragraph">Además, está causando daños a los propios puentes, que son caros de reparar. Ya es hora de que pongamos fin a esta práctica peligrosa e ilegal y empecemos a utilizar los puentes tal como fueron concebidos: esclavizar ojos oscuros y hacernos ricos con las gemas corazón.</p>
                <p style={{ margin: '0.5rem 0 0' }}>
                <em>Vuestra columnista favorita: Abrigain</em>
                </p>
                </div>
                <Fig img={n3_7} w="100%" alt="Abrigain"/>
                </div>
              </div>
            </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">
          Entrevista en exclusiva con las «cotorras de la copper»
        </h2>
        <div style={boxStyle}>
          <p className="cn-paragraph">
            Nos encontramos en las oficinas de traducción de la Coppermind,
            lugar en el que el pasado 25 de noviembre se vivieron momentos de
            suma tensión y nerviosismo. Para poder hablar de ello nos hemos
            reunido con las tres «Cotorras de la Copper», las principales
            afectadas por este hecho.
          </p>
          {entrevista.map(([quien, texto], i) => (
            <p key={i} className="cn-paragraph" style={{ margin: '0.3rem 0' }}>
              <strong>{quien}.-</strong> {texto}
            </p>
          ))}
        </div>
      </div>
      
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">
          EN EL PRÓXIMO NÚMERO: «GUÍA DE “POLLOS” PARA ROSHARIANOS»
          </h2>
        </Columna>
        <Columna>
          <Fig
            img={n3_8}
            w="50%"
            alt="Conjunto de sombras de diferentes «pollos»"
          />
        </Columna>
      </div>
            <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Pasatiempos</h2>
        <p className="cn-paragraph">
          Este fue el primer número en el que introdujimos pasatiempos, un
          pequeño toque de diversión entre tantas noticias. Sin embargo, como
          todo en CopperNews, no nos conformamos con lo básico. Hemos dado un
          paso más, y ahora los pasatiempos que ofrecemos son interactivos, para
          que podáis disfrutar de ellos de una forma aún más dinámica y
          entretenida. Ya no solo se trata de resolver acertijos, ¡sino de vivir
          la experiencia! Aquí tenéis los enlaces para adentraros en esta nueva
          versión, ¡y a divertirse mientras ejercitáis la mente!
        </p>
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <Link to="/ocio/pasatiempos" className="cn-btn">
            Accede aquí a los pasatiempos
          </Link>
        </div>
      </div>
    </div>
  )
}
