const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tokens.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas públicas (tienda de tokens visible sin login)
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Rutas privadas (requieren token: comprar, editar y borrar tokens)
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
