import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsuarioForm({ onSuccess, usuarioEditar }) {
  const [form, setForm] = useState({ nombre: '', email: '', fecha_nacimiento: '' });

  useEffect(() => {
    if (usuarioEditar) setForm(usuarioEditar);
  }, [usuarioEditar]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuarioEditar) {
      await axios.put(`http://localhost:3000/usuarios/${usuarioEditar.id}`, form);
    } else {
      await axios.post('http://localhost:3000/usuarios', form);
    }
    setForm({ nombre: '', email: '', fecha_nacimiento: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} required />
      <button type="submit">{usuarioEditar ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
}

export default UsuarioForm;
