// ============================================================
// pages/auth/RecuperarSenha
// Recuperação de senha em 3 etapas (só o layout, sem API ainda):
//   1) InformarEmail  -> e-mail para receber o código
//   2) CodigoEnviado  -> código de 4 dígitos
//   3) DefinirSenha   -> nova senha (reaproveita o componente do Cadastro)
// O link do Login ("Esqueceu sua senha?") leva para /recuperar-senha.
// ============================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../components/Logo'
import InformarEmail from './components/InformarEmail'
import CodigoEnviado from './components/CodigoEnviado'
import DefinirSenha from '../Cadastro/components/DefinirSenha'

export default function RecuperarSenha() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState(1)
  const [email, setEmail] = useState('')
  const [senhas, setSenhas] = useState({ senha: '', confirmarSenha: '' })
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Evita o recarregamento da página e passa para a próxima etapa
  const avancar = (proxima) => (e) => {
    e.preventDefault()
    setEtapa(proxima)
  }

  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-svh py-8 px-4 bg-fundo-suave">
      <Logo />

      {/* As etapas 1 e 2 têm o card mais estreito; a etapa 3 usa a largura do Cadastro */}
      <section
        className={`w-full p-6 bg-branco border border-borda rounded-2xl shadow-[0_4px_12px_var(--color-sombra)] ${
          etapa === 3 ? 'max-w-[440px]' : 'max-w-[384px]'
        }`}
      >
        {etapa === 1 && (
          <InformarEmail
            valor={email}
            onAlterar={setEmail}
            onSubmit={avancar(2)} // TODO: chamar a API que envia o código
          />
        )}

        {etapa === 2 && (
          <CodigoEnviado
            onSubmit={avancar(3)} // TODO: validar o código na API
            onReenviar={() => {}} // TODO: reenviar o código
          />
        )}

        {etapa === 3 && (
          <DefinirSenha
            valores={senhas}
            errosCampos={{}}
            erroGeral={null}
            carregando={false}
            mostrarSenha={mostrarSenha}
            onAlterarCampo={(campo, valor) => setSenhas((s) => ({ ...s, [campo]: valor }))}
            onAlternarSenha={() => setMostrarSenha((v) => !v)}
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/login') // TODO: salvar a nova senha na API
            }}
            textoBotao="Salvar"
            textoCarregando="Salvando..."
          />
        )}
      </section>
    </main>
  )
}
