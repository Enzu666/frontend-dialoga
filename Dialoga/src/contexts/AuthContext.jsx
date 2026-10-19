// ============================================================
// contexts/AuthContext.jsx
// Guarda quem está logado e deixa isso disponível para todo o app.
// Uso em qualquer componente:  const { auth, login, logout } = useAuth()
//   auth   -> { token, nivel, id, email } ou null (deslogado)
//   login  -> faz o login na API e salva a sessão
//   logout -> apaga a sessão
// ============================================================
import { createContext, useContext, useState } from 'react'
import { loginRequest } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Ao abrir o site, recupera a sessão salva no navegador (se existir)
  const [auth, setAuth] = useState(() => {
    const salvo = localStorage.getItem('auth')
    return salvo ? JSON.parse(salvo) : null
  })

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

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
