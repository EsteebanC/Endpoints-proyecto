const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM categoria ORDER BY ID_Categoria DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM categoria WHERE ID_Categoria = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO categoria (Nombre) VALUES (?)',
    [Nombre]
  );
  return { ID_Categoria: result.insertId, Nombre };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE categoria SET Nombre = ? WHERE ID_Categoria = ?',
    [campos.Nombre, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM categoria WHERE ID_Categoria = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };