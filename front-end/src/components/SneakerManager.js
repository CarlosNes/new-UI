import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SneakerManager.css';

const SneakerManager = () => {
    const [sneakers, setSneakers] = useState([]);
    const [form, setForm] = useState({ nombre: '', serie: '', precio: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentSneakerId, setCurrentSneakerId] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const API_URL = 'http://localhost:3000/api/sneakers';

    useEffect(() => {
        fetchSneakers();
    }, []);

    const fetchSneakers = async () => {
        const response = await axios.get(API_URL);
        setSneakers(response.data.data.sneakers);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            await axios.put(`${API_URL}/${currentSneakerId}`, form);
        } else {
            await axios.post(API_URL, form);
        }
        setForm({ nombre: '', serie: '', precio: '' });
        setEditMode(false);
        setCurrentSneakerId(null);
        fetchSneakers();
    };

    const handleEdit = (sneaker) => {
        setForm({ nombre: sneaker.nombre, serie: sneaker.serie, precio: sneaker.precio });
        setEditMode(true);
        setCurrentSneakerId(sneaker.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchSneakers();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        if (searchId) {
            try {
                const response = await axios.get(`${API_URL}/${searchId}`);
                const foundSneaker = response.data.data.sneaker; 
                setSneakers([foundSneaker]); 
            } catch (error) {
                setErrorMessage('ID no encontrado'); 
            }
            setSearchId(''); 
        } else {
            fetchSneakers(); 
        }
    };

    return (
        <div className="sneaker-manager">
            <h1>Sneaker Manager</h1>
            <form onSubmit={handleSubmit} className="sneaker-form">
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    name="serie"
                    value={form.serie}
                    onChange={handleInputChange}
                    placeholder="Serie"
                    required
                />
                <input
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleInputChange}
                    placeholder="Precio"
                    required
                />
                <button type="submit">{editMode ? 'Actualizar' : 'Agregar'}</button>
            </form>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Buscar por ID"
                />
                <button type="submit">Buscar</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error si existe */}

            <table className="sneaker-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Serie</th>
                        <th>Precio (Q)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sneakers.map(sneaker => (
                        <tr key={sneaker.id}>
                            <td>{sneaker.nombre}</td>
                            <td>{sneaker.serie}</td>
                            <td>Q{parseFloat(sneaker.precio).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleEdit(sneaker)}>Editar</button>
                                <button onClick={() => handleDelete(sneaker.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SneakerManager;
