const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM tokens ORDER BY ID_Token DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM tokens WHERE ID_Token = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Tipo, Cantidad, ID_Usuario }) => {
  const [result] = await pool.query(
    'INSERT INTO tokens (Tipo, Cantidad, ID_Usuario) VALUES (?, ?, ?)',
    [Tipo, Cantidad ?? 0, ID_Usuario]
  );
  return { ID_Token: result.insertId, Tipo, Cantidad, ID_Usuario };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE tokens SET Tipo = ?, Cantidad = ?, ID_Usuario = ? WHERE ID_Token = ?',
    [campos.Tipo, campos.Cantidad, campos.ID_Usuario, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM tokens WHERE ID_Token = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };