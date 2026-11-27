import { Link, useParams } from 'react-router-dom'
import n1_0 from '../assets/images/coppernews/n1-0.png'
import n1_1 from '../assets/images/coppernews/n1-1.png'
import n1_2 from '../assets/images/coppernews/n1-2.png'
import n1_3 from '../assets/images/coppernews/n1-3.jpg'
import n1_4 from '../assets/images/coppernews/n1-4.png'

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

function Columna({ children }) {
  return <div style={colStyle}>{children}</div>
}

function Fig({ img, alt, caption, w }) {
  return (
    <figure style={imgFigure}>
      <img src={img} alt={alt} style={w ? { ...imgTag, width: w } : { ...imgTag }} />
      <figcaption style={imgCaption}>{caption}</figcaption>
    </figure>
  )
}

export default function CopperEdicion1HTML() {
  const { edicion } = useParams()

  if (edicion !== 'n1-noviembre-2022') {
    return (
      <div className="cn-content">
        <h3 className="cn-h1">Edición no encontrada</h3>
        <p className="cn-paragraph">No hemos encontrado la edición solicitada.</p>
        <Link to="/ocio/coppernews/ediciones" className="cn-btn">
          Ver todas las ediciones
        </Link>
      </div>
    )
  }

  return (
    <div className="cn-content">
      <p className="cn-kicker">27 NOVIEMBRE 2022 · EDICIÓN ESPECIAL</p>

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">Intento fallido de hackeo en la cuenta de twitter</h2>
          <p className="cn-paragraph">
            En la pasada noche hemos sufrido uno de los episodios más terroríficos de la historia de la cuenta. Han intentado vender investidura de contrabando utilizando nuestro Twitter como foco para llegar a vosotros. Afortunadamente, la rápida intervención de los seguidores y las cotorras ha conseguido evitar que pobres usuarios caigan en la trampa de comprar Investidura de Treno, con los consiguientes problemas que eso trae consigo. Los malhechores han dejado, además de la angustia en el cuerpo de las cotorras, el mensaje «ODIUM REINA» en las paredes de sus oficinas.
          </p>
        </Columna>
        <Columna>
          <Fig img={n1_0} alt="Estado de las oficinas de la Coppermind" caption="Estado de las oficinas de la Coppermind" />
        </Columna>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <Fig img={n1_1} w="80%" alt="Imagen de Connor Chamberlain" caption="Imagen de Connor Chamberlain, un testigo" />
        </Columna>
        <Columna>
          <h2 className="cn-article-title">Numerosos testigos del suceso</h2>
          <p className="cn-paragraph">
            Numerosos testigos del suceso han relatado la misma versión de los hechos a los agentes encargados de la investigación. Un hombre sospechoso, de numerosas cicatrices en los brazos, fue avistado mientras se alejaba volando de la zona.
          </p>
        </Columna>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">¿Han sido las cotorras suplantadas por kandra?</h2>
        <p className="cn-paragraph">
          El mayor miedo que existe ahora mismo entre la población es si sus queridas cotorras (Kokerlii, Sak y Cotónica) se encuentran en buen estado. Este medio ha conseguido hablar con ellas y, aunque asustadas por lo ocurrido, se muestran confiadas en que las autoridades sean capaces de dar con el culpable. Por el momento, y hasta que la investigación arroje más datos sobre el asunto, planean continuar como hasta ahora, «como si nada hubiera pasado», acciones que, a muchos nos extrañan y que nos hacen plantearnos… ¿Serán elles las originales… o habrán sido reemplazadas por Inmortales Sin Rostro?
        </p>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">Las organizaciones del cosmere se posicionan sobre el suceso</h2>
          <p className="cn-paragraph">
            Debido a la gravedad de lo ocurrido, se han desplegado gran cantidad de recursos, medios y oficiales desde todos los puntos del Cosmere para ponerle nombre al culpable. Mientras tanto, desde nuestro medio hemos conseguido hablar con varias de las organizaciones más importantes de nuestro universo, aunque ninguna de ellas se haya atribuido la autoría en las horas que han pasado.
          </p>
        </Columna>
        <Columna>
          <Fig img={n1_2} w="50%" alt="Imagen de archivo de arcanista" caption="Imagen de archivo de un arcanista de Luzdeplata facilitada por David Palumbo" />
        </Columna>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <h2 className="cn-article-title">Alomante Jak, completamente consternado</h2>
          <p className="cn-paragraph">
            Conseguimos hablar con Jak, que se muestra muy afligido por lo acaecido en las oficinas de la Coppermind,
          </p>
          <p className="cn-paragraph">
            «Esto es un claro caso de invasión de espectros de las brumas. Me encargaría yo mismo de la amenaza, como bien saben mis queridos lectores, pero ahora mismo estoy envuelto en un asunto para recuperar los escritos perdidos del Consejero de los Dioses que podréis disfrutar en el próximo pasquín».
          </p>
        </Columna>
        <Columna>
          <Fig img={n1_3} w="250px" alt="Ilustración de Alomante Jak" caption="Ilustración de Alomante Jak" />
        </Columna>
        <Columna>
          <Fig img={n1_4} w="280px" alt="Ilustración de nuevo investigador" caption="Ilustración de nuevo investigador" />
        </Columna>
        <Columna>
          <h2 className="cn-article-title">Un nuevo investigador llega desde Nalthis</h2>
          <p className="cn-paragraph">
            Parece que ninguno de los planetas conocidos del Cosmere quiere dejar pasar la oportunidad de ayudar a las queridas Cotorras de la Copper, por lo que la propia Edgli manda a un detective que, aunque novato en el campo, ha mostrado muy buenas cifras en la resolución de casos, Sondeluz o, como le conocen sus cercanos, Sondeholmes. Aunque sus métodos no son siempre tradicionales (recordemos el inconveniente que hubo cuando utilizó una ardilla despertada que chillaba como una marrana para poder conseguir información en la Corte de los Dioses), sus logros son más que evidentes, por lo que celebramos su incorporación al equipo de investigación.
          </p>
        </Columna>
      </div>
    </div>
  )
}