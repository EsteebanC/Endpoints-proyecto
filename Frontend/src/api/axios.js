import axios from 'axios'

const api = axios.create({
  // En producción usa /api (mismo dominio, Vercel lo reenvía al backend) para
  // evitar CORS. En desarrollo usa el backend local.
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    : '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const esAuth = err.config?.url?.includes('/auth/')
    if (err.response?.status === 401 && !esAuth) {
      localStorage.removeItem('token')
      window.location.href = '/login' // redirige a la página de login si el 
      // token es inválido o ha expirado
    }
    return Promise.reject(err) // promise para que el error se 
    // propague y pueda ser manejado en el componente que hizo la petición
  },
)

export default api // exportamos la instancia de axios para usarla en otros archivos
