const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE Email = ?', [email]
  );
  return rows[0]; // undefined si no existe
};

// Perfil sin datos sensibles (nunca devolver Contrasena)
const getPerfil = async (id) => {
  const [rows] = await pool.query(
    `SELECT u.ID_Usuario, u.ID_Persona, u.Email, u.Username, u.Fecha_Registro,
            p.Nombre, p.Edad, p.Genero, p.Pais
       FROM usuarios u
       LEFT JOIN personas p ON p.ID_Persona = u.ID_Persona
      WHERE u.ID_Usuario = ?`,
    [id]
  );
  return rows[0];
};

// Crea persona + usuario dentro de una transacción
const create = async ({ Username, Email, Contrasena, Nombre, Edad, Genero, Pais }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [persona] = await conn.query(
      'INSERT INTO personas (Nombre, Edad, Genero, Pais) VALUES (?, ?, ?, ?)',
      [Nombre, Edad ?? null, Genero ?? null, Pais ?? null]
    );

    const [usuario] = await conn.query(
      'INSERT INTO usuarios (ID_Persona, Email, Contrasena, Fecha_Registro, Username) VALUES (?, ?, ?, ?, ?)',
      [persona.insertId, Email, Contrasena, new Date(), Username]
    );

    await conn.commit();

    return { ID_Usuario: usuario.insertId, ID_Persona: persona.insertId, Username, Email };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = { findByEmail, getPerfil, create };