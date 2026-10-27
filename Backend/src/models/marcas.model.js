const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM marcas ORDER BY ID_Marca DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM marcas WHERE ID_Marca = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Contratos, Nombre, Producto, Requisitos }) => {
  const [result] = await pool.query(
    'INSERT INTO marcas (ID_Contratos, Nombre, Producto, Requisitos) VALUES (?, ?, ?, ?)',
    [ID_Contratos, Nombre, Producto, Requisitos ?? null]
  );
  return { ID_Marca: result.insertId, ID_Contratos, Nombre, Producto, Requisitos };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE marcas SET ID_Contratos = ?, Nombre = ?, Producto = ?, Requisitos = ? WHERE ID_Marca = ?',
    [campos.ID_Contratos, campos.Nombre, campos.Producto, campos.Requisitos, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM marcas WHERE ID_Marca = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };