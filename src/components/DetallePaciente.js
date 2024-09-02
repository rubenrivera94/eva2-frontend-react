import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function DetallePaciente() {
    const { id } = useParams(); // Obtener el id del paciente desde la URL
    const [paciente, setPaciente] = useState(null);
    const navigate = useNavigate(); // Para redireccionar después de eliminar

    // Obtener los datos del paciente cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:3000/api/pacientes/${id}`)
            .then(response => {
                setPaciente(response.data);
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los detalles del paciente:', error);
            });
    }, [id]);

    // Función para manejar la eliminación del paciente
    const handleEliminar = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
            axios.delete(`http://localhost:3000/api/pacientes/${id}`)
                .then(() => {
                    alert('Paciente eliminado exitosamente.');
                    navigate('/paciente/listar'); // Redireccionar a la lista de pacientes
                })
                .catch(error => {
                    console.error('Hubo un problema al eliminar el paciente:', error);
                });
        }
    };

    // Si no se han cargado los datos del paciente, mostrar un mensaje de carga
    if (!paciente) {
        return <div>Cargando detalles del paciente...</div>;
    }

    return (
        <div>
            <h2>Detalle del Paciente</h2>
            <p><strong>RUT:</strong> {paciente.rut}</p>
            <p><strong>Nombre:</strong> {paciente.nombre}</p>
            <p><strong>Edad:</strong> {paciente.edad}</p>
            <p><strong>Sexo:</strong> {paciente.sexo}</p>
            <p><strong>Foto Personal:</strong></p>
            <img src={paciente.fotoPersonal} alt={`Foto de ${paciente.nombre}`} style={{ width: '150px' }} />
            <p><strong>Fecha de Ingreso:</strong> {new Date(paciente.fechaIngreso).toLocaleDateString()}</p>
            <p><strong>Enfermedad:</strong> {paciente.enfermedad}</p>
            <p><strong>Revisado:</strong> {paciente.revisado ? 'Sí' : 'No'}</p>

            {/* Links para actualizar o eliminar el paciente */}
            <div>
                <Link to={`/paciente/actualizar/${id}`} style={{ marginRight: '10px' }}>
                    Actualizar Paciente
                </Link>
                <button onClick={handleEliminar} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Eliminar Paciente
                </button>
            </div>
        </div>
    );
}

export default DetallePaciente;
