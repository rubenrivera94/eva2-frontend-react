import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BuscarPaciente() {
    const { search } = useParams(); // Obtiene el término de búsqueda de la URL
    const navigate = useNavigate(); // Permite realizar la navegación sin recargar la página
    const [filtros, setFiltros] = useState({
        sexo: '',
        fechaIngreso: '',
        enfermedad: ''
    });
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch de los pacientes al montar el componente o cuando cambian los filtros o el término de búsqueda
    useEffect(() => {
        const fetchPacientes = async () => {
            setLoading(true);
            try {
                // Construye los parámetros de búsqueda
                let params = { ...filtros };
                if (search) params = { search, ...filtros };

                // Elimina parámetros vacíos
                Object.keys(params).forEach(key => params[key] === '' && delete params[key]);

                console.log('Parámetros de búsqueda:', params);

                // Realiza la solicitud de búsqueda al backend
                const response = await axios.get('http://localhost:3000/api/pacientes/buscar', { params });
                setResultados(response.data); // Guardar los resultados de la búsqueda
            } catch (error) {
                setError('Error al buscar pacientes');
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, [search, filtros]); // Dependencias actualizadas

    // Manejar cambios en los campos de filtro
    const handleInputChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la búsqueda por filtros sin redirigir
    const buscarPacientes = (e) => {
        e.preventDefault();
        // Si hay un término de búsqueda, incluirlo en los parámetros
        const params = new URLSearchParams({ ...filtros }).toString();
        const url = search ? `/paciente/buscar?search=${search}&${params}` : `/paciente/buscar?${params}`;
        navigate(url);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Buscar Pacientes</h2>
            <form onSubmit={buscarPacientes}>
                <label>Sexo</label>
                <select name="sexo" value={filtros.sexo} onChange={handleInputChange}>
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </select>

                <label>Fecha de Ingreso</label>
                <input type="date" name="fechaIngreso" value={filtros.fechaIngreso} onChange={handleInputChange} />

                <label>Enfermedad</label>
                <input type="text" name="enfermedad" value={filtros.enfermedad} onChange={handleInputChange} />

              
            </form>

            <h3>Resultados de la Búsqueda</h3>
            {resultados.length > 0 ? (
                <ul>
                   
                    {resultados.map((paciente) => (
                        
                        <li key={paciente._id}>
                            
                            <strong>Nombre:</strong> {paciente.nombre} <br />
                            <strong>RUT:</strong> {paciente.rut} <br />
                            <strong>Sexo:</strong> {paciente.sexo} <br />
                            <strong>Fecha de Ingreso:</strong> {paciente.fechaIngreso} <br />
                            <strong>Enfermedad:</strong> {paciente.enfermedad} <br />
                            <br></br>
                        </li>
                        
                    ))}
                   
                </ul>
            ) : (
                <p>No se encontraron pacientes con los criterios seleccionados.</p>
            )}
        </div>
    );
}

export default BuscarPaciente;
