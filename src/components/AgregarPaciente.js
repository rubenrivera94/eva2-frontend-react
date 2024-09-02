import React, { useState } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';

function AgregarPaciente() {
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fechaIngreso: '',
        enfermedad: '',
        revisado: false
    });

    const [validator] = useState(new SimpleReactValidator());

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setPaciente({
                ...paciente,
                [name]: checked
            });
        } else {
            setPaciente({
                ...paciente,
                [name]: value
            });
        }
    };

    // Enviar datos con validación
    const enviarDatos = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            try {
                // Enviar datos al backend
                await axios.post('http://localhost:3000/api/pacientes', paciente);
                alert('Paciente agregado exitosamente');
                navigate('/paciente/listar'); // Redirigir al listado de pacientes
            } catch (error) {
                console.error(error);
                alert('Error al agregar el paciente');
            }
        } else {
            validator.showMessages();
            // Mostrar un mensaje de error
            alert('Por favor, corrije los errores en el formulario.');
        }
    };

    return (
        <form onSubmit={enviarDatos}>
            <br></br><br></br>
            <label>RUT</label>
            <input
                type="text"
                name="rut"
                value={paciente.rut}
                onChange={handleInputChange}
            />
            {validator.message('rut', paciente.rut, 'required|alpha_num')}
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
                type="text"
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

            <label>Enfermedad</label>
            <input
                type="text"
                name="enfermedad"
                value={paciente.enfermedad}
                onChange={handleInputChange}
            />
            {validator.message('enfermedad', paciente.enfermedad, 'required')}
            <br></br><br></br>

            {/* Campo de fecha de ingreso */}
            <label>Fecha de Ingreso</label>
            <input
                type="date"
                name="fechaIngreso"
                value={paciente.fechaIngreso}
                onChange={handleInputChange}
            />
            {validator.message('fechaIngreso', paciente.fechaIngreso, 'required')}
            <br></br><br></br>

            {/* Checkbox para revisado */}
            <label>
                Revisado
                <input
                    type="checkbox"
                    name="revisado"
                    checked={paciente.revisado}
                    onChange={handleInputChange}
                />
            </label>
            <br></br><br></br>

            <button type="submit">Agregar Paciente</button>
        </form>
    );
}

export default AgregarPaciente;
