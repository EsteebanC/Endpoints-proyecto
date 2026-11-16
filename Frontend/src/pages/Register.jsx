import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PaisSelect from '../components/PaisSelect'

const FORM_INICIAL = {
  Username: '',
  Email: '',
  Password: '',
  Nombre: '',
  Edad: '',
  Genero: '',
  Pais: '',
}

export default function Register() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate() // useNavigate redirige a la página de perfil 
  // después de registrarse

  const handleChange = (e) => { // handleChange actualiza el estado del formulario cuando el
  //  usuario escribe en los inputs
    setForm({ ...form, [e.target.name]: e.target.value }) // los valores de los inputs se guardan en 
    // el estado del formulario, usando el nombre del input como clave y el valor del input como valor
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/login', {
        state: { email: form.Email, registered: true },
        replace: true,
      })
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
        <p className="auth-subtitle">Completa tus datos para entrar a Shortia.</p>

        {error && <div className="form-message error">{error}</div>}

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

          <div className="field">
            <label htmlFor="Nombre">Nombre completo</label>
            <input
              id="Nombre"
              name="Nombre"
              required
              value={form.Nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="field">
            <label htmlFor="Edad">Edad</label>
            <input
              id="Edad"
              name="Edad"
              type="number"
              required
              min="1"
              max="120"
              value={form.Edad}
              onChange={handleChange}
              placeholder="Ej: 22"
            />
          </div>

          <div className="field">
            <label htmlFor="Genero">Género</label>
            <select
              id="Genero"
              name="Genero"
              required
              value={form.Genero}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="Pais">País</label>
            <PaisSelect value={form.Pais} onChange={handleChange} />
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
