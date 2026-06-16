import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chiikawa from './pages/Chiikawa';
import Registro from './pages/Registro';

function App() {
  return (
    <Router>
      <Routes>
        {/* La ruta raíz "/" mostrará tu página principal */}
        <Route path="/" element={<Chiikawa />} />
        
        {/* La ruta "/registro" mostrará tu página de login/registro */}
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
