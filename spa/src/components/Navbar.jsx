import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`;

export default function Navbar({ onLoginClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToAvance = (e) => {
    e.preventDefault();
    const collapse = document.getElementById("navbarCollapse");
    if (collapse?.classList.contains("show") && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getInstance(collapse)?.hide();
    }
    if (location.pathname === "/") {
      document.getElementById("el-avance")?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (location.hash !== "#el-avance") {
        window.history.pushState(null, "", "/#el-avance");
      }
      return;
    }
    navigate({ pathname: "/", hash: "#el-avance" });
  };

  return (
    <nav className="site-navbar-sticky navbar navbar-expand-lg bg-dark navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-0">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto mx-lg-auto py-0">
          <NavLink to="/" end className={navClass}>Inicio</NavLink>
          <a href="/#el-avance" className="nav-item nav-link" onClick={goToAvance}>
            El avance
          </a>
          <NavLink to="/glosario" className={navClass}>Glosario</NavLink>

          {!user && (
            <>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeax7cmRbKdXJLqqC8N68LZ2ike1OvyTzIT316972gz3FFLWA/viewform"
                target="_blank"
                rel="noreferrer"
                className="nav-item nav-link"
              >
                Únete al equipo
              </a>
              <NavLink to="/juegos" className={navClass}>Juegos</NavLink>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onLoginClick();
                }}
                className="nav-item nav-link text-decoration-none login"
              >
                Inicia sesión
              </button>
            </>
          )}

          {user && (
            <>
              <NavLink to="/traduccion" className={navClass}>Traducción</NavLink>
              {(user.rol === "revisor" || user.rol === "admin") && <NavLink to="/revision" className={navClass}>Revisión</NavLink>}
              {user.rol === "admin" && <NavLink to="/gestion/basedatos" className={navClass}>Nido de Cotorras</NavLink>}
              <NavLink to="/juegos" className={navClass}>Juegos</NavLink>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ajustes
                </a>
                <div className="dropdown-menu m-0">
                  <NavLink to="/perfil" className="dropdown-item">Perfil</NavLink>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      navigate("/");
                    }}
                    className="dropdown-item"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
