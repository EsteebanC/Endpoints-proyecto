const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios ORDER BY ID_Usuario DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE ID_Usuario = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ ID_Persona, Email, Contrasena, Fecha_Registro, Username }) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (ID_Persona, Email, Contrasena, Fecha_Registro, Username) VALUES (?, ?, ?, ?, ?)',
    [ID_Persona, Email, Contrasena, Fecha_Registro ?? new Date(), Username]
  );
  return { ID_Usuario: result.insertId, ID_Persona, Email, Contrasena, Fecha_Registro, Username };
};

const update = async (id, campos) => {
  const [result] = await pool.query(
    'UPDATE usuarios SET ID_Persona = ?, Email = ?, Contrasena = ?, Fecha_Registro = ?, Username = ? WHERE ID_Usuario = ?',
    [campos.ID_Persona, campos.Email, campos.Contrasena, campos.Fecha_Registro, campos.Username, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM usuarios WHERE ID_Usuario = ?', [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };