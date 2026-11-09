const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM multimedia ORDER BY ID_Multimedia DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM multimedia WHERE ID_Multimedia = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Categoria, ID_IA, Tamaño, Duracion, Tipo, URL, Formato }) => {
  const [result] = await pool.query(
    'INSERT INTO multimedia (ID_Categoria, ID_IA, Tamaño, Duracion, Tipo, URL, Formato) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ID_Categoria, ID_IA, Tamaño ?? 0, Duracion ?? 0, Tipo, URL, Formato ?? null]
  );
  return { ID_Multimedia: result.insertId, ID_Categoria, ID_IA, Tamaño, Duracion, Tipo, URL, Formato };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE multimedia SET ID_Categoria = ?, ID_IA = ?, Tamaño = ?, Duracion = ?, Tipo = ?, URL = ?, Formato = ? WHERE ID_Multimedia = ?',
    [campos.ID_Categoria, campos.ID_IA, campos.Tamaño, campos.Duracion, campos.Tipo, campos.URL, campos.Formato, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM multimedia WHERE ID_Multimedia = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };