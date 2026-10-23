// ============================================================
// contexts/AuthContext.jsx
// Guarda quem está logado e deixa isso disponível para todo o app.
// Uso em qualquer componente:  const { auth, login, logout } = useAuth()
//   auth   -> { token, nivel, id, email } ou null (deslogado)
//   login  -> faz o login na API e salva a sessão
//   logout -> apaga a sessão
// ============================================================
import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest } from '../services/authService'

const AuthContext = createContext(null)

// Lê o "exp" (em segundos) de um JWT. Devolve null se não for um JWT válido.
function lerExpiracao(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const { exp } = JSON.parse(atob(payload))
    return typeof exp === 'number' ? exp : null
  } catch {
    return null
  }
}

function tokenExpirado(token) {
  const exp = lerExpiracao(token)
  return exp !== null && exp * 1000 <= Date.now()
}

// Recupera a sessão salva; descarta se estiver corrompida, incompleta ou expirada.
function lerSessaoSalva() {
  try {
    const salvo = JSON.parse(localStorage.getItem('auth'))
    if (!salvo || !salvo.token || typeof salvo.nivel !== 'number') throw new Error()
    if (tokenExpirado(salvo.token)) throw new Error()
    return salvo
  } catch {
    localStorage.removeItem('auth')
    return null
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(lerSessaoSalva)

  async function login(email, senha) {
    const dados = await loginRequest(email, senha)
    localStorage.setItem('auth', JSON.stringify(dados)) // mantém logado ao recarregar
    setAuth(dados)
    return dados
  }

  function logout() {
    localStorage.removeItem('auth')
    setAuth(null)
  }

  // Desloga automaticamente quando o token expira (mesmo com a aba aberta)
  useEffect(() => {
    if (!auth) return
    const exp = lerExpiracao(auth.token)
    if (exp === null) return
    // se já venceu, o timeout de 0 ms desloga logo em seguida
    const restante = Math.max(exp * 1000 - Date.now(), 0)
    const timer = setTimeout(logout, restante)
    return () => clearTimeout(timer)
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
