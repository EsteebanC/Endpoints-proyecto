const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM seguidores ORDER BY ID_Seguidor DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM seguidores WHERE ID_Seguidor = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Usuario, Correo, Telefono, ID_IA }) => {
  const [result] = await pool.query(
    'INSERT INTO seguidores (ID_Usuario, Correo, Telefono, ID_IA) VALUES (?, ?, ?, ?)',
    [ID_Usuario, Correo, Telefono ?? null, ID_IA]
  );
  return { ID_Seguidor: result.insertId, ID_Usuario, Correo, Telefono, ID_IA };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE seguidores SET ID_Usuario = ?, Correo = ?, Telefono = ?, ID_IA = ? WHERE ID_Seguidor = ?',
    [campos.ID_Usuario, campos.Correo, campos.Telefono, campos.ID_IA, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM seguidores WHERE ID_Seguidor = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };