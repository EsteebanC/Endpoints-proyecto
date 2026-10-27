const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM transacciones ORDER BY ID_Transaccion DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM transacciones WHERE ID_Transaccion = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Token, Monto, Estado, Fecha }) => {
  const [result] = await pool.query(
    'INSERT INTO transacciones (ID_Token, Monto, Estado, Fecha) VALUES (?, ?, ?, ?)',
    [ID_Token, Monto ?? 0, Estado ?? 'pendiente', Fecha ?? new Date()]
  );
  return { ID_Transaccion: result.insertId, ID_Token, Monto, Estado, Fecha };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE transacciones SET ID_Token = ?, Monto = ?, Estado = ?, Fecha = ? WHERE ID_Transaccion = ?',
    [campos.ID_Token, campos.Monto, campos.Estado, campos.Fecha, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM transacciones WHERE ID_Transaccion = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };