import { Navigate, Outlet } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>; // al recargar la página, el estado de user a
  // es null hasta que se obtiene el perfil del usuario, por eso se muestra un mensaje de carga mientras se obtiene el perfil
  return user ? <Outlet /> : <Navigate to="/login" replace />; // si no hay usuario, 
  // redirige a login, si hay usuario, renderiza el componente hijo (Outlet) 
  // outlet es para renderizar el componente hijo que se encuentra dentro de la ruta protegida
}
