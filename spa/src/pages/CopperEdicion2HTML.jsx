import { Link, useParams } from 'react-router-dom'
import n2_0 from '../assets/images/coppernews/n2-0.png'
import n2_1 from '../assets/images/coppernews/n2-1.jpg'
import n2_2 from '../assets/images/coppernews/n2-2.png'
import n2_3 from '../assets/images/coppernews/n2-3.jpg'

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

export default function CopperEdicion2HTML() {
  const { edicion } = useParams()

  if (edicion !== 'n2-diciembre-2022') {
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

  const horoscopos = [
    ['AAGAL UCH', '(21 marzo – 20 abril)', 'Recibirás otra invitación de boda para este año, por lo que empezarás a trabajar como apoyo en las carreras de los puentes. Hecho que, paradójicamente, te impedirá asistir a las bodas.'],
    ['RRENDOS', '(21 abril - 20 mayo)', 'Vivirás una experiencia extracorpórea. Aunque el viaje astral será solo de ida, y te verás obligado a fregar cien veces Elantris hasta poder pagarte la vuelta.'],
    ['MISHIM', '(21 mayo – 20 junio)', 'No seas tan pesimista: lo que ahora piensas que es tocar fondo, en realidad es lo más alto que llegarás en la vida. Confórmate, no estás en los puentes.'],
    ['ESTRELLANOCTURNA', '(21 junio – 21 julio)', 'Tendrás un accidente aéreo por falta de luz tormentosa. Acabarás en una isla desierta y, a pesar de que nadie te rescatará, los selladores de sangre te encontrarán.'],
    ['NIZH DA', '(22 julio – 22 agosto)', 'Emprenderás un negocio durante los primeros meses, generando así «chorrocientosmil» de puestos de trabajo en la Cuenca de Elendel y transformando la zona en la primera potencia mundial.'],
    ['SALAS', '(23 agosto – 22 septiembre)', 'Te encontrarás a ti mismo en un tugurio de musgoardiente. El hedor que embriaga el ambiente transformará tu visión del mundo para siempre.'],
    ['NOMON', '(23 septiembre – 22 octubre)', 'Empezarás a ver cosas extrañas en tu casa: puertas que se cierran, objetos que caen misteriosamente de sus repisas, ruidos en la noche… Nosotros sabemos que es tu gato, pero oye, si crees en las umbras no seremos nosotras quienes limiten tus sueños.'],
    ['LÁGRIMA', '(23 octubre – 21 noviembre)', 'Momento idóneo para convertirte en saltamundos: emprender un viaje, conocer otro planeta y vivir una apasionante aventura.'],
    ['PRIMERO DEL PRIMERO', '(22 noviembre – 21 diciembre)', 'En los próximos meses tu estado de salud va a ser envidiable. Revisa tu ascendencia, no sea aónica y en realidad sea que te ha pillado la Shaod.'],
    ['GUARDIANLEJANO', '(22 diciembre – 21 enero)', 'Dijiste que era la última vez que bebías blanco comecuernos. Sé que disfrutar de la vida es importante, ¡pero no exageres!'],
    ['AAGAL NOD', '(22 enero – 18 febrero)', 'En los próximos días vas a notar como se despierta en ti el deseo de desarrollar tus habilidades culinarias. Compra el libro de recetas de Kiin y Roca, métete en la cocina y explota tus habilidades preparando exquisitos y refinados platos.'],
    ['OEM', '(19 febrero – 20 marzo)', 'A veces pensarás que todo el mundo te odia y que está en tu contra… y eso te pasará porque, por desgracia, te pareces físicamente a Moash.'],
  ]

  const anuncios = [
    { h: 'Sellos para el hogar', t1: '¿Cansado de que tu casa sea simple y sin estilo? Con nuestros sellos conseguirás que todo tenga mucho mejor aspecto. ¡Y SIN CAMBIAR DE MUEBLES!', f: 'Busca a Wan ShaiLu' },
    { h: 'Hammond y sus violentos', t1: '¿Tiene una mudanza? ¿Está cansado de reventarse la espalda levantando esas pesadas cajas? Llame a Hammond y sus violentos y en menos de lo que salen las brumas llevaremos sus pertenencias a donde quiera.', f: 'Brazos de Peltre Hammond' },
    { h: 'Sondeluz, un Detective Divino', t1: '¿Animales que se comportan de forma rara? ¿Extraños pasajes que salen de tu baño comedor? ¿Algún cambio de color en tu hogar no intencionado?', f: 'Sondeluz, un Detective Divino' },
    { h: 'Dahkor a domicilio', t1: 'Contracturas, dolor lumbar o de articulaciones… Llame ahora a nuestro servicio Dahkor a domicilio y olvídese de sus traumatismos. Le mejoraremos el esqueleto completamente en menos de lo que tarda en quemarse un elantrino.', f: 'Monjes Dahkor' },
    { h: 'Adrenalina Pura', t1: 'Caída libre, rafting en aguas bravas, escalada de murallas…', f: 'Aventuras Raoden & Karata, Adrenalina Pura' },
    { h: 'Ardillas que chillan como marranas', t1: '¿Harto de asistir a eventos sociales en los que no te sientes cómodo? Acaba con ellos, tenemos la solución: ¡ardillas que chillan como marranas!', f: 'Sondeluz el Audaz' },
  ]

  return (
    <div className="cn-content">
      <p className="cn-kicker">28 DICIEMBRE 2022 · EDICIÓN ESPECIAL</p>

      <div style={rowStyle}>
        <Columna>
        <h2 className="cn-article-title">Continúa la investigación sobre el asalto a la coppermind</h2>
        <p className="cn-paragraph">
          Pese a haber transcurrido ya un mes desde el suceso, poco se ha podido deducir sobre el ataque que recibieron las oficinas de la coppermind en español el mes pasado. La falta de pruebas y de testigos fiables ralentiza y dificulta la obtención de pruebas y nuevos sospechosos. Parece que por el momento se ha descartado que la organización de los Sangre Espectral se encuentre involucrada en lo sucedido y el trabajo de traducción se ha reanudado sin ningún tipo de problema.
        </p>
        </Columna>
        <Columna>
          <Fig img={n2_0} w="80%" alt="Estado de las oficinas de la Coppermind" caption="Imagen de Egilde Art tomada en la presentación de la reina." />
        </Columna>
      </div>
      
      <hr style={separator} />

      <div style={rowStyle}>
        <Columna>
          <Fig img={n2_1} w="80%" alt="La reina sisirinah" caption="Su Majestad la reina, recientemente teñida." />
        </Columna>
        <Columna>
          <h2 className="cn-article-title">La reina sisirinah se tiñe el pelo</h2>
          <p className="cn-paragraph">
            Conseguimos infiltrarnos en la Corte de los Dioses y hablar con las doncellas Pahn Khal que atienden a su majestad la reina. Lo que en un principio parecían simples tratamientos para mantener su larga cabellera saludable y con buen aspecto, se han confirmado como mascarillas de color y tintes. Pese a las innumerables pruebas que tenemos en su contra, los sacerdotes del rey-dios sostienen que la dama es la propia descendiente de Vo y, por lo tanto, heredera de los mechones reales.
          </p>
          <p className="cn-paragraph">
            Las diferentes facciones dentro de la Corte se mantienen divididas, ya que, por un lado, están los Retornados que opinan que la reina ha venido para desestabilizar la política del país y hacer caer la monarquía desde dentro. Por otro lado, están los que, según ellos, conocen de primera mano a la susodicha y aseguran que solo utiliza los colorantes para su cabello para ocasiones especiales.
          </p>
        </Columna>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Pronóstico del tiempo</h2>
        <Fig img={n2_2} w="100%" alt="Pronóstico del tiempo en Roshar" caption="Pronóstico del tiempo en Roshar." />
        <p className="cn-paragraph">
          Fin de semana en Roshar que se espera gris, con nubes, con gran número de precipitaciones en el continente. Triste (meteorológicamente hablando). Como ven, no hay palabras bonitas para describir el tiempo que nos deparan los próximos días, pero podemos decir que estamos acostumbrados a ello, ya que se acerca el cambio de año y, con él, el Llanto. Afortunadamente, y como el año que comienza es impar, tendremos un día de descanso.
        </p>
        <p className="cn-paragraph">
          En otros planetas del Cosmere tenemos previsiones más esperanzadoras. Si su intención es viajar al Lado Diurno de Taldain está de suerte, porque el sol no le dará un minuto de descanso. En Scadrial, tendremos en la Cuenca de Elendel el sábado cielos muy cubiertos con precipitaciones moderadas e incluso posibilidad de alguna tormenta. Temperaturas nocturnas sin cambios. Será una oportunidad perfecta para una ceremonia supervivencialista, ya que se esperan las tan ansiadas brumas.
        </p>
        <p className="cn-paragraph">
          En la zona sur del planeta, el viento soplará con fuerza y el domingo se espera un día muy nuboso, con chubascos débiles, ocasionalmente con granizo y con tormenta. La cota de nieve se situará en torno a 700 metros y ligero descenso de las temperaturas que dejarán heladas débiles en la cordillera.
        </p>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Cosmóscopo</h2>
        <p className="cn-kicker">(sin adivinación, aprobado por fervorosos vorin)</p>
        {horoscopos.map(([signo, fechas, texto], i) => (
          <div key={i} style={{ margin: '0.5rem 0' }}>
            <p style={{ margin: '0.2rem 0' }}>
              <strong>{signo}</strong> <span style={{ color: 'var(--cn-muted)' }}>{fechas}</span>
            </p>
            <p className="cn-paragraph" style={{ margin: '0.2rem 0' }}>{texto}</p>
          </div>
        ))}
      </div>
      <hr style={separator} />

      <div >
        <h2 className="cn-article-title">Artículo de opinión</h2>
        <div style={boxStyle}>
          <div style={rowStyle}>
            <div>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#d3413f', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
            Hemalurgia: Cuando la moda de las perforaciones se va de las manos
          </h3>
          <p className="cn-paragraph">Vivimos tiempos inciertos, momentos en los que ver a jovenzuelos perforados por todas partes con metal te hace plantearte: ¿es acaso moda? ¿O está adquiriendo acceso a los poderes de un nacido del metal de la manera más macabra posible?</p>
          <p className="cn-paragraph">Las autoridades no hacen nada cuando se denuncia a estos malhechores, ya que se escudan en que es «moda» o «elección en el atuendo que llevan», pero tampoco creo que sea moralmente aceptable permitir que estas nuevas generaciones vayan por la calle con ese aspecto, ya que hace parecer que nuestra sociedad se está convirtiendo en algo de baja clase y descuidado.</p>
          <p className="cn-paragraph">¿Qué será lo próximo? ¿Sangre-koloss en los altos mandos de la Cuenca? No se pide que volvamos a los tiempos en los que la ceniza caía del cielo y el látigo era la manera de motivar al trabajador, pero lo que vemos hoy en día dista mucho de la sociedad perfecta que Armonía planteó.</p>
          <p className="cn-paragraph">Además, ¿cómo podemos saber que verdaderamente es un mero elemento decorativo? Exigimos un control de estos metales y de la gente que los utiliza, un certificado acreditativo que deban portar siempre para asegurarnos de que no suponen un problema para las gentes decentes y honradas de Elendel.</p>
          <p style={{ margin: '0.5rem 0 0' }}>
            <em>Vuestra columnista favorita: Abrigain</em>
          </p>
          </div>
          <Fig img={n2_3} w="100%" alt="Abrigain"/>
          </div>
        </div>
      </div>
      <hr style={separator} />

      <div style={rowStyle}>
        <h2 className="cn-article-title">Saltamundos indignadas ante los pudorosos rosharianos. Aumenta la venta de guantes en las cercanías del planeta.</h2>
        <h2 className="cn-article-title">Luzdeplata a la cabeza de la investigación del resfriado común y una posible cura para los afectados.</h2>
      </div>
      <hr style={separator} />

      <div>
        <h2 className="cn-article-title">Espacio publicitario</h2>
        <div style={{ ...rowStyle, flexWrap: 'wrap' }}>
          {anuncios.map((an, i) => (
            <div key={i} style={{ flex: '1 1 30%', minWidth: '250px', boxSizing: 'border-box' }}>
              <div style={boxStyle}>
                <p className="cn-paragraph">{an.t1}</p>
                <p style={{ fontFamily: 'Oswald, sans-serif', color: '#d3413f', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>{an.f}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}