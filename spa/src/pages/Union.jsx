import FormularioUnion from '../components/FormularioUnion'

export default function Union() {
  return (
    <div>
      <header className="page-header">
        <span className="accent-bar"></span>
        <div>
          <h1 className="page-title">Únete al equipo</h1>
          <p className="page-sub">
            Cuéntanos quién eres, las obras que has leído y demuestra tu traducción.
          </p>
        </div>
      </header>
      <FormularioUnion />
    </div>
  )
}