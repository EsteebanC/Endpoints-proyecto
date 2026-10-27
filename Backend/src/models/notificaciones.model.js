const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM notificaciones ORDER BY ID_Notificacion DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM notificaciones WHERE ID_Notificacion = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Usuario, Fecha, Tipo, Estado }) => {
  const [result] = await pool.query(
    'INSERT INTO notificaciones (ID_Usuario, Fecha, Tipo, Estado) VALUES (?, ?, ?, ?)',
    [ID_Usuario, Fecha ?? new Date(), Tipo, Estado ?? 'no_leida']
  );
  return { ID_Notificacion: result.insertId, ID_Usuario, Fecha, Tipo, Estado };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE notificaciones SET ID_Usuario = ?, Fecha = ?, Tipo = ?, Estado = ? WHERE ID_Notificacion = ?',
    [campos.ID_Usuario, campos.Fecha, campos.Tipo, campos.Estado, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM notificaciones WHERE ID_Notificacion = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };