import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    Username: '',
    Email: '',
    Password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await register(form)
      setSuccess('Cuenta creada correctamente. Redirigiendo...')
      setTimeout(() => navigate('/perfil'), 1200)
    } catch (err) {
      setError(err.response?.data?.msg || 'No se pudo crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">Regístrate para entrar a Shortia.</p>

        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="Username">Nombre de usuario</label>
            <input
              id="Username"
              name="Username"
              required
              value={form.Username}
              onChange={handleChange}
              placeholder="usuario123"
            />
          </div>

          <div className="field">
            <label htmlFor="Email">Correo electrónico</label>
            <input
              id="Email"
              name="Email"
              type="email"
              required
              value={form.Email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="field">
            <label htmlFor="Password">Contraseña</label>
            <input
              id="Password"
              name="Password"
              type="password"
              required
              value={form.Password}
              onChange={handleChange}
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
        <p className="auth-footer">
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    </div>
  )
}
