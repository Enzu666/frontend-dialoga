// ============================================================
// utils/primeiroAcesso.js
// Controla se o paciente já passou pela tela "Personalizar experiência".
// TODO: o ideal é o back-end informar isso no login (ex.: campo
// "primeiro_acesso"). Enquanto isso, guardamos no navegador, por usuário.
// ============================================================
const chave = (id) => `primeiroAcessoConcluido:${id}`

export function primeiroAcessoConcluido(id) {
  try {
    return localStorage.getItem(chave(id)) === '1'
  } catch {
    return true // sem acesso ao storage: não prende o usuário na tela
  }
}

export function concluirPrimeiroAcesso(id) {
  try {
    localStorage.setItem(chave(id), '1')
  } catch {
    // ignora: apenas não lembra que concluiu
  }
}
