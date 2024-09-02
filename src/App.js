import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Inicio from './components/Inicio';
import AgregarPaciente from './components/AgregarPaciente';
import ActualizarPaciente from './components/ActualizarPaciente';
import DetallePaciente from './components/DetallePaciente';
import ListarPacientes from './components/ListarPacientes';
import BuscarPaciente from './components/BuscarPaciente';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/paciente/nuevo" element={<AgregarPaciente />} />
        <Route path="/paciente/actualizar/:id" element={<ActualizarPaciente />} />
        <Route path="/paciente/detalle/:id" element={<DetallePaciente />} />
        <Route path="/paciente/listar" element={<ListarPacientes />} />
        <Route path="/paciente/buscar/:search" element={<BuscarPaciente />} />
        <Route path="/paciente/buscar" element={<BuscarPaciente />} />
        <Route path="/redirect/:search" render={({ props }) => {
          const search = props.match.params.search;
          return <Navigate to={'/paciente/buscar/'+search} />;
        }} />
        <Route path="*" element={<Error />} /> {/* Ruta para manejar páginas no encontradas */}
      </Routes>
    </div>
  );
}

export default App;
