import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterUser = () => {
  const [nombre, setNombre] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("DNI");
  const [cargoId, setCargoId] = useState("");
  const [edad, setEdad] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    const datosUsuario = {
      nombre,
      fechaIngreso,
      numeroIdentificacion,
      tipoIdentificacion,
      cargoId,
      edad,
    };

    console.log("Usuario registrado:", datosUsuario);
    
    // Restablecer el formulario
    setNombre("");
    setFechaIngreso("");
    setNumeroIdentificacion("");
    setTipoIdentificacion("DNI");
    setCargoId("");
    setEdad("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={manejarEnvio} className="p-4 border rounded shadow bg-light">
            <h4 className="text-center mb-4">Complete los datos del usuario</h4>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control form-control-sm" // Tamaño más pequeño
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">Edad</label>
              <input
                type="number"
                id="edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroIdentificacion" className="form-label">Número de Identificación</label>
              <input
                type="text"
                id="numeroIdentificacion"
                value={numeroIdentificacion}
                onChange={(e) => setNumeroIdentificacion(e.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoIdentificacion" className="form-label">Tipo de Identificación</label>
              <select
                id="tipoIdentificacion"
                value={tipoIdentificacion}
                onChange={(e) => setTipoIdentificacion(e.target.value)}
                className="form-select form-select-sm"
                required
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cédula">Cédula</option>
                <option value="RUC">RUC</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cargoId" className="form-label">Cargo</label>
              <input
                type="text"
                id="cargoId"
                value={cargoId}
                onChange={(e) => setCargoId(e.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso</label>
              <input
                type="date"
                id="fechaIngreso"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                className="form-control form-control-sm"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
