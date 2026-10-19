// ============================================================
// utils/rotasPorNivel.js
// Define para qual tela o usuário vai depois do login.
// O "nivel" vem do back-end: 0 = administrador, 1 = profissional, 2 = paciente.
// ============================================================
const ROTAS = {
  1: '/profissional/dashboard',
  2: '/paciente/dashboard',
}

// Devolve a rota inicial do nível, ou null se esse nível não tem tela
// no front (ex.: administrador).
export function rotaInicialPorNivel(nivel) {
  return ROTAS[nivel] ?? null
}
