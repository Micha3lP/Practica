import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ListaPaquetes from "./pages/PaquetesList";
import NavigationBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/paquetes"
          element={
            <ProtectedRoute>
              <ListaPaquetes />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<div>Registro Page</div>} />

        {/* Ruta de acceso denegado */}
        <Route path="/unauthorized" element={<div>Acceso Denegado</div>} />
      </Routes>
    </Router>
  );
}

export default App;
