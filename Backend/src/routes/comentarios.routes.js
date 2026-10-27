const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/comentarios.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas privadas (requieren token: comentar y dar like)
router.get('/', verifyToken, ctrl.getAll);
router.get('/:id', verifyToken, ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
