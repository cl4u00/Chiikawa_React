// Ubicación: proyectoChiikawa/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chiikawa from './pages/chiikawa';
import Registro from './pages/registro';
import { CartProvider } from './context/CartContext'; // <--- IMPORTA ESTO

function App() {
  return (
    <CartProvider> {/* <--- ENVUELVE TODO AQUÍ */}
      <Router>
        <Routes>
          <Route path="/" element={<Chiikawa />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;