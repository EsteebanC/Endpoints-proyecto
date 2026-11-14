import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BellIcon,
  BoltIcon,
  GridIcon,
  HomeIcon,
  LogoutIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
} from './Icons'

const TOKENS_DEMO = 4280

const formatearNumero = (valor) => Number(valor || 0).toLocaleString('es-CO')

// Estructura compartida por el inicio (feed) y el dashboard: sidebar, topbar
// y avisos flotantes. La navegación y la sesión siguen viviendo en el
// AuthContext; este componente solo dibuja la interfaz.
export default function AppShell({ active = 'inicio', children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [menuAbierto, setMenuAbierto] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState('')

  // Cierra los menús del topbar al hacer clic fuera o presionar Escape.
  useEffect(() => {
    if (!menuAbierto) return undefined

    const cerrarFuera = (event) => {
      const objetivo = event.target
      if (objetivo instanceof Element && objetivo.closest('.app-topbar-actions')) {
        return
      }
      setMenuAbierto(null)
    }

    const cerrarConEsc = (event) => {
      if (event.key === 'Escape') setMenuAbierto(null)
    }

    document.addEventListener('mousedown', cerrarFuera)
    document.addEventListener('keydown', cerrarConEsc)

    return () => {
      document.removeEventListener('mousedown', cerrarFuera)
      document.removeEventListener('keydown', cerrarConEsc)
    }
  }, [menuAbierto])

  // El aviso flotante se oculta automáticamente.
  useEffect(() => {
    if (!aviso) return undefined
    const temporizador = setTimeout(() => setAviso(''), 2400)
    return () => clearTimeout(temporizador)
  }, [aviso])

  const datosPerfil = user || {}
  const inicialUsuario = (datosPerfil.Username || datosPerfil.Nombre || 'S')
    .trim()
    .charAt(0)
    .toUpperCase()

  const alternarMenu = (menu) =>
    setMenuAbierto((actual) => (actual === menu ? null : menu))

  const cerrarSesion = () => {
    logout()
    navigate('/')
  }

  const avisarProximamente = () => {
    setMenuAbierto(null)
    setAviso('La creación de contenido estará disponible pronto.')
  }

  const enviarBusqueda = (event) => {
    event.preventDefault()
    setAviso(
      busqueda.trim()
        ? 'La búsqueda global estará disponible pronto.'
        : 'Escribe un término para buscar.',
    )
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link to="/" className="app-brand" aria-label="Shortia, ir al inicio">
          <span className="app-brand-mark">S</span>
          <span className="app-brand-name">shortia</span>
          <span className="app-brand-dot" aria-hidden="true" />
        </Link>

        <nav className="app-nav" aria-label="Navegación principal">
          <Link
            to="/"
            className={`app-nav-item${active === 'inicio' ? ' active' : ''}`}
            aria-current={active === 'inicio' ? 'page' : undefined}
          >
            <HomeIcon size={19} />
            <span className="app-nav-label">Inicio</span>
          </Link>
          <Link
            to="/perfil"
            className={`app-nav-item${active === 'perfil' ? ' active' : ''}`}
            aria-current={active === 'perfil' ? 'page' : undefined}
          >
            <UserIcon size={19} />
            <span className="app-nav-label">Perfil</span>
          </Link>
        </nav>

        <div className="app-sidebar-footer">
          <div className="app-user-mini">
            <span className="app-avatar">{inicialUsuario}</span>
            <span className="app-user-mini-text">
              <span className="app-user-mini-name">
                {datosPerfil.Username || 'Mi cuenta'}
              </span>
              <span className="app-user-mini-mail">
                {datosPerfil.Email || 'Sesión activa'}
              </span>
            </span>
          </div>

          <Link
            to="/dashboard"
            className={`app-sidebar-dash${
              active === 'dashboard' ? ' active' : ''
            }`}
            aria-current={active === 'dashboard' ? 'page' : undefined}
          >
            <GridIcon size={18} />
            <span className="app-sidebar-dash-label">Dashboard</span>
          </Link>

          <button type="button" className="app-logout" onClick={cerrarSesion}>
            <LogoutIcon size={17} />
            <span className="app-logout-label">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <form className="app-search" role="search" onSubmit={enviarBusqueda}>
            <SearchIcon size={17} />
            <input
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Search prompts, creators..."
              aria-label="Buscar prompts y creadores"
            />
          </form>

          <div className="app-topbar-actions">
            <span className="app-token-badge">
              <BoltIcon size={15} />
              Tokens: {formatearNumero(TOKENS_DEMO)}
            </span>

            <div className="app-notif-wrap">
              <button
                type="button"
                className="app-icon-btn"
                aria-label="Notificaciones"
                aria-expanded={menuAbierto === 'notificaciones'}
                onClick={() => alternarMenu('notificaciones')}
              >
                <BellIcon size={18} />
                <span className="app-icon-dot" aria-hidden="true" />
              </button>

              {menuAbierto === 'notificaciones' && (
                <div className="app-popover" role="dialog" aria-label="Notificaciones">
                  <h3>Notificaciones</h3>
                  <p>
                    No tienes notificaciones nuevas. Aquí verás la actividad de
                    tu cuenta.
                  </p>
                </div>
              )}
            </div>

            <div className="app-create-wrap">
              <button
                type="button"
                className="app-cta"
                aria-label="Generate / Create"
                aria-expanded={menuAbierto === 'crear'}
                onClick={() => alternarMenu('crear')}
              >
                <PlusIcon size={16} />
                <span className="app-cta-label">Generate / Create</span>
              </button>

              {menuAbierto === 'crear' && (
                <div className="app-popover" role="dialog" aria-label="Crear contenido">
                  <h3>Crear contenido</h3>
                  <p>
                    Elige cómo quieres empezar. La publicación se conectará a la
                    API cuando el endpoint esté disponible.
                  </p>
                  <div className="app-popover-actions">
                    <button
                      type="button"
                      className="app-popover-action"
                      onClick={avisarProximamente}
                    >
                      <PlayIcon size={15} />
                      Subir video
                    </button>
                    <button
                      type="button"
                      className="app-popover-action"
                      onClick={avisarProximamente}
                    >
                      <SparklesIcon size={15} />
                      Nueva publicación
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </div>

      {aviso && (
        <div className="app-toast" role="status" aria-live="polite">
          {aviso}
        </div>
      )}
    </div>
  )
}
