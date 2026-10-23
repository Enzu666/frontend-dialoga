// ============================================================
// DefinirSenha (passo 2 do cadastro)
// Só a parte visual: título, campos de senha e botões.
// Tudo que é dado/ação chega por props, vindo do hook useCadastroForm
// (a tela Cadastro só repassa: <DefinirSenha {...} />).
// Props:
//   valores        -> { senha, confirmarSenha }
//   errosCampos    -> mensagens de erro por campo
//   erroGeral      -> erro vindo da API
//   carregando     -> true enquanto a conta está sendo criada
//   mostrarSenha   -> alterna entre ocultar e mostrar a senha
//   onAlterarCampo -> (campo, valor) => void
//   onAlternarSenha, onVoltar, onSubmit
// ============================================================
import TextField from '../../../../../components/TextField'
import Button from '../../../../../components/Button'
import iconeCadeado from '../../../../../assets/auth/icon_cadeado.png'
import iconeOlho from '../../../../../assets/auth/icon_olho.png'

export default function DefinirSenha({
  valores,
  errosCampos,
  erroGeral,
  carregando,
  mostrarSenha,
  onAlterarCampo,
  onAlternarSenha,
  onVoltar,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className="text-[20px] font-extrabold text-texto">Defina sua senha</h1>
      <p className="mt-1 text-[13px] text-secundaria">Crie uma senha segura para sua conta</p>

      <div className="flex flex-col gap-4 mt-5">
        <TextField
          label="Senha"
          type={mostrarSenha ? 'text' : 'password'}
          name="senha"
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          icone={iconeCadeado}
          value={valores.senha}
          onChange={(e) => onAlterarCampo('senha', e.target.value)}
          erro={errosCampos.senha}
          acao={
            <button
              type="button"
              className="flex p-0 border-0 bg-transparent cursor-pointer"
              onClick={onAlternarSenha}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <img className="w-4 h-4" src={iconeOlho} alt="" style={{ opacity: mostrarSenha ? 1 : 0.6 }} />
            </button>
          }
        />

        <TextField
          label="Confirmar senha"
          type={mostrarSenha ? 'text' : 'password'}
          name="confirmarSenha"
          autoComplete="new-password"
          placeholder="Repita a senha"
          icone={iconeCadeado}
          value={valores.confirmarSenha}
          onChange={(e) => onAlterarCampo('confirmarSenha', e.target.value)}
          erro={errosCampos.confirmarSenha}
        />

        {erroGeral && (
          <p className="px-3 py-2.5 border border-erro-borda rounded-lg bg-erro-fundo text-[12px] text-erro" role="alert">
            {erroGeral}
          </p>
        )}

        {/* Voltar e Criar conta lado a lado */}
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variante="suave" onClick={onVoltar} disabled={carregando}>
            Voltar
          </Button>
          <Button type="submit" carregando={carregando}>
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </div>
      </div>
    </form>
  )
}
