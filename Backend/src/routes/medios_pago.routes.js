const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/medios_pago.controller');
const verifyToken = require('../middleware/auth.middleware');

// Todas las rutas requieren token
router.get('/', verifyToken, ctrl.getAll);
router.get('/:id', verifyToken, ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
