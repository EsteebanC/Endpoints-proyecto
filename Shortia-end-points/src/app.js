const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
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

module.exports = app;
