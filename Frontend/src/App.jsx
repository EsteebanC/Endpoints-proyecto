import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
// AuthProvider es un componente que proporciona el contexto de 
// autenticación a toda la aplicación, permitiendo que los 
// componentes hijos accedan a la información del usuario y al estado de autenticación.
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import Dashboard from './pages/Dashboard'

// Ruta pública: solo accesible si NO hay sesión
function PublicRoute({ children }) {
  const { loading, user } = useAuth() 
  // usamos useAuth para  obtener el estado de autenticación del usuario y el estado de carga

  if (loading) return null // si el estado de carga es true,
  //  no renderizamos nada hasta que se obtenga el estado de autenticación del usuario

  if (user) return <Navigate to="/" replace />
  return children
} // si hay usuario, redirige al inicio, si no hay usuario, renderiza los hijos (children) 
// que son las rutas públicas (login y register)

// El inicio muestra el feed para usuarios autenticados y la landing pública
// para los visitantes que todavía no tienen sesión.
function InicioRoute() {
  const { loading, user } = useAuth()

  if (loading) return null

  return user ? <Feed /> : <Home />
}

function AppInner() {
  return (
    <Routes>
      <Route path="/" element={<InicioRoute />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
