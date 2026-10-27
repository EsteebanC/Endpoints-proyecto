const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM productos ORDER BY ID_Producto DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE ID_Producto = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Marca, Nombre, Descripcion, Precio }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (ID_Marca, Nombre, Descripcion, Precio) VALUES (?, ?, ?, ?)',
    [ID_Marca, Nombre, Descripcion ?? null, Precio ?? 0]
  );
  return { ID_Producto: result.insertId, ID_Marca, Nombre, Descripcion, Precio };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE productos SET ID_Marca = ?, Nombre = ?, Descripcion = ?, Precio = ? WHERE ID_Producto = ?',
    [campos.ID_Marca, campos.Nombre, campos.Descripcion, campos.Precio, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM productos WHERE ID_Producto = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };