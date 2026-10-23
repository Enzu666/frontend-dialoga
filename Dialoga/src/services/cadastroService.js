// ============================================================
// services/cadastroService.js
// Cria a conta na API. Só faz requisições (sem tela e sem estado).
//   paciente     -> POST /pacientes
//   profissional -> POST /profissionais
// O back recebe esses dois como multipart/form-data (usa multer para
// a foto), por isso enviamos FormData e NÃO definimos o Content-Type
// (o navegador coloca o correto, com o boundary).
// ============================================================
import { API_URL } from '../config/api'

const ENDPOINTS = {
  paciente: '/pacientes',
  profissional: '/profissionais',
}

export async function cadastrarRequest(tipo, dados) {
  const form = new FormData()
  Object.entries(dados).forEach(([chave, valor]) => form.append(chave, valor))

  let res
  try {
    res = await fetch(`${API_URL}${ENDPOINTS[tipo]}`, { method: 'POST', body: form })
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
  }

  const data = await res.json().catch(() => null)

  if (!data?.status) {
    if (res.status === 401 || res.status === 403)
      throw new Error('O servidor bloqueou o cadastro. Tente novamente mais tarde.')
    if (res.status === 409) throw new Error('Já existe uma conta com esses dados.')
    throw new Error(data?.message ?? 'Erro ao criar a conta. Tente novamente.')
  }

  return data
}
