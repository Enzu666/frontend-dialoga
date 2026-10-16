import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Recebe a prop "nivel": o tipo de usuário que pode entrar nessa área.
// Ex.: <RequireAuth nivel={2} /> significa "só paciente entra".
export default function RequireAuth({ nivel }) {

  // Pega do contexto quem está logado (ou null se ninguém)
  const { auth } = useAuth()

  // Caso 1: ninguém logado → manda para o login.
  // "replace" troca a página no histórico, assim o botão "voltar"
  // do navegador não leva o usuário de volta pra área proibida.
  if (!auth) return <Navigate to="/login" replace />

  // Caso 2: está logado, mas é o tipo errado
  // (ex.: um paciente tentando abrir /profissional/dashboard) → também barra.
  if (auth.nivel !== nivel) return <Navigate to="/login" replace />

  // Caso 3: tudo certo → deixa passar.
  // <Outlet /> aqui significa "renderize as rotas filhas que estão dentro de mim".
  return <Outlet />
}