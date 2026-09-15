const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM estadisticas ORDER BY ID_Estadisticas DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM estadisticas WHERE ID_Estadisticas = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Total_Likes, Total_Comentarios, Total_Publicaciones, Numero_Seguidores, Numero_Compartidos, ID_Publicacion }) => {
  const [result] = await pool.query(
    'INSERT INTO estadisticas (Total_Likes, Total_Comentarios, Total_Publicaciones, Numero_Seguidores, Numero_Compartidos, ID_Publicacion) VALUES (?, ?, ?, ?, ?, ?)',
    [Total_Likes ?? 0, Total_Comentarios ?? 0, Total_Publicaciones ?? 0, Numero_Seguidores ?? 0, Numero_Compartidos ?? 0, ID_Publicacion]
  );
  return { ID_Estadisticas: result.insertId, Total_Likes, Total_Comentarios, Total_Publicaciones, Numero_Seguidores, Numero_Compartidos, ID_Publicacion };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE estadisticas SET Total_Likes = ?, Total_Comentarios = ?, Total_Publicaciones = ?, Numero_Seguidores = ?, Numero_Compartidos = ?, ID_Publicacion = ? WHERE ID_Estadisticas = ?',
    [campos.Total_Likes, campos.Total_Comentarios, campos.Total_Publicaciones, campos.Numero_Seguidores, campos.Numero_Compartidos, campos.ID_Publicacion, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM estadisticas WHERE ID_Estadisticas = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };