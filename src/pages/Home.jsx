import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">Shortia</Link>
          <nav className="nav">
            <Link to="/">Inicio</Link>
            {user ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/perfil">Mi perfil</Link>
                <button type="button" className="nav-cta" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/register" className="nav-cta">Crear cuenta</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-wrap">
          <div className="container hero">
            <div>
              <h1>Una red social para creadores, marcas y agencias.</h1>
              <p>
                Publica contenido, gestiona colaboraciones y revisa tu crecimiento
                desde un solo lugar. Shortia reúne las herramientas que necesitas
                para mover tu comunidad.
              </p>
              <div className="hero-actions">
                {user ? (
                  <Link to="/perfil" className="btn btn-primary">Ir a mi perfil</Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary">Crear cuenta</Link>
                    <Link to="/login" className="btn btn-secondary">Iniciar sesión</Link>
                  </>
                )}
              </div>
            </div>

            <aside className="hero-panel">
              <h2>Lo que puedes hacer</h2>
              <ul className="hero-list">
                <li><span className="dot" />Publicar y organizar tu contenido.</li>
                <li><span className="dot" />Gestionar contratos y colaboraciones.</li>
                <li><span className="dot" />Seguir seguidores, likes y comentarios.</li>
                <li><span className="dot" />Ver estadísticas de tu cuenta.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="features-wrap">
          <div className="container">
            <h2>Todo en un solo panel</h2>
            <p className="subtitle">Herramientas sencillas para tu día a día.</p>
            <div className="feature-grid">
              <article className="feature">
                <h3>Publicaciones</h3>
                <p>Crea, edita y elimina publicaciones con su multimedia y comentarios.</p>
              </article>
              <article className="feature">
                <h3>Colaboraciones</h3>
                <p>Lleva el control de contratos, agencias, marcas y medios de pago.</p>
              </article>
              <article className="feature">
                <h3>Estadísticas</h3>
                <p>Consulta el alcance de tus publicaciones y el crecimiento de tu cuenta.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Shortia · Proyecto de endpoints</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  )
}
