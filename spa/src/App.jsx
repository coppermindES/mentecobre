import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import { useAuth } from "./context/AuthContext";
import Graficos from "./pages/Graficos";
import Glosario from "./pages/Glosario";
import Inicio from "./pages/Inicio";
import JuegoEmbed from "./pages/JuegoEmbed";
import CopperQuizGame from "./pages/CopperQuizGame";
import CopperhopperGame from "./pages/CopperhopperGame";
import Juegos from "./pages/Juegos";
import "./App.css";

const stylePublic = {
  minHeight: "100vh",
  background: "#F5F0E8",
  fontFamily: "'Segoe UI', sans-serif"
};

function PublicLayout({ onLoginClick, children }) {
  return (
    <div style={stylePublic}>
      <Header />
      <Navbar onLoginClick={onLoginClick} />
      {children}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><Inicio /></PublicLayout>} />
        <Route path="/sobre" element={<Navigate to="/" replace />} />
        <Route path="/graficos" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><Graficos /></PublicLayout>} />
        <Route path="/glosario" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><Glosario /></PublicLayout>} />
        <Route path="/juegos" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><Juegos /></PublicLayout>} />
        <Route path="/juegos/aventura" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><JuegoEmbed title="La aventura de los Forjamundos" src="/games/aventura.html" /></PublicLayout>} />
        <Route path="/juegos/copperhopper" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><CopperhopperGame /></PublicLayout>} />
        <Route path="/juegos/copperquiz" element={<PublicLayout onLoginClick={() => setShowLogin(true)}><CopperQuizGame /></PublicLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
