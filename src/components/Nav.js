import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Nav() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // Verifica si el término de búsqueda está vacío
        if (searchTerm.trim() === '') {
            // Redirige a /paciente/buscar sin parámetro de búsqueda
            navigate('/paciente/buscar');
        } else {
            // Redirige a /paciente/buscar con el término de búsqueda
            navigate(`/paciente/buscar/${searchTerm}`);
        }
        setSearchTerm(''); // Limpiar el campo de búsqueda después de la búsqueda
    };

    return (
        <nav>
            <ul>
                <li><Link to="/inicio">Inicio</Link></li>
                <li><Link to="/paciente/nuevo">Agregar Paciente</Link></li>
                <li><Link to="/paciente/listar">Listar Pacientes</Link></li>
            </ul>

            {/* Agregar formulario de búsqueda */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                    <FaSearch /> Buscar
                </button>
            </form>
        </nav>
    );
}

export default Nav;
