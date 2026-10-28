// ============================================================
// pages/auth/PersonalizarExperiencia
// Personalização do paciente em 3 etapas (só o layout, sem API ainda):
//   1) DadosPessoais  -> como quer ser chamado e data de nascimento (opcionais)
//   2) Profissional   -> (tela ainda não feita)
//   3) Humor          -> (tela ainda não feita)
// Rota: /personalizar-experiencia
// ============================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { concluirPrimeiroAcesso } from '../../../utils/primeiroAcesso'
import Stepper from '../../../components/Stepper'
import PontosProgresso from '../../../components/PontosProgresso'
import DadosPessoais from './components/DadosPessoais'

const PASSOS = ['Pessoal', 'Profissional', 'Humor']
const NOME_COMPLETO = 'Ana Beatriz Ferreira' // TODO: vir do cadastro do paciente

export default function PersonalizarExperiencia() {
  const navigate = useNavigate()
  const { auth } = useAuth()
  const [etapa] = useState(1) // TODO: trocar de etapa quando existirem as telas 2 e 3
  const [valores, setValores] = useState({ apelido: '', dataNascimento: '' })

  // Termina o primeiro acesso e segue para o painel do paciente
  function concluir() {
    concluirPrimeiroAcesso(auth.id)
    navigate('/paciente/dashboard', { replace: true })
  }

  return (
    <main className="flex flex-col items-center justify-center gap-6 min-h-svh py-8 px-4 bg-fundo-suave">
      <Stepper passos={PASSOS} atual={etapa} />

      <section className="w-full max-w-[440px] p-6 bg-branco border border-borda rounded-2xl shadow-[0_4px_12px_var(--color-sombra)]">
        {etapa === 1 && (
          <DadosPessoais
            valores={valores}
            nomeCompleto={NOME_COMPLETO}
            onAlterarCampo={(campo, valor) => setValores((v) => ({ ...v, [campo]: valor }))}
            onContinuar={(e) => {
              e.preventDefault()
              // TODO: salvar na API e ir para a etapa 2 (Profissional).
              // Por enquanto, como as etapas 2 e 3 não existem, conclui aqui.
              concluir()
            }}
            onPular={concluir}
          />
        )}
      </section>

      <PontosProgresso className="mt-4" total={PASSOS.length} atual={etapa} />
    </main>
  )
}
