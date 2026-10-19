// ============================================================
// LoginHero (painel esquerdo do login)
// A ilustração e o texto formam um "palco" com proporção fixa
// (igual ao Figma). O palco sempre PREENCHE o painel, e o texto
// é posicionado em % do palco, então fica no mesmo lugar em relação
// às pessoas em qualquer tamanho de tela.
// A largura do painel é controlada em Login.css (grid-template-columns).
// Para trocar a imagem, substitua assets/auth/ilustracao-login.png
// (se a proporção mudar, ajuste --proporcao-num no LoginHero.css
// e o 0.8936 no Login.css)
// ============================================================
import ilustracao from '../../../../../assets/auth/ilustracao-login.png'
import './LoginHero.css'

export default function LoginHero() {
  return (
    <section className="hero-login" aria-label="Apresentação do Dialoga">
      <div className="hero-login__palco">
        {/* Imagem decorativa, por isso alt vazio */}
        <img className="hero-login__fundo" src={ilustracao} alt="" />

        <div className="hero-login__texto">
          <h1 className="hero-login__titulo">
            Acompanhe suas emoções.<br />Compartilhe o que importa.
          </h1>
          <p className="hero-login__subtitulo">
            Um espaço seguro para você se conhecer,<br />refletir e cuidar da sua saúde mental.
          </p>
        </div>
      </div>
    </section>
  )
}