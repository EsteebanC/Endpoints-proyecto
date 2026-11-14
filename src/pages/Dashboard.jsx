import { useEffect, useState } from 'react'
// useEffect para ejecutar código al montar el componente y 
// usestate para guardar el estado de los datos del dashboard
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

// Formatea un número a formato de moneda colombiana
const formatearNumero = (valor) => Number(valor || 0).toLocaleString('es-CO')


const formatearFecha = (valor) => {
  if (!valor) return '—'
  return String(valor).slice(0, 10)
}

export default function Dashboard() {
  const { user, x } = useAuth()
  const navigate = useNavigate()

  const [perfil, setPerfil] = useState(null)
  const [publicaciones, setPublicaciones] = useState([])
  const [contratos, setContratos] = useState([])
  const [seguidores, setSeguidores] = useState([])
  const [estadisticas, setEstadisticas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

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

  
  const datosPerfil = perfil || user // si no se pudo cargar a
  // el perfil desde la API, se usa el perfil del usuario logueado

  const estadistica = estadisticas[0] // si no se pudo cargar las
  // estadísticas desde la API, se usa un objeto vacío

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            Shortia
          </Link>
          <nav className="nav">
            <Link to="/">Inicio</Link>
            <Link to="/dashboard" className="active">
              Dashboard
            </Link>
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

      <main className="container dashboard-wrap">
        <div className="dashboard-head">
          <div>
            <h1>Dashboard</h1>
            <p>Resumen de tu cuenta y de la actividad de Shortia.</p>
          </div>
          <Link to="/perfil" className="btn btn-secondary">
            Mi perfil
          </Link>
        </div>

        {error && <div className="form-message error">{error}</div>}

        {cargando ? (
          <div className="panel">
            <p>Cargando datos...</p>
          </div>
        ) : (
          <>
            <section className="dash-stats">
              <article className="stat-card">
                <span>Publicaciones</span>
                <strong>{publicaciones.length}</strong>
              </article>
              <article className="stat-card">
                <span>Contratos</span>
                <strong>{contratos.length}</strong>
              </article>
              <article className="stat-card">
                <span>Seguidores</span>
                <strong>{seguidores.length}</strong>
              </article>
            </section>

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
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Shortia · Panel de control</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  )
}
