import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SearchProducts = () => {
  const [productos, setProductos] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState({
    id: "",
    nombre: "",
    cantidad: "",
    fechaIngreso: "",
    usuarioRegistro: "",
  });

  const handleNameSearchChange = (e) => {
    setSearchByName(e.target.value);
    setErrorMessage("");
  };

  const handleDateSearchChange = (e) => {
    setSearchByDate(e.target.value);
    setErrorMessage("");
  };

  const handleSearchByName = () => {
    if (searchByName.trim() === "") {
      setErrorMessage("Por favor, ingrese un nombre para la búsqueda.");
      return;
    }
    setProductos([]);
    axios.get(`http://localhost:8083/api/products/nombre/${searchByName}`)
      .then((response) => {
        setProductos([response.data]);
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
    setProductos([]);
    axios.get(`http://localhost:8083/api/products/fecha/${searchByDate}`)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al buscar por fecha:', error);
        setErrorMessage('No se encontraron productos para esa fecha.');
      });
  };

  const handleDeleteProduct = (id) => {
    const username = prompt("Ingrese su nombre de usuario para eliminar el producto:");
    if (username) {
        axios.delete(`http://localhost:8083/api/products/delete/${id}/?username=${username}`)
        .then((response) => {
            alert(response.data);
            setProductos((prevProductos) => prevProductos.filter(product => product.id !== id));
        })
        .catch((error) => {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto.');
        });
    
    }
  };

  const handleUpdateProduct = (producto) => {
    setProductToUpdate(producto);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      nombre: productToUpdate.nombre,
      cantidad: productToUpdate.cantidad,
      fechaIngreso: productToUpdate.fechaIngreso,
      usuarioRegistro: productToUpdate.usuarioRegistro,
    };

    try {
      const response = await axios.put(`http://localhost:8083/api/products/actualizar/${productToUpdate.id}`, updatedProduct);
      alert(response.data.message || 'Producto actualizado exitosamente.');
      setShowUpdateModal(false);
      setProductos((prevProductos) => 
        prevProductos.map((prod) => (prod.id === productToUpdate.id ? { ...prod, ...updatedProduct } : prod))
      );
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Error al actualizar el producto.');
    }
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
                <td>{producto.nombreUsuario}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleUpdateProduct(producto)}>Actualizar</button>
                  <button className="btn btn-danger btn-sm ml-1" onClick={() => handleDeleteProduct(producto.id)}>Eliminar</button>
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

      {showUpdateModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Producto</h5>
                <button type="button" className="close" onClick={() => setShowUpdateModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={productToUpdate.nombre}
                      onChange={(e) => setProductToUpdate({ ...productToUpdate, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={productToUpdate.cantidad}
                      onChange={(e) => setProductToUpdate({ ...productToUpdate, cantidad: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Ingreso:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={productToUpdate.fechaIngreso}
                      onChange={(e) => setProductToUpdate({ ...productToUpdate, fechaIngreso: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Usuario Registro:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={productToUpdate.usuarioRegistro}
                      onChange={(e) => setProductToUpdate({ ...productToUpdate, usuarioRegistro: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Cerrar</button>
                  <button type="submit" className="btn btn-primary">Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
