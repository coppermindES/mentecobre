export default function Header() {
  return (
    <div className="container-fluid px-0 d-none d-lg-block">
      <div className="row gx-0">
        <div className="col-lg-4 text-center app-header-panel py-3">
          <div className="d-inline-flex align-items-center justify-content-center">
            <i className="bi bi-envelope fs-1 app-header-icon me-3"></i>
            <div className="text-start">
              <h6 className="text-uppercase mb-1">Contacta con nosotros</h6>
              <a href="mailto:coppermindes@gmail.com" className="app-header-link">coppermindes@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center app-header-brand border-inner py-3">
          <div className="d-inline-flex align-items-center justify-content-center">
            <h1 className="m-0 text-uppercase text-white">Mentecobre</h1>
          </div>
        </div>
        <div className="col-lg-4 text-center app-header-panel py-3">
          <div className="d-inline-flex align-items-center justify-content-center">
            <i className="bi bi-link fs-1 app-header-icon me-3"></i>
            <div className="text-start">
              <h6 className="text-uppercase mb-1">Nuestros enlaces</h6>
              <a href="https://linktr.ee/coppermindesp" target="_blank" rel="noreferrer" className="app-header-link">
                Haz click aquí
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
