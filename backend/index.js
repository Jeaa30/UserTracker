// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, email, fecha_nacimiento } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, email, fecha_nacimiento) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, fecha_nacimiento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Editar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, fecha_nacimiento } = req.body;
  try {
    const result = await db.query(
      'UPDATE usuarios SET nombre = $1, email = $2, fecha_nacimiento = $3 WHERE id = $4 RETURNING *',
      [nombre, email, fecha_nacimiento, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al editar usuario' });
  }
});

// Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
