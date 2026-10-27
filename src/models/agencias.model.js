const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM agencias ORDER BY ID_Agencia DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM agencias WHERE ID_Agencia = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Correo, Nombre, ID_Reporte }) => {
  const [result] = await pool.query(
    'INSERT INTO agencias (Correo, Nombre, ID_Reporte) VALUES (?, ?, ?)',
    [Correo, Nombre, ID_Reporte ?? null]
  );
  return { ID_Agencia: result.insertId, Correo, Nombre, ID_Reporte };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE agencias SET Correo = ?, Nombre = ?, ID_Reporte = ? WHERE ID_Agencia = ?',
    [campos.Correo, campos.Nombre, campos.ID_Reporte, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM agencias WHERE ID_Agencia = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };