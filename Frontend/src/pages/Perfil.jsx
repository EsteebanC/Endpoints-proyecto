import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

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

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">Shortia</Link>
          <nav className="nav">
            <Link to="/">Inicio</Link>
            <Link to="/perfil">Mi perfil</Link>
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
          <h1 style={{ fontSize: '22px', marginBottom: '18px' }}>Mi perfil</h1>

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
              <div className="value">{user.Edad || 'No registrada'}</div>
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
        </div>
      </main>
    </div>
  )
}
