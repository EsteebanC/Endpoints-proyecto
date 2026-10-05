const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/jwt.config');
const model = require('../models/auth.model');

// Genera el token firmado con el secret del .env
const generarToken = (usuario) =>
  jwt.sign(
    {
      ID_Usuario: usuario.ID_Usuario,
      ID_Persona: usuario.ID_Persona ?? null,
      Email: usuario.Email,
      Username: usuario.Username,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

// POST /api/auth/register  (pública)
const register = async (req, res) => {
  try {
    const { Username, Email, Password, Nombre, Edad, Genero, Pais } = req.body;

    if (!Username || !Email || !Password) {
      return res.status(400).json({ ok: false, msg: 'Username, Email y Password son obligatorios' });
    }

    const existente = await model.findByEmail(Email);
    if (existente) {
      return res.status(409).json({ ok: false, msg: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const usuario = await model.create({
      Username,
      Email,
      Contrasena: hashedPassword,
      Nombre: Nombre ?? Username,
      Edad,
      Genero,
      Pais,
    });

    // Se entrega el token para que quede autenticado tras registrarse
    res.status(201).json({
      ok: true,
      msg: 'Usuario registrado exitosamente',
      token: generarToken(usuario),
      data: usuario,
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/auth/login  (pública)
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ ok: false, msg: 'Email y Password son obligatorios' });
    }

    const usuario = await model.findByEmail(Email);

    if (!usuario || !(await bcrypt.compare(Password, usuario.Contrasena))) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    res.json({
      ok: true,
      token: generarToken(usuario),
      data: {
        ID_Usuario: usuario.ID_Usuario,
        ID_Persona: usuario.ID_Persona,
        Email: usuario.Email,
        Username: usuario.Username,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/auth/me  (privada: requiere token)
const me = async (req, res) => {
  try {
    const perfil = await model.getPerfil(req.user.ID_Usuario);
    if (!perfil) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    res.json({ ok: true, data: perfil });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { register, login, me };