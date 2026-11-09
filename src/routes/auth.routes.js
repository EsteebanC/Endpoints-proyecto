const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas públicas (no requieren token)
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

// Rutas privadas (requieren token)
router.get('/me', verifyToken, ctrl.me); // lo ponemos privado para que solo el usuario autenticado pueda ver su perfil

module.exports = router;