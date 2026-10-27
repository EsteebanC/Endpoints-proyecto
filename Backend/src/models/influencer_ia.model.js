const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM influencer_ia ORDER BY ID_IA DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM influencer_ia WHERE ID_IA = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Nombre, Descripcion, Algoritmo, Fecha_Creacion, ID_Agencia }) => {
  const [result] = await pool.query(
    'INSERT INTO influencer_ia (Nombre, Descripcion, Algoritmo, Fecha_Creacion, ID_Agencia) VALUES (?, ?, ?, ?, ?)',
    [Nombre, Descripcion, Algoritmo, Fecha_Creacion ?? new Date(), ID_Agencia]
  );
  return { ID_IA: result.insertId, Nombre, Descripcion, Algoritmo, Fecha_Creacion, ID_Agencia };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE influencer_ia SET Nombre = ?, Descripcion = ?, Algoritmo = ?, Fecha_Creacion = ?, ID_Agencia = ? WHERE ID_IA = ?',
    [campos.Nombre, campos.Descripcion, campos.Algoritmo, campos.Fecha_Creacion, campos.ID_Agencia, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM influencer_ia WHERE ID_IA = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };