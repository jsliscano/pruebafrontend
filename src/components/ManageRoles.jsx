import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UserActionComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  // Simulación de una función para obtener usuarios de la base de datos
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los usuarios
    // Por ahora, simularemos con algunos datos
    const usuariosDummy = [
      { id: 1, nombre: 'Juan Pérez' },
      { id: 2, nombre: 'Ana Gómez' },
      { id: 3, nombre: 'Luis Rodríguez' },
    ];
    setUsuarios(usuariosDummy);
  }, []);

  const manejarAccion = () => {
    if (usuarioSeleccionado) {
      // Creamos el cuerpo del objeto RolRequestDto que se enviará al backend
      const rolRequestDto = {
        nombre: usuarioSeleccionado,  // Este será el nombre del rol (puedes modificarlo según tu necesidad)
      };

      // Hacemos una petición POST al endpoint del backend
      axios.post('http://localhost:8083/api/rol/create', rolRequestDto)
        .then((response) => {
          console.log('Rol creado exitosamente:', response.data);
          alert(`Acción realizada por: ${usuarioSeleccionado}`);
        })
        .catch((error) => {
          console.error('Error al crear el rol:', error);
          alert('Ocurrió un error al realizar la acción.');
        });
    } else {
      alert("Por favor, selecciona un usuario.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Seleccione un Usuario</h2>
      <div className="mb-3">
        <label htmlFor="usuario" className="form-label">Usuario:</label>
        <select
          id="usuario"
          className="form-select"
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.nombre}>{usuario.nombre}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={manejarAccion}>Realizar Acción</button>
    </div>
  );
};

export default UserActionComponent;
