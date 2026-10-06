require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (público)
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, status: 'OK', timestamp: new Date() });
});

// Rutas
const authRouter = require('./routes/auth.routes');
const agenciasRouter = require('./routes/agencias.routes');
const transaccionesRouter = require('./routes/transacciones.routes');
const medios_pagoRouter = require('./routes/medios_pago.routes');
const seguidoresRouter = require('./routes/seguidores.routes');
const contratosRouter = require('./routes/contratos.routes');
const publicacionesRouter = require('./routes/publicaciones.routes');
const multimediaRouter = require('./routes/multimedia.routes');
const tokensRouter = require('./routes/tokens.routes');
const influencer_iaRouter = require('./routes/influencer_ia.routes');
const comentariosRouter = require('./routes/comentarios.routes');
const marcasRouter = require('./routes/marcas.routes');
const notificacionesRouter = require('./routes/notificaciones.routes');
const personasRouter = require('./routes/personas.routes');
const nacionalidadRouter = require('./routes/nacionalidad.routes');
const usuariosRouter = require('./routes/usuarios.routes');
const redes_socialesRouter = require('./routes/redes_sociales.routes');
const reportesRouter = require('./routes/reportes.routes');
const estadisticasRouter = require('./routes/estadisticas.routes');
const categoriaRouter = require('./routes/categoria.routes');

// Autenticación (login y register son públicas, /me es privada)
app.use('/api/auth', authRouter);

// Rutas de la API (cada router define qué rutas son públicas y cuáles privadas)
app.use('/api/agencias', agenciasRouter);
app.use('/api/transacciones', transaccionesRouter);
app.use('/api/medios_pago', medios_pagoRouter);
app.use('/api/seguidores', seguidoresRouter);
app.use('/api/contratos', contratosRouter);
app.use('/api/publicaciones', publicacionesRouter);
app.use('/api/multimedia', multimediaRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/influencer_ia', influencer_iaRouter);
app.use('/api/comentarios', comentariosRouter);
app.use('/api/marcas', marcasRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/personas', personasRouter);
app.use('/api/nacionalidad', nacionalidadRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/redes_sociales', redes_socialesRouter);
app.use('/api/reportes', reportesRouter);
app.use('/api/estadisticas', estadisticasRouter);
app.use('/api/categoria', categoriaRouter);

// Rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ ok: false, msg: `No se puede encontrar ${req.originalUrl} en este servidor!` });
});

// Manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ ok: false, msg: err.message || 'Error interno del servidor' });
});

module.exports = app;