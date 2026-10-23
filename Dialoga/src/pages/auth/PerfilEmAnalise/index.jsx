// ============================================================
// pages/auth/PerfilEmAnalise
// Página que só exibe o card "Seu perfil foi enviado para análise".
// Ainda não está ligada ao fluxo do cadastro (é só o layout).
// ============================================================
import { useNavigate } from 'react-router-dom'
import PerfilEmAnaliseCard from '../Cadastro/components/PerfilEmAnalise'

export default function PerfilEmAnalise() {
  const navigate = useNavigate()

  return (
    <main className="flex justify-center min-h-svh py-8 px-4 bg-fundo-suave">
      <div className="w-full max-w-[440px] h-fit">
        <PerfilEmAnaliseCard onCiente={() => navigate('/login')} />
      </div>
    </main>
  )
}
