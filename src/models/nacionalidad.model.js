const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM nacionalidad ORDER BY ID_Nacionalidad DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM nacionalidad WHERE ID_Nacionalidad = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Persona, ID_Agencia, Pais, Ciudad, Direccion, Codigo_Postal }) => {
  const [result] = await pool.query(
    'INSERT INTO nacionalidad (ID_Persona, ID_Agencia, Pais, Ciudad, Direccion, Codigo_Postal) VALUES (?, ?, ?, ?, ?, ?)',
    [ID_Persona, ID_Agencia, Pais, Ciudad, Direccion ?? null, Codigo_Postal ?? null]
  );
  return { ID_Nacionalidad: result.insertId, ID_Persona, ID_Agencia, Pais, Ciudad, Direccion, Codigo_Postal };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE nacionalidad SET ID_Persona = ?, ID_Agencia = ?, Pais = ?, Ciudad = ?, Direccion = ?, Codigo_Postal = ? WHERE ID_Nacionalidad = ?',
    [campos.ID_Persona, campos.ID_Agencia, campos.Pais, campos.Ciudad, campos.Direccion, campos.Codigo_Postal, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM nacionalidad WHERE ID_Nacionalidad = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };