// ============================================================
// pages/auth/Login
// Página de login. Só junta os dois painéis:
//   LoginHero -> lado esquerdo (frase + ilustração)
//   LoginForm -> lado direito (formulário)
// Se o usuário já estiver logado, vai direto para a área dele.
// ============================================================
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { rotaInicialPorNivel } from '../../../utils/rotasPorNivel'
import LoginHero from './components/LoginHero'
import LoginForm from './components/LoginForm'
import './Login.css'

export default function Login() {
  const { auth } = useAuth()

  const rota = auth && rotaInicialPorNivel(auth.nivel)
  if (rota) return <Navigate to={rota} replace />

  return (
    <main className="pagina-login">
      <LoginHero />
      <LoginForm />
    </main>
  )
}
