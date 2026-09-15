const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM contratos ORDER BY ID_Contratos DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM contratos WHERE ID_Contratos = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_IA, Condiciones, Presupuesto, Fecha_Inicio, Fecha_Fin }) => {
  const [result] = await pool.query(
    'INSERT INTO contratos (ID_IA, Condiciones, Presupuesto, Fecha_Inicio, Fecha_Fin) VALUES (?, ?, ?, ?, ?)',
    [ID_IA, Condiciones, Presupuesto, Fecha_Inicio, Fecha_Fin]
  );
  return { ID_Contratos: result.insertId, ID_IA, Condiciones, Presupuesto, Fecha_Inicio, Fecha_Fin };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE contratos SET ID_IA = ?, Condiciones = ?, Presupuesto = ?, Fecha_Inicio = ?, Fecha_Fin = ? WHERE ID_Contratos = ?',
    [campos.ID_IA, campos.Condiciones, campos.Presupuesto, campos.Fecha_Inicio, campos.Fecha_Fin, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM contratos WHERE ID_Contratos = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };