import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import PaisSelect from '../components/PaisSelect'
import { useAuth } from '../context/AuthContext'

const FORM_INICIAL = {
  Username: '',
  Email: '',
  Nombre: '',
  Edad: '',
  Genero: '',
  Pais: '',
}

const GENEROS = ['Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo']

export default function Perfil() {
  const { user, setUser, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(FORM_INICIAL)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading || !user) {
    return (
      <div className="auth-page">
        <p>Cargando perfil...</p>
      </div>
    )
  }

  const iniciarEdicion = () => {
    setForm({
      Username: user.Username || '',
      Email: user.Email || '',
      Nombre: user.Nombre || '',
      Edad: user.Edad ?? '',
      Genero: user.Genero || '',
      Pais: user.Pais || '',
    })
    setError('')
    setSuccess('')
    setEditando(true)
  }

  const cancelarEdicion = () => {
    setEditando(false)
    setError('')
    setForm(FORM_INICIAL)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setGuardando(true)

    try {
      const cambiosCuenta =
        form.Username !== (user.Username || '') ||
        form.Email !== (user.Email || '')

      // El endpoint PUT /usuarios/:id exige todos los campos, incluida la
      // contraseña. Solo se consulta cuando cambia el usuario o el correo y
      // se reenvía el hash existente sin mostrarlo ni modificarlo.
      let usuarioActual = null
      if (cambiosCuenta) {
        const res = await api.get(`/usuarios/${user.ID_Usuario}`)
        usuarioActual = res.data.data

        if (!usuarioActual?.Contrasena) {
          throw new Error(
            'No se pudo validar la cuenta para actualizar el usuario o el correo.',
          )
        }
      }

      const idPersona = usuarioActual?.ID_Persona ?? user.ID_Persona
      if (!idPersona) {
        throw new Error('No se encontró la información personal del usuario.')
      }

      if (cambiosCuenta) {
        await api.put(`/usuarios/${user.ID_Usuario}`, {
          ID_Persona: idPersona,
          Email: form.Email,
          Contrasena: usuarioActual.Contrasena,
          Fecha_Registro: usuarioActual.Fecha_Registro ?? user.Fecha_Registro,
          Username: form.Username,
        })
      }

      await api.put(`/personas/${idPersona}`, {
        Nombre: form.Nombre,
        Edad: form.Edad === '' ? null : Number(form.Edad),
        Genero: form.Genero,
        Pais: form.Pais,
      })

      setUser({
        ...user,
        Username: form.Username,
        Email: form.Email,
        Nombre: form.Nombre,
        Edad: form.Edad === '' ? null : Number(form.Edad),
        Genero: form.Genero,
        Pais: form.Pais,
      })
      setEditando(false)
      setSuccess('Perfil actualizado correctamente.')
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          err.message ||
          'No se pudieron guardar los cambios.',
      )
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">Shortia</Link>
          <nav className="nav">
            <Link to="/">Inicio</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/perfil" className="active">Mi perfil</Link>
            <button
              type="button"
              className="nav-cta"
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>

      <main className="container perfil-wrap">
        <div className="panel">
          <div className="perfil-head">
            <h1>Mi perfil</h1>
            {!editando && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={iniciarEdicion}
              >
                Editar perfil
              </button>
            )}
          </div>

          {error && <div className="form-message error">{error}</div>}
          {success && <div className="form-message success">{success}</div>}

          {editando ? (
            <form className="perfil-form" onSubmit={handleSubmit}>
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
                  {GENEROS.map((genero) => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="Pais">País</label>
                <PaisSelect
                  value={form.Pais}
                  onChange={handleChange}
                  incluirActual
                />
              </div>

              <div className="perfil-form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={guardando}
                >
                  {guardando ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelarEdicion}
                  disabled={guardando}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="perfil-grid">
              <div>
                <div className="label">Nombre de usuario</div>
                <div className="value">{user.Username}</div>
              </div>
              <div>
                <div className="label">Correo electrónico</div>
                <div className="value">{user.Email}</div>
              </div>
              <div>
                <div className="label">Nombre</div>
                <div className="value">{user.Nombre || 'No registrado'}</div>
              </div>
              <div>
                <div className="label">Edad</div>
                <div className="value">{user.Edad ?? 'No registrada'}</div>
              </div>
              <div>
                <div className="label">Género</div>
                <div className="value">{user.Genero || 'No registrado'}</div>
              </div>
              <div>
                <div className="label">País</div>
                <div className="value">{user.Pais || 'No registrado'}</div>
              </div>
              <div>
                <div className="label">ID de usuario</div>
                <div className="value">{user.ID_Usuario}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
