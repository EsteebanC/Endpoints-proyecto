const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM publicaciones ORDER BY ID_Publicacion DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM publicaciones WHERE ID_Publicacion = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Tipo_publicacion, Fecha_Publicacion, Descripcion, Numero_likes, Numero_comentarios, ID_Multimedia }) => {
  const [result] = await pool.query(
    'INSERT INTO publicaciones (Tipo_publicacion, Fecha_Publicacion, Descripcion, Numero_likes, Numero_comentarios, ID_Multimedia) VALUES (?, ?, ?, ?, ?, ?)',
    [Tipo_publicacion, Fecha_Publicacion ?? new Date(), Descripcion ?? null, Numero_likes ?? 0, Numero_comentarios ?? 0, ID_Multimedia]
  );
  return { ID_Publicacion: result.insertId, Tipo_publicacion, Fecha_Publicacion, Descripcion, Numero_likes, Numero_comentarios, ID_Multimedia };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE publicaciones SET Tipo_publicacion = ?, Fecha_Publicacion = ?, Descripcion = ?, Numero_likes = ?, Numero_comentarios = ?, ID_Multimedia = ? WHERE ID_Publicacion = ?',
    [campos.Tipo_publicacion, campos.Fecha_Publicacion, campos.Descripcion, campos.Numero_likes, campos.Numero_comentarios, campos.ID_Multimedia, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM publicaciones WHERE ID_Publicacion = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };