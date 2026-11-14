import { createContext, useContext, useEffect, useState } from 'react'
import { registrar, iniciarSesion, obtenerPerfil } from '../services/auth'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
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
      .catch(logout)
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { token } = await iniciarSesion(email, password)
    localStorage.setItem('token', token)
    setUser(await obtenerPerfil())
  }

  // El registro no inicia sesión automáticamente: el usuario debe entrar
  // con sus credenciales desde el login.
  const register = async (datos) => {
    return registrar(datos)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
