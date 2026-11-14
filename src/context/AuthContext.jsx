import { createContext, useContext, useEffect, useState } from 'react' // create context para crear un contexto de autenticación, 
// usecontext para acceder al contexto, 
// useeffect para ejecutar código al montar el componente y usestate para guardar el estado del usuario y la carga
import { registrar, iniciarSesion, obtenerPerfil } from '../services/auth'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext) // exporta un hook para acceder al contexto de autenticación

export function AuthProvider({ children }) { //children es el contenido que se renderiza dentro del proveedor de contexto, 
  // osea los componentes hijos que necesitan acceder al contexto de autenticación
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => { 
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false)
      return
    }
    obtenerPerfil()
      .then(setUser)
      .catch(logout) // logout si el token es inválido o ha expirado y 
      // no se puede obtener el perfil del usuario
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { token } = await iniciarSesion(email, password)
    localStorage.setItem('token', token)
    setUser(await obtenerPerfil())
  }

  const register = async (datos) => {
    const data = await registrar(datos)
    if (data.token) {
      localStorage.setItem('token', data.token)
      setUser(await obtenerPerfil())
    }
    return data
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
