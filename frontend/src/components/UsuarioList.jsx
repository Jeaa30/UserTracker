import React from 'react';

function UsuarioList({ usuarios, onDelete, onEdit }) {
  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>
          {u.nombre} - {u.email} - {u.fecha_nacimiento}
          <button onClick={() => onEdit(u)}>Editar</button>
          <button onClick={() => onDelete(u.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default UsuarioList;
