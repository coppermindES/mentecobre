import FormularioErrata from '../components/FormularioErrata'

export default function Erratas() {
  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Notificación de erratas</h1>
          <p className="page-sub">
            Cuéntanos el fallo que has encontrado para que el equipo pueda subsanarlo.
          </p>
        </div>
      </header>
      <FormularioErrata />
    </div>
  )
}