const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM redes_sociales ORDER BY ID_Redes DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM redes_sociales WHERE ID_Redes = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Nombre, URL_Perfil, ID_Publicacion }) => {
  const [result] = await pool.query(
    'INSERT INTO redes_sociales (Nombre, URL_Perfil, ID_Publicacion) VALUES (?, ?, ?)',
    [Nombre, URL_Perfil ?? null, ID_Publicacion]
  );
  return { ID_Redes: result.insertId, Nombre, URL_Perfil, ID_Publicacion };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE redes_sociales SET Nombre = ?, URL_Perfil = ?, ID_Publicacion = ? WHERE ID_Redes = ?',
    [campos.Nombre, campos.URL_Perfil, campos.ID_Publicacion, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM redes_sociales WHERE ID_Redes = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };