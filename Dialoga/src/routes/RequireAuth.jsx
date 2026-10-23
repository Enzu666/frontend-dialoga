// ============================================================
// routes/RequireAuth.jsx
// Guarda de rotas: só deixa passar quem está logado E tem o nível certo.
//   <Route element={<RequireAuth nivel={NIVEL.PROFISSIONAL} />}> ... </Route>
// - Deslogado            -> /login
// - Logado, nível errado -> manda para a área do próprio nível
// ============================================================
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { rotaInicialPorNivel } from '../utils/rotasPorNivel'

export default function RequireAuth({ nivel }) {
  const { auth } = useAuth()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  if (auth.nivel !== nivel) {
    const propriaRota = rotaInicialPorNivel(auth.nivel)
    return <Navigate to={propriaRota ?? '/login'} replace />
  }

  return <Outlet />
}
