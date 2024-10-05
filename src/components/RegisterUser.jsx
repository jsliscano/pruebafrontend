import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './RegisterUser.css'; // Asegúrate de crear este archivo CSS

const RegisterUser = () => {
  const [nombre, setNombre] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("DNI");
  const [cargoId, setCargoId] = useState("");
  const [edad, setEdad] = useState("");
  const [message, setMessage] = useState(""); 
  const [showToast, setShowToast] = useState(false); 
  const [showModal, setShowModal] = useState(false); 

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!nombre || !fechaIngreso || !numeroIdentificacion || !cargoId || !edad) {
      setMessage('Por favor, completa todos los campos.');
      setShowToast(true);
      return;
    }

    const datosUsuario = {
      nombre,
      fechaIngreso,
      numeroIdentificacion,
      tipoIdentificacion,
      cargoId,
      edad,
    };

    try {
      const response = await axios.post('http://localhost:8083/api/user/create', datosUsuario);
      if (response.status === 201) {
        setMessage('Usuario registrado exitosamente');
        setShowModal(true);
      } else {
        setMessage('Error al registrar el usuario');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMessage('Error: ' + (error.response?.data?.message || 'No se pudo registrar el usuario'));
      setShowToast(true);
    }

    // Restablecer el formulario
    setNombre("");
    setFechaIngreso("");
    setNumeroIdentificacion("");
    setTipoIdentificacion("DNI");
    setCargoId("");
    setEdad("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={manejarEnvio} className="p-4 border rounded shadow bg-light">
            <h4 className="text-center mb-4 text-primary">Complete los datos del usuario</h4>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control form-control-lg"
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
                className="form-control form-control-lg"
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
                className="form-control form-control-lg"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoIdentificacion" className="form-label">Tipo de Identificación</label>
              <select
                id="tipoIdentificacion"
                value={tipoIdentificacion}
                onChange={(e) => setTipoIdentificacion(e.target.value)}
                className="form-select form-select-lg"
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
                className="form-control form-control-lg"
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
                className="form-control form-control-lg"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100">Registrar Usuario</button>
          </form>

          {/* Mostrar mensaje de éxito o error */}
          {showToast && (
            <div className={`alert alert-${message.includes('Error') ? 'danger' : 'success'} mt-3`}>
              {message}
            </div>
          )}

          {/* Modal de éxito */}
          {showModal && (
            <div className="modal show" style={{ display: 'block', position: 'fixed', zIndex: 1050 }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Registro Exitoso</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <p>{message}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
