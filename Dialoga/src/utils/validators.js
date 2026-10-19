// ============================================================
// utils/validators.js
// Funções de validação dos formulários (antes de chamar a API).
// ============================================================

// Formato básico de e-mail: texto@texto.texto
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Limites iguais aos do back-end (controller_auth.js)
const MAX_EMAIL = 150
const MAX_SENHA = 30

// Recebe { email, senha } e devolve um objeto com as mensagens de erro
// de cada campo. Objeto vazio = tudo certo.
// Ex.: { email: 'E-mail inválido.' }
export function validarLogin({ email, senha }) {
  const erros = {}

  if (!email.trim()) erros.email = 'Informe seu e-mail.'
  else if (!REGEX_EMAIL.test(email.trim()) || email.length > MAX_EMAIL) erros.email = 'E-mail inválido.'

  if (!senha.trim()) erros.senha = 'Informe sua senha.'
  else if (senha.length > MAX_SENHA) erros.senha = `A senha deve ter no máximo ${MAX_SENHA} caracteres.`

  return erros
}
