const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM personas ORDER BY ID_Persona DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM personas WHERE ID_Persona = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ Edad, Genero, Pais, Nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO personas (Edad, Genero, Pais, Nombre) VALUES (?, ?, ?, ?)',
    [Edad ?? null, Genero ?? null, Pais, Nombre]
  );
  return { ID_Persona: result.insertId, Edad, Genero, Pais, Nombre };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE personas SET Edad = ?, Genero = ?, Pais = ?, Nombre = ? WHERE ID_Persona = ?',
    [campos.Edad, campos.Genero, campos.Pais, campos.Nombre, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM personas WHERE ID_Persona = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };