// ============================================================
// LoginForm (painel direito do login)
// Só a parte visual: logo, campos, botões e links.
// A lógica (validação, chamada da API) está em hooks/useLoginForm.js
// ============================================================
import { Link } from 'react-router-dom'
import Logo from '../../../../../components/Logo'
import TextField from '../../../../../components/TextField'
import Button from '../../../../../components/Button'
import Divider from '../../../../../components/Divider'
import GoogleButton from '../../../../../components/GoogleButton'
import { useLoginForm } from '../../../../../hooks/useLoginForm'
import iconeEmail from '../../../../../assets/auth/icon_email.png'
import iconeCadeado from '../../../../../assets/auth/icon_cadeado.png'
import iconeOlho from '../../../../../assets/auth/icon_olho.png'
import './LoginForm.css'

export default function LoginForm() {
  const {
    valores, errosCampos, erroGeral, carregando, mostrarSenha,
    alterarCampo, alternarSenha, enviar,
  } = useLoginForm()

  function entrarComGoogle() {
    // TODO: integrar Google Identity e chamar POST /auth/login/google/:id_google
    alert('Login com Google ainda não foi integrado.')
  }

  return (
    <section className="form-login">
      <div className="form-login__conteudo">
        <Logo altura={40} />

        {/* Títulos */}
        <header className="form-login__cabecalho">
          <h2 className="form-login__titulo">Bem-vindo de volta</h2>
          <p className="form-login__subtitulo">Entre na sua conta para continuar</p>
        </header>

        {/* Formulário (noValidate: a validação é feita por nós, não pelo navegador) */}
        <form className="form-login__form" onSubmit={enviar} noValidate>
          <TextField
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="seu@email.com"
            icone={iconeEmail}
            value={valores.email}
            onChange={(e) => alterarCampo('email', e.target.value)}
            erro={errosCampos.email}
          />

          <TextField
            label="Senha"
            type={mostrarSenha ? 'text' : 'password'} /* alterna entre ocultar e mostrar */
            name="senha"
            autoComplete="current-password"
            placeholder="••••••••"
            icone={iconeCadeado}
            value={valores.senha}
            onChange={(e) => alterarCampo('senha', e.target.value)}
            erro={errosCampos.senha}
            acao={
              <button
                type="button"
                className="form-login__olho"
                onClick={alternarSenha}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {/* Olho mais "apagado" quando a senha está oculta */}
                <img src={iconeOlho} alt="" style={{ opacity: mostrarSenha ? 1 : 0.6 }} />
              </button>
            }
          />

          <Link className="form-login__link form-login__link--esquerda" to="/recuperar-senha">
            Esqueceu sua senha?
          </Link>

          {/* Erro vindo da API (ex.: senha incorreta, servidor fora do ar) */}
          {erroGeral && <p className="form-login__erro" role="alert">{erroGeral}</p>}

          <Button type="submit" carregando={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <Divider texto="ou continue com" />
        <GoogleButton onClick={entrarComGoogle} disabled={carregando} />

        <p className="form-login__cadastro">
          Não tem conta? <Link className="form-login__link form-login__link--forte" to="/cadastro">Cadastre-se</Link>
        </p>
      </div>

      {/* Rodapé fixo na parte de baixo do painel */}
      <footer className="form-login__rodape">
        <a href="#termos">Termos de Uso</a>
        <span aria-hidden="true">|</span>
        <a href="#privacidade">Política de Privacidade</a>
      </footer>
    </section>
  )
}
