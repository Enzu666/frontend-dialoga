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

export default function Login() {
  const { auth } = useAuth()

  const rota = auth && rotaInicialPorNivel(auth.nivel)
  if (rota) return <Navigate to={rota} replace />

  return (
    /* Duas colunas: hero (esquerda) e formulário (direita).
          A largura do hero acompanha a ALTURA da tela, para ele ficar sempre
          na proporção da ilustração (915 x 1024). Assim a imagem preenche o
          painel sem cortar e sem sobras, em qualquer tamanho de janela.
          Limites: o hero nunca passa de 62% nem fica abaixo de 50% da largura.
          Telas menores (<= 900px): uma coluna só (o hero se esconde sozinho). */
    <main className="grid grid-cols-[clamp(50%,calc(100svh_*_0.8936),62%)_1fr] min-h-svh [@media(max-width:900px)]:grid-cols-1">
      <LoginHero />
      <LoginForm />
    </main>
  )
}
