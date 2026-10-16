import { createContext, useContext, useState } from 'react'

const API = 'http://localhost:8080/v1/dialoga'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const salvo = localStorage.getItem('auth')
    return salvo ? JSON.parse(salvo) : null   // { token, nivel }
  })

  async function login(email, senha) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })
    const data = await res.json()
    if (!data.status) throw new Error(data.message)

    const { token, nivel } = data.response.auth[0]
    const dados = { token, nivel }
    localStorage.setItem('auth', JSON.stringify(dados))
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

export const useAuth = () => useContext(AuthContext)