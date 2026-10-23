// ============================================================
// utils/rotasPorNivel.js
// Define para qual tela o usuário vai depois do login.
// O "nivel" vem do back-end: 0 = administrador, 1 = profissional, 2 = paciente.
// ============================================================
export const NIVEL = { ADMIN: 0, PROFISSIONAL: 1, PACIENTE: 2 }

const ROTAS = {
  [NIVEL.ADMIN]: '/admin/dashboard',
  [NIVEL.PROFISSIONAL]: '/profissional/dashboard',
  [NIVEL.PACIENTE]: '/paciente/dashboard',
}

// Devolve a rota inicial do nível, ou null se o nível for desconhecido.
export function rotaInicialPorNivel(nivel) {
  return ROTAS[nivel] ?? null
}
