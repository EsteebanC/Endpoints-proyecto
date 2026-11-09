const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM reportes ORDER BY ID_Reporte DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM reportes WHERE ID_Reporte = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Estadisticas }) => {
  const [result] = await pool.query(
    'INSERT INTO reportes (ID_Estadisticas) VALUES (?)',
    [ID_Estadisticas]
  );
  return { ID_Reporte: result.insertId, ID_Estadisticas };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE reportes SET ID_Estadisticas = ? WHERE ID_Reporte = ?',
    [campos.ID_Estadisticas, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM reportes WHERE ID_Reporte = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };