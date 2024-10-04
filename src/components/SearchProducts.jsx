import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SearchProducts = () => {
  const [productos, setProductos] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para manejar errores

  const handleNameSearchChange = (e) => {
    setSearchByName(e.target.value);
    setErrorMessage(""); // Limpiar mensaje de error al cambiar input
  };

  const handleDateSearchChange = (e) => {
    setSearchByDate(e.target.value);
    setErrorMessage(""); // Limpiar mensaje de error al cambiar input
  };

  const handleSearchByName = () => {
    if (searchByName.trim() === "") {
      setErrorMessage("Por favor, ingrese un nombre para la búsqueda.");
      return;
    }
    setProductos([]); // Limpiar productos antes de buscar
    axios.get(`http://localhost:8083/api/products/nombre/${searchByName}`)
      .then((response) => {
        setProductos([response.data]); // El backend devuelve un solo producto
      })
      .catch((error) => {
        console.error('Error al buscar por nombre:', error);
        setErrorMessage('No se encontró ningún producto con ese nombre.');
      });
  };

  const handleSearchByDate = () => {
    if (!searchByDate) {
      setErrorMessage("Por favor, seleccione una fecha para la búsqueda.");
      return;
    }
    setProductos([]); // Limpiar productos antes de buscar
    axios.get(`http://localhost:8083/api/products/fecha/${searchByDate}`)
      .then((response) => {
        setProductos(response.data); // El backend devuelve una lista de productos
      })
      .catch((error) => {
        console.error('Error al buscar por fecha:', error);
        setErrorMessage('No se encontraron productos para esa fecha.');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Buscar Productos</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <div className="row justify-content-center mb-4">
        <div className="col-md-5 mb-3">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              onChange={handleNameSearchChange}
              className="form-control"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSearchByName}>
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-3">
          <div className="input-group">
            <input
              type="date"
              onChange={handleDateSearchChange}
              className="form-control"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSearchByDate}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover mt-4">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Fecha de Ingreso</th>
            <th>Usuario Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.fechaIngreso}</td>
                <td>{producto.usuarioRegistro}</td>
                <td>
                  <button className="btn btn-warning btn-sm">Actualizar</button>
                  <button className="btn btn-danger btn-sm ml-1">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No se encontraron productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchProducts;
