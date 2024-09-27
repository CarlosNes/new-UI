import React from 'react';
import './App.css'; // Mantener estilos existentes
import SneakerManager from './components/SneakerManager'; // Importar el componente SneakerManager

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sneaker Manager</h1> {/* Título para la aplicación */}
      </header>
      <SneakerManager /> {/* Aquí se agrega el componente para manejar los sneakers */}
    </div>
  );
}

export default App;
