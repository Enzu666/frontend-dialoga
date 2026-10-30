// ============================================================
// services/redefinirSenha.js
// redefine a senha de um usuario
// ============================================================
import { API_URL } from '../config/api'

const ENDPOINTS = {
  solicitarCodigo: '/auth/recuperar-senha/solicitar',
  confirmarCodigo: '/auth/recuperar-senha/validar-codigo',
  redefinirSenha:   '/auth/recuperar-senha/redefinir'
}

export async function solicitarCodigoRequest(email) {
    let res
    try {
      res = await fetch(`${API_URL}${ENDPOINTS.solicitarCodigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email}),
      })
    } catch {
      // fetch só falha aqui quando não consegue falar com o servidor
      throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    }
  
    const data = await res.json().catch(() => null)
  
    // O back responde { status: true/false, ... }
    if (!data?.status) {
      if (res.status === 401) throw new Error('E-mail.')
      throw new Error(data?.message ?? 'Erro ao enviar codigo. Tente novamente.')
    }

    return data
}

export async function confirmarCodigoRequest(email, codigo) {
    let res
    try {
      res = await fetch(`${API_URL}${ENDPOINTS.confirmarCodigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, codigo}),
      })
    } catch {
      // fetch só falha aqui quando não consegue falar com o servidor
      throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    }
  
    const data = await res.json().catch(() => null)
  
    // O back responde { status: true/false, ... }
    if (!data?.status) {
      if (res.status === 401) throw new Error('E-mail.')
      throw new Error(data?.message ?? 'Erro ao confirmar codigo. Tente novamente.')
    }

    return data
}

export async function redefinirSenhaRequest(email, codigo, senha) {
    let res
    try {
        res = await fetch(`${API_URL}${ENDPOINTS.redefinirSenha}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, senha }),
        })
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    }

    const data = await res.json().catch(() => null)

    if (!data?.status) {
        throw new Error(data?.message ?? 'Erro ao redefinir senha. Tente novamente.')
    }
    return data
}