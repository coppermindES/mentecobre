import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import "./App.css";

const styleHome = {
  minHeight: "100vh",
  background: "transparent",
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

function HomeLayout({ children }) {
  return <div style={styleHome}>{children}</div>;
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout><Inicio onLoginClick={() => setShowLogin(true)} /></HomeLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
