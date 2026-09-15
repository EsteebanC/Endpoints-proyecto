const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM comentarios ORDER BY ID_Comentario DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM comentarios WHERE ID_Comentario = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Usuario, ID_Publicacion, Contenido, Fecha }) => {
  const [result] = await pool.query(
    'INSERT INTO comentarios (ID_Usuario, ID_Publicacion, Contenido, Fecha) VALUES (?, ?, ?, ?)',
    [ID_Usuario, ID_Publicacion, Contenido, Fecha ?? new Date()]
  );
  return { ID_Comentario: result.insertId, ID_Usuario, ID_Publicacion, Contenido, Fecha };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE comentarios SET ID_Usuario = ?, ID_Publicacion = ?, Contenido = ?, Fecha = ? WHERE ID_Comentario = ?',
    [campos.ID_Usuario, campos.ID_Publicacion, campos.Contenido, campos.Fecha, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM comentarios WHERE ID_Comentario = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };