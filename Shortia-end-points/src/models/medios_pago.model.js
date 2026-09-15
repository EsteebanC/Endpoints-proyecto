const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM medios_pago ORDER BY ID_Pago DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM medios_pago WHERE ID_Pago = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Moneda, Proveedor, Tipo, ID_Transaccion }) => {
  const [result] = await pool.query(
    'INSERT INTO medios_pago (Moneda, Proveedor, Tipo, ID_Transaccion) VALUES (?, ?, ?, ?)',
    [Moneda, Proveedor, Tipo, ID_Transaccion]
  );
  return { ID_Pago: result.insertId, Moneda, Proveedor, Tipo, ID_Transaccion };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE medios_pago SET Moneda = ?, Proveedor = ?, Tipo = ?, ID_Transaccion = ? WHERE ID_Pago = ?',
    [campos.Moneda, campos.Proveedor, campos.Tipo, campos.ID_Transaccion, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM medios_pago WHERE ID_Pago = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };