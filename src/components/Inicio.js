import React from 'react';
import { Link } from 'react-router-dom';
import ListarPacientes from './ListarPacientes'; // Asegúrate de importar el componente

function Inicio() {
    return (
        <div>
            <h1>Bienvenido a la Gestión de Pacientes</h1>
            <ul>
                <li><Link to="/inicio">Inicio</Link></li>
                <li><Link to="/paciente/nuevo">Agregar Paciente</Link></li>
                <li><Link to="/paciente/listar">Listar Pacientes</Link></li>
            </ul>

            {/* Vista previa de los últimos 5 pacientes */}
            <ListarPacientes limite={5} />
        </div>
    );
}

export default Inicio;
