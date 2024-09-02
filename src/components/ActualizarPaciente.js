import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';

function ActualizarPaciente() {
    const { id } = useParams(); // Obtener el id del paciente desde la URL
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fotoPersonal: '',
        fechaIngreso: '',
        enfermedad: '',
        revisado: false,
    });

    const [validator] = useState(new SimpleReactValidator());

    // Obtener los datos del paciente cuando el componente se monta
    useEffect(() => {
        axios.get(`http://localhost:3000/api/pacientes/${id}`)
            .then(response => {
                setPaciente(response.data);
            })
            .catch(error => {
                console.error('Hubo un problema al obtener los datos del paciente:', error);
            });
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        setPaciente({
            ...paciente,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario para actualizar los datos
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            axios.put(`http://localhost:3000/api/pacientes/${id}`, paciente)
                .then(() => {
                    alert('Paciente actualizado exitosamente');
                    navigate('/paciente/listar'); // Redirigir a la lista de pacientes
                })
                .catch(error => {
                    console.error('Hubo un problema al actualizar los datos del paciente:', error);
                    alert('Hubo un problema al actualizar los datos del paciente.');
                });
        } else {
            validator.showMessages();
            // Puedes mostrar los errores de validación de una manera más estilizada si lo deseas
            alert('Por favor, corrije los errores en el formulario.');
        }
    };

    return (
        <div>
            <h2>Actualizar Paciente</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>RUT</label>
                <input
                    type="text"
                    name="rut"
                    value={paciente.rut}
                    onChange={handleInputChange}
                />
                {validator.message('rut', paciente.rut, 'required|alpha_num_dash')}
                <br></br><br></br>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={paciente.nombre}
                    onChange={handleInputChange}
                />
                {validator.message('nombre', paciente.nombre, 'required|alpha_space')}
                <br></br><br></br>
                <label>Edad</label>
                <input
                    type="number"
                    name="edad"
                    value={paciente.edad}
                    onChange={handleInputChange}
                />
                {validator.message('edad', paciente.edad, 'required|numeric')}
                <br></br><br></br>
                <label>Sexo</label>
                <input
                    type="text"
                    name="sexo"
                    value={paciente.sexo}
                    onChange={handleInputChange}
                />
                {validator.message('sexo', paciente.sexo, 'required|in:masculino,femenino,otro')}
                <br></br><br></br>
                <label>Foto Personal</label>
                <input
                    type="file"
                    name="fotoPersonal"
                    value={paciente.fotoPersonal}
                    onChange={handleInputChange}
                />
                <br></br><br></br>
                <label>Fecha de Ingreso</label>
                <input
                    type="date"
                    name="fechaIngreso"
                    value={paciente.fechaIngreso}
                    onChange={handleInputChange}
                />
                <br></br><br></br>
                <label>Enfermedad</label>
                <input
                    type="text"
                    name="enfermedad"
                    value={paciente.enfermedad}
                    onChange={handleInputChange}
                />
                {validator.message('enfermedad', paciente.enfermedad, 'required')}
                <br></br><br></br>
                <label>
                    Revisado
                    <input
                        type="checkbox"
                        name="revisado"
                        checked={paciente.revisado}
                        onChange={(e) => setPaciente({ ...paciente, revisado: e.target.checked })}
                    />
                </label>
                <br></br><br></br>
                <button type="submit">Actualizar Paciente</button>
            </form>
        </div>
    );
}

export default ActualizarPaciente;
