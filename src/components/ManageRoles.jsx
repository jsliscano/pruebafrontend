import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const RolCreationComponent = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // "success", "danger", or "warning"

  const manejarAccion = () => {
    if (nombre.trim() !== "") {
      const rolRequestDto = { roleName: nombre };

      axios.post('http://localhost:8083/api/rol/create', rolRequestDto)
        .then((response) => {
          console.log('Rol creado exitosamente:', response.data);
          setMensaje(`Rol "${nombre}" creado exitosamente.`);
          setMensajeTipo("success");  // Mensaje de éxito
          setNombre("");  // Resetea el campo de texto
        })
        .catch((error) => {
          console.error('Error al crear el rol:', error);
          setMensaje("Ocurrió un error al crear el rol.");
          setMensajeTipo("danger");  // Mensaje de error
        });
    } else {
      setMensaje("Por favor, ingresa un nombre para el rol.");
      setMensajeTipo("warning");  // Mensaje de advertencia
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 className="text-center mb-4">Crear un Nuevo Rol</h2>

      {/* Mensaje de feedback */}
      {mensaje && (
        <div className={`alert alert-${mensajeTipo} text-center`} role="alert">
          {mensaje}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Rol:</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa el nombre del rol"
        />
      </div>

      {/* Botón centrado */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={manejarAccion}>
          Crear Rol
        </button>
      </div>
    </div>
  );
};

export default RolCreationComponent;
