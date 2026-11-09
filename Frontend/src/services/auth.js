import api from '../api/axios'

export const registrar = (datos) =>
  api.post('/auth/register', datos).then((r) => r.data)

export const iniciarSesion = (email, password) =>
  api.post('/auth/login', { Email: email, Password: password }).then((r) => r.data)

export const obtenerPerfil = () => api.get('/auth/me').then((r) => r.data.data)
