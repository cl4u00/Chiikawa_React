// Ubicación: proyectoChiikawa/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chiikawa from './pages/chiikawa';
import Registro from './pages/registro';
import { CartProvider } from './context/CartContext';
import LanguageSelector from './components/LanguageSelector'; // <--- IMPORTA EL MENU CIRCULAR

function App() {
  return (
    <CartProvider>
      <Router>
        {/* El menú se coloca fuera de Routes para que sea visible en TODAS las páginas */}
        <LanguageSelector />
        
        <Routes>
          <Route path="/" element={<Chiikawa />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;