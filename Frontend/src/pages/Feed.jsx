import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'
import {
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  MusicIcon,
  PlayIcon,
  PlusIcon,
  ShareIcon,
  SparklesIcon,
  VerifiedIcon,
  VolumeIcon,
} from '../components/Icons'

// Formato compacto para los contadores del feed (1.2K, 3.4M).
const formatearCompacto = (valor) => {
  const numero = Number(valor || 0)
  if (numero >= 1000000) return `${(numero / 1000000).toFixed(1)}M`
  if (numero >= 1000) return `${(numero / 1000).toFixed(1)}K`
  return String(numero)
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

export default function Feed() {
  const { user } = useAuth()

  const [publicaciones, setPublicaciones] = useState([])
  const [estadisticas, setEstadisticas] = useState([])
  const [error, setError] = useState('')

  // Estado local solo para la interfaz del feed.
  const [filtro, setFiltro] = useState(FILTROS[0])
  const [meGusta, setMeGusta] = useState(false)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [publicacionesRes, estadisticasRes] = await Promise.all([
          api.get('/publicaciones'),
          api.get('/estadisticas'),
        ])

        setPublicaciones(publicacionesRes.data.data || [])
        setEstadisticas(estadisticasRes.data.data || [])
      } catch (err) {
        setError(
          err.response?.data?.msg ||
            'No se pudieron cargar las publicaciones del inicio.',
        )
      }
    }

    cargarDatos()
  }, [])

  const datosPerfil = user || {}

  const inicialUsuario = (datosPerfil.Username || datosPerfil.Nombre || 'S')
    .trim()
    .charAt(0)
    .toUpperCase()

  const creador = datosPerfil.Username || 'shortia'
  const publicacionPrincipal = publicaciones[0]
  const estadistica = estadisticas[0]

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

  return (
    <AppShell active="inicio">
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
                {/* El audio es solo visual: la publicación no reproduce media. */}
                <span className="feed-sound feed-static" aria-hidden="true">
                  <VolumeIcon size={18} />
                </span>
              </div>

              <div className="feed-center">
                {/* La vista previa tampoco reproduce media. */}
                <span className="feed-play feed-static" aria-hidden="true">
                  <PlayIcon size={22} />
                </span>
                <span className="feed-badge">Vista previa IA</span>
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
                <span style={{ width: '38%' }} />
              </div>
            </div>
          </article>

          <aside className="feed-actions" aria-label="Acciones de la publicación">
            <div className="feed-avatar-wrap">
              <span className="feed-avatar">{inicialUsuario}</span>
              <span className="feed-follow feed-static" aria-hidden="true">
                <PlusIcon size={12} />
              </span>
            </div>

            {/* Única acción interactiva de la publicación. */}
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

            <span className="feed-action feed-static" aria-hidden="true">
              <span className="feed-action-icon">
                <CommentIcon size={22} />
              </span>
              <span className="feed-action-count">
                {formatearCompacto(comentarios)}
              </span>
            </span>

            <span className="feed-action feed-static" aria-hidden="true">
              <span className="feed-action-icon">
                <ShareIcon size={22} />
              </span>
              <span className="feed-action-count">
                {formatearCompacto(compartidos)}
              </span>
            </span>

            <span className="feed-action feed-static" aria-hidden="true">
              <span className="feed-action-icon">
                <BookmarkIcon size={22} />
              </span>
              <span className="feed-action-count">0</span>
            </span>

            <span className="feed-disc feed-static" aria-hidden="true">
              <MusicIcon size={16} />
            </span>
          </aside>
        </section>
      </main>
    </AppShell>
  )
}
