import { useEffect, useState } from 'react'
// useEffect para ejecutar código al montar el componente y
// useState para guardar el estado de los datos del dashboard.
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import {
  BellIcon,
  BookmarkIcon,
  BoltIcon,
  CommentIcon,
  GridIcon,
  HeartIcon,
  LogoutIcon,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  SparklesIcon,
  UserIcon,
  VerifiedIcon,
  VolumeIcon,
  VolumeXIcon,
} from '../components/Icons'

// Formatea un número a formato de moneda colombiana
const formatearNumero = (valor) => Number(valor || 0).toLocaleString('es-CO')

// Formato compacto para los contadores del feed (1.2K, 3.4M)
const formatearCompacto = (valor) => {
  const numero = Number(valor || 0)
  if (numero >= 1000000) return `${(numero / 1000000).toFixed(1)}M`
  if (numero >= 1000) return `${(numero / 1000).toFixed(1)}K`
  return String(numero)
}

const formatearFecha = (valor) => {
  if (!valor) return '—'
  return String(valor).slice(0, 10)
}

// Resalta los hashtags dentro de la descripción del video.
const renderizarHashtags = (texto) =>
  String(texto)
    .split(/(#[\wáéíóúüñÁÉÍÓÚÜÑ]+)/g)
    .filter(Boolean)
    .map((parte, indice) =>
      parte.startsWith('#') ? (
        <span key={`tag-${indice}`} className="feed-tag">
          {parte}
        </span>
      ) : (
        <span key={`texto-${indice}`}>{parte}</span>
      ),
    )

const FILTROS = ['For You', 'Following', 'Trending']

// Saldo de tokens de demostración. El backend ya tiene la tabla `tokens`,
// pero aún no está conectada al dashboard; se deja como dato de interfaz.
const TOKENS_DEMO = 4280

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [perfil, setPerfil] = useState(null)
  const [publicaciones, setPublicaciones] = useState([])
  const [contratos, setContratos] = useState([])
  const [seguidores, setSeguidores] = useState([])
  const [estadisticas, setEstadisticas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Estado local solo para la interfaz del feed (no altera la API).
  const [filtro, setFiltro] = useState(FILTROS[0])
  const [meGusta, setMeGusta] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [reproduciendo, setReproduciendo] = useState(false)
  const [silenciado, setSilenciado] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [
          perfilRes,
          publicacionesRes,
          contratosRes,
          seguidoresRes,
          estadisticasRes,
        ] = await Promise.all([
          api.get('/auth/me'),
          api.get('/publicaciones'),
          api.get('/contratos'),
          api.get('/seguidores'),
          api.get('/estadisticas'),
        ])

        setPerfil(perfilRes.data.data)
        setPublicaciones(publicacionesRes.data.data || [])
        setContratos(contratosRes.data.data || [])
        setSeguidores(seguidoresRes.data.data || [])
        setEstadisticas(estadisticasRes.data.data || [])
      } catch (err) {
        setError(
          err.response?.data?.msg || 'No se pudieron cargar los datos del panel.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

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

  // Datos reales de la cuenta. Si el perfil no cargó, se usa el usuario
  // que ya está en el contexto de autenticación.
  const datosPerfil = perfil || user

  const estadistica = estadisticas[0]
  const publicacionPrincipal = publicaciones[0]

  const creador = datosPerfil?.Username || 'shortia'
  const inicialUsuario = (datosPerfil?.Username || datosPerfil?.Nombre || 'S')
    .trim()
    .charAt(0)
    .toUpperCase()

  const descripcion =
    publicacionPrincipal?.Descripcion?.trim() ||
    'Explorando nuevas ideas con inteligencia artificial. #Shortia #AIInfluencer'

  const likes =
    Number(publicacionPrincipal?.Numero_likes ?? estadistica?.Total_Likes ?? 0) +
    (meGusta ? 1 : 0)
  const comentarios =
    publicacionPrincipal?.Numero_comentarios ??
    estadistica?.Total_Comentarios ??
    0
  const compartidos = estadistica?.Numero_Compartidos ?? 0
  const guardados = guardado ? 1 : 0

  const alternarMenu = (menu) =>
    setMenuAbierto((actual) => (actual === menu ? null : menu))

  const cerrarSesion = () => {
    logout()
    navigate('/')
  }

  const compartir = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setAviso('Enlace copiado al portapapeles.')
    } catch {
      setAviso('No se pudo copiar el enlace.')
    }
  }

  const irAActividad = () => {
    document
      .getElementById('actividad')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <Link to="/dashboard" className="app-brand" aria-label="Shortia, ir al dashboard">
          <span className="app-brand-mark">S</span>
          <span className="app-brand-name">shortia</span>
          <span className="app-brand-dot" aria-hidden="true" />
        </Link>

        <nav className="app-nav" aria-label="Navegación principal">
          <Link
            to="/dashboard"
            className="app-nav-item active"
            aria-current="page"
          >
            <GridIcon size={19} />
            <span className="app-nav-label">Dashboard</span>
          </Link>
          <Link to="/perfil" className="app-nav-item">
            <UserIcon size={19} />
            <span className="app-nav-label">Perfil</span>
          </Link>
        </nav>

        <div className="app-sidebar-footer">
          <div className="app-user-mini">
            <span className="app-avatar">{inicialUsuario}</span>
            <span className="app-user-mini-text">
              <span className="app-user-mini-name">
                {datosPerfil?.Username || 'Mi cuenta'}
              </span>
              <span className="app-user-mini-mail">
                {datosPerfil?.Email || 'Sesión activa'}
              </span>
            </span>
          </div>
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

        <main className="app-canvas">
          {error && <div className="form-message error">{error}</div>}

          <div className="app-filters" role="group" aria-label="Filtros del feed">
            {FILTROS.map((nombre) => {
              const activo = filtro === nombre
              return (
                <button
                  key={nombre}
                  type="button"
                  className={`app-filter${activo ? ' active' : ''}`}
                  aria-pressed={activo}
                  onClick={() => setFiltro(nombre)}
                >
                  {activo && <SparklesIcon size={14} />}
                  {nombre}
                </button>
              )
            })}
          </div>

          <section className="feed" aria-label={`Feed ${filtro}`}>
            <article className="feed-card">
              <div className="feed-media">
                <div className="feed-media-top">
                  <span className="feed-ia-tag">{filtro} · Shortia AI</span>
                  <button
                    type="button"
                    className="feed-sound"
                    aria-label={silenciado ? 'Activar audio' : 'Silenciar audio'}
                    aria-pressed={silenciado}
                    onClick={() => {
                      setSilenciado((valor) => !valor)
                      setAviso(
                        silenciado ? 'Audio activado.' : 'Audio silenciado.',
                      )
                    }}
                  >
                    {silenciado ? (
                      <VolumeXIcon size={18} />
                    ) : (
                      <VolumeIcon size={18} />
                    )}
                  </button>
                </div>

                <div className="feed-center">
                  <button
                    type="button"
                    className={`feed-play${reproduciendo ? ' playing' : ''}`}
                    aria-label={
                      reproduciendo ? 'Pausar vista previa' : 'Reproducir vista previa'
                    }
                    onClick={() => setReproduciendo((valor) => !valor)}
                  >
                    {reproduciendo ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
                  </button>
                  <span className="feed-badge">
                    {reproduciendo ? 'Reproduciendo' : 'Vista previa IA'}
                  </span>
                </div>

                <div className="feed-overlay">
                  <span className="feed-creator">
                    <span className="feed-creator-name">@{creador}</span>
                    <VerifiedIcon size={15} />
                  </span>
                  <p className="feed-caption">{renderizarHashtags(descripcion)}</p>
                  <span className="feed-audio">
                    <MusicIcon size={13} />
                    <span>Audio original · {creador}</span>
                  </span>
                </div>

                <div className="feed-progress" aria-hidden="true">
                  <span style={{ width: reproduciendo ? '68%' : '38%' }} />
                </div>
              </div>
            </article>

            <aside className="feed-actions" aria-label="Acciones de la publicación">
              <div className="feed-avatar-wrap">
                <span className="feed-avatar">{inicialUsuario}</span>
                <button
                  type="button"
                  className="feed-follow"
                  aria-label={`Seguir a ${creador}`}
                  onClick={() => setAviso(`Ahora sigues a @${creador}.`)}
                >
                  <PlusIcon size={12} />
                </button>
              </div>

              <button
                type="button"
                className={`feed-action${meGusta ? ' active' : ''}`}
                aria-pressed={meGusta}
                aria-label="Me gusta"
                onClick={() => setMeGusta((valor) => !valor)}
              >
                <span className="feed-action-icon">
                  <HeartIcon size={22} />
                </span>
                <span className="feed-action-count">
                  {formatearCompacto(likes)}
                </span>
              </button>

              <button
                type="button"
                className="feed-action"
                aria-label="Ver comentarios"
                onClick={irAActividad}
              >
                <span className="feed-action-icon">
                  <CommentIcon size={22} />
                </span>
                <span className="feed-action-count">
                  {formatearCompacto(comentarios)}
                </span>
              </button>

              <button
                type="button"
                className="feed-action"
                aria-label="Compartir"
                onClick={compartir}
              >
                <span className="feed-action-icon">
                  <ShareIcon size={22} />
                </span>
                <span className="feed-action-count">
                  {formatearCompacto(compartidos)}
                </span>
              </button>

              <button
                type="button"
                className={`feed-action${guardado ? ' active' : ''}`}
                aria-pressed={guardado}
                aria-label="Guardar publicación"
                onClick={() => setGuardado((valor) => !valor)}
              >
                <span className="feed-action-icon">
                  <BookmarkIcon size={22} />
                </span>
                <span className="feed-action-count">
                  {formatearCompacto(guardados)}
                </span>
              </button>

              <button
                type="button"
                className="feed-disc"
                aria-label={`Audio de ${creador}`}
                onClick={() => setAviso('Reproduciendo el audio original.')}
              >
                <MusicIcon size={16} />
              </button>
            </aside>
          </section>

          <section className="app-mini-stats" aria-label="Resumen rápido">
            <article className="app-mini-stat">
              <span>Publicaciones</span>
              <strong>
                {cargando ? '—' : formatearNumero(publicaciones.length)}
              </strong>
            </article>
            <article className="app-mini-stat">
              <span>Contratos</span>
              <strong>{cargando ? '—' : formatearNumero(contratos.length)}</strong>
            </article>
            <article className="app-mini-stat">
              <span>Seguidores</span>
              <strong>{cargando ? '—' : formatearNumero(seguidores.length)}</strong>
            </article>
          </section>

          <section className="app-details" id="actividad">
            <div className="app-section-head">
              <div>
                <h2>Tu actividad</h2>
                <p>Resumen de tu cuenta y de la actividad de Shortia.</p>
              </div>
              <Link to="/perfil" className="btn btn-secondary">
                Mi perfil
              </Link>
            </div>

            {cargando ? (
              <div className="panel">
                <p>Cargando datos...</p>
              </div>
            ) : (
              <>
                <div className="dash-columns">
                  <section className="panel">
                    <h2>Mi perfil</h2>
                    <div className="perfil-grid">
                      <div>
                        <div className="label">Usuario</div>
                        <div className="value">{datosPerfil?.Username || '—'}</div>
                      </div>
                      <div>
                        <div className="label">Correo electrónico</div>
                        <div className="value">{datosPerfil?.Email || '—'}</div>
                      </div>
                      <div>
                        <div className="label">Nombre</div>
                        <div className="value">{datosPerfil?.Nombre || '—'}</div>
                      </div>
                      <div>
                        <div className="label">Edad</div>
                        <div className="value">{datosPerfil?.Edad ?? '—'}</div>
                      </div>
                      <div>
                        <div className="label">Género</div>
                        <div className="value">{datosPerfil?.Genero || '—'}</div>
                      </div>
                      <div>
                        <div className="label">País</div>
                        <div className="value">{datosPerfil?.Pais || '—'}</div>
                      </div>
                    </div>
                  </section>

                  <section className="panel">
                    <h2>Estadísticas</h2>
                    {estadistica ? (
                      <div className="perfil-grid">
                        <div>
                          <div className="label">Total de likes</div>
                          <div className="value">
                            {formatearNumero(estadistica.Total_Likes)}
                          </div>
                        </div>
                        <div>
                          <div className="label">Total de comentarios</div>
                          <div className="value">
                            {formatearNumero(estadistica.Total_Comentarios)}
                          </div>
                        </div>
                        <div>
                          <div className="label">Total de publicaciones</div>
                          <div className="value">
                            {formatearNumero(estadistica.Total_Publicaciones)}
                          </div>
                        </div>
                        <div>
                          <div className="label">Seguidores</div>
                          <div className="value">
                            {formatearNumero(estadistica.Numero_Seguidores)}
                          </div>
                        </div>
                        <div>
                          <div className="label">Compartidos</div>
                          <div className="value">
                            {formatearNumero(estadistica.Numero_Compartidos)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="dash-empty">No hay estadísticas registradas.</p>
                    )}
                  </section>
                </div>

                <section className="panel">
                  <h2>Publicaciones recientes</h2>
                  {publicaciones.length === 0 ? (
                    <p className="dash-empty">No hay publicaciones registradas.</p>
                  ) : (
                    <div className="tabla-wrap">
                      <table className="tabla">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th className="num">Likes</th>
                            <th className="num">Comentarios</th>
                            <th>Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {publicaciones.slice(0, 5).map((publicacion) => (
                            <tr key={publicacion.ID_Publicacion}>
                              <td>{publicacion.ID_Publicacion}</td>
                              <td className="desc">
                                {publicacion.Descripcion || '—'}
                              </td>
                              <td>{publicacion.Tipo_publicacion || '—'}</td>
                              <td className="num">
                                {formatearNumero(publicacion.Numero_likes)}
                              </td>
                              <td className="num">
                                {formatearNumero(publicacion.Numero_comentarios)}
                              </td>
                              <td>
                                {formatearFecha(publicacion.Fecha_Publicacion)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>

                <div className="dash-columns">
                  <section className="panel">
                    <h2>Contratos</h2>
                    {contratos.length === 0 ? (
                      <p className="dash-empty">No hay contratos registrados.</p>
                    ) : (
                      <div className="tabla-wrap">
                        <table className="tabla">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Condiciones</th>
                              <th className="num">Presupuesto</th>
                              <th>Inicio</th>
                              <th>Fin</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contratos.slice(0, 5).map((contrato) => (
                              <tr key={contrato.ID_Contratos}>
                                <td>{contrato.ID_Contratos}</td>
                                <td className="desc">
                                  {contrato.Condiciones || '—'}
                                </td>
                                <td className="num">
                                  $ {formatearNumero(contrato.Presupuesto)}
                                </td>
                                <td>{formatearFecha(contrato.Fecha_Inicio)}</td>
                                <td>{formatearFecha(contrato.Fecha_Fin)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>

                  <section className="panel">
                    <h2>Seguidores</h2>
                    {seguidores.length === 0 ? (
                      <p className="dash-empty">No hay seguidores registrados.</p>
                    ) : (
                      <div className="tabla-wrap">
                        <table className="tabla">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Correo</th>
                              <th>Teléfono</th>
                              <th>ID IA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {seguidores.slice(0, 5).map((seguidor) => (
                              <tr key={seguidor.ID_Seguidor}>
                                <td>{seguidor.ID_Seguidor}</td>
                                <td>{seguidor.Correo || '—'}</td>
                                <td>{seguidor.Telefono || '—'}</td>
                                <td>{seguidor.ID_IA ?? '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                </div>
              </>
            )}
          </section>
        </main>
      </div>

      {aviso && (
        <div className="app-toast" role="status" aria-live="polite">
          {aviso}
        </div>
      )}
    </div>
  )
}
