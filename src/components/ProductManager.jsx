import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap
import { Toast, ToastContainer } from 'react-bootstrap'; // Importa los componentes Toast y ToastContainer
import SearchProducts from './SearchProducts'; // Importa el componente SearchProducts

const ProductManager = () => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [userNameRegister, setUserNameRegister] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false); // Estado para controlar si el toast está visible
    const [submoduloActivo, setSubmoduloActivo] = useState('crear');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            nombre,
            cantidad: parseInt(cantidad),
            fechaIngreso,
            userNameRegister,
        };

        try {
            const response = await axios.post('http://localhost:8083/api/products/save', productData);
            if (response && response.data) {
                setMessage('Producto creado exitosamente');
            } else {
                setMessage('Error al crear el producto');
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
            if (error.response) {
                setMessage(error.response.data.message || 'Error al crear el producto');
            } else if (error.request) {
                setMessage('No se recibió respuesta del servidor');
            } else {
                setMessage('Error: ' + error.message);
            }
        }
        setShowToast(true); // Muestra el toast
    };

    const handleCancel = () => {
        setNombre('');
        setCantidad('');
        setFechaIngreso('');
        setUserNameRegister('');
        setMessage('');
    };

    const renderSubmodulo = () => {
        switch (submoduloActivo) {
            case 'crear':
                return (
                    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
                        <div className="row mb-3">
                            <div className="col-md-6 offset-md-3">
                                <div className="form-group">
                                    <label className="form-label">Nombre del Producto:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 offset-md-3">
                                <div className="form-group">
                                    <label className="form-label">Cantidad:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 offset-md-3">
                                <div className="form-group">
                                    <label className="form-label">Fecha de Ingreso:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={fechaIngreso}
                                        onChange={(e) => setFechaIngreso(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 offset-md-3">
                                <div className="form-group">
                                    <label className="form-label">Nombre de Usuario:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={userNameRegister}
                                        onChange={(e) => setUserNameRegister(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 offset-md-3 d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Crear Producto</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                );
            case 'buscar':
                return <SearchProducts />; // Aquí se renderiza el componente de búsqueda
            case 'roles':
                return <h3>Gestión de Roles (Funcionalidad en desarrollo)</h3>;
            case 'registrar':
                return <h3>Registrar Usuario (Funcionalidad en desarrollo)</h3>;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Gestión de Productos</h2>

            {/* Barra de Navegación */}
            <nav className="nav nav-pills justify-content-center mb-4">
                <button className={`nav-link ${submoduloActivo === 'crear' ? 'active' : ''}`} onClick={() => setSubmoduloActivo('crear')}>Crear Producto</button>
                <button className={`nav-link ${submoduloActivo === 'buscar' ? 'active' : ''}`} onClick={() => setSubmoduloActivo('buscar')}>Buscar Productos</button>
                <button className={`nav-link ${submoduloActivo === 'roles' ? 'active' : ''}`} onClick={() => setSubmoduloActivo('roles')}>Gestión de Roles</button>
                <button className={`nav-link ${submoduloActivo === 'registrar' ? 'active' : ''}`} onClick={() => setSubmoduloActivo('registrar')}>Registrar Usuario</button>
            </nav>

            {/* Renderiza el submódulo activo */}
            {renderSubmodulo()}

            {/* Toast centrado para mensajes flotantes */}
            <ToastContainer className="p-3" position="middle-center" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header className="bg-primary text-white">
                        <strong className="me-auto">Notificación</strong>
                    </Toast.Header>
                    <Toast.Body className="text-center">
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default ProductManager;
