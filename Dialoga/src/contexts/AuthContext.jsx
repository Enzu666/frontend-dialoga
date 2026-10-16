import { createContext, useContext, useState } from 'react'

// Endereço base da API (o backend roda na porta 8080)
const API = 'http://localhost:8080/v1/dialoga'

// true  = NÃO chama o backend,  = chama o backend de verdadeaceita login de mentira (para testar o front)
// false
const USAR_MOCK = false

// Cria o "cofre" que guarda quem está logado
const AuthContext = createContext(null)

// Componente que "abraça" o app e distribui o login para todas as telas
export function AuthProvider({ children }) {

  // auth = { token, nivel } se tem alguém logado, ou null se não tem.
  // Ao abrir o site, olha no localStorage se já existe login salvo (sobrevive ao F5).
  const [auth, setAuth] = useState(() => {
    const salvo = localStorage.getItem('auth')
    return salvo ? JSON.parse(salvo) : null
  })

  // Chamada pela tela de Login com o email e a senha digitados
  async function login(email, senha) {

    // ---- MODO TESTE (sem backend) ----
    if (USAR_MOCK) {
      // email com "prof" → profissional (1); qualquer outro → paciente (2)
      const nivel = email.includes('prof') ? 1 : 2
      const dados = { token: 'token-falso', nivel }

      localStorage.setItem('auth', JSON.stringify(dados))
      setAuth(dados)
      return dados
    }

    // ---- MODO REAL (com backend) ----
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })
    const data = await res.json()

    // status false = senha errada etc. → lança erro para a tela de Login mostrar
    if (!data.status) throw new Error(data.message)

    const { token, nivel } = data.response.auth[0]
    const dados = { token, nivel }

    localStorage.setItem('auth', JSON.stringify(dados))
    setAuth(dados)
    return dados
  }

  // Apaga o login salvo e volta ao estado "ninguém logado"
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

// ESTA LINHA É A QUE O ERRO DIZ QUE ESTÁ FALTANDO.
// Sem o "export", o RequireAuth e o Login não conseguem importar o useAuth.
export const useAuth = () => useContext(AuthContext)