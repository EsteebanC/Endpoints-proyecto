require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
// CORS: debe ir antes que cualquier ruta para que también cubra los preflight
// (OPTIONS) de todos los endpoints /api/*.

// Desarrollo: localhost, 127.0.0.1, [::1] y red local (para probar desde el móvil).
const esOrigenLocal = (origin) => {
  if (!origin) return true; // Postman, curl, health checks de Render
  return (
    /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(origin) ||
    /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin) ||
    /^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin) ||
    /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(:\d+)?$/i.test(origin)
  );
};

// Producción: cualquier despliegue de Vercel (incluye producción y previews,
// por ejemplo endpoints-proyecto-frontend.vercel.app o
// endpoints-proyecto-frontend-git-feature-smul-equipo.vercel.app).
const esOrigenVercel = (origin) =>
  Boolean(origin) && /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.vercel\.app$/i.test(origin);

// Dominios propios sin tocar el código. En Render:
// FRONTEND_URL=https://midominio.com,https://www.midominio.com
const origenesExtra = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const esOrigenPermitido = (origin) =>
  esOrigenLocal(origin) || esOrigenVercel(origin) || origenesExtra.includes(origin);

const corsOptions = {
  origin: (origin, callback) => {
    if (esOrigenPermitido(origin)) return callback(null, true);
    console.warn(`[CORS] Origen bloqueado: ${origin}`);
    return callback(null, false);
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
  ],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  optionsSuccessStatus: 204,
  maxAge: 86400, // cachea el preflight 24 h para no repetirlo en cada petición
};

app.use(cors(corsOptions));
app.use(express.json()); // Parsea el cuerpo de las solicitudes como JSON

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