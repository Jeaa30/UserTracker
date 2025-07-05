// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';
import './App.css';


function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const fetchUsuarios = async () => {
    const res = await axios.get('http://localhost:3000/usuarios');
    setUsuarios(res.data);
    setUsuarioEditar(null);
  };

  const eliminarUsuario = async (id) => {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    fetchUsuarios();
  };

  const editarUsuario = (usuario) => setUsuarioEditar(usuario);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UsuarioForm onSuccess={fetchUsuarios} usuarioEditar={usuarioEditar} />
      <UsuarioList usuarios={usuarios} onDelete={eliminarUsuario} onEdit={editarUsuario} />
    </div>
  );
}

export default App;
