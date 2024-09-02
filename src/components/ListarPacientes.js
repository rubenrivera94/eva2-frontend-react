import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListarPacientes({ limite }) {
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/pacientes')
            .then(response => {
                if (limite) {
                    setPacientes(response.data.slice(0, limite)); // Limita los registros si se proporciona "limite"
                } else {
                    setPacientes(response.data); // Muestra todos los pacientes si no se proporciona "limite"
                }
            })
            .catch(error => {
                console.error('Hubo un problema al obtener la lista de pacientes:', error);
            });
    }, [limite]);

    const handleFilaClick = (id) => {
        navigate(`/paciente/detalle/${id}`);
    };

    return (
        <div>
            <h2>{limite ? 'Últimos Pacientes' : 'Lista de Pacientes'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fotografía</th>
                        <th>Nombre Apellido</th>
                        <br></br>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente._id} onClick={() => handleFilaClick(paciente._id)} style={{ cursor: 'pointer' }}>
                            <td>
                                <img src={paciente.fotoPersonal} alt="Foto" style={{ width: '100px', height: 'auto' }} />
                            </td>
                            <td>{paciente.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarPacientes;
