const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/publicaciones.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas públicas (feed visible sin login)
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Rutas privadas (requieren token: publicar, editar y borrar)
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
