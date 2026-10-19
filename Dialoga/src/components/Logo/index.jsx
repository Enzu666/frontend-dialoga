// ============================================================
// components/Logo
// Logo do Dialoga. Prop: altura (em px, padrão 40).
// Para trocar a imagem, substitua assets/auth/logo-dialoga.png
// ============================================================
import logo from '../../assets/auth/logo-dialoga.png'
import './Logo.css'

export default function Logo() {
  return <img className="logo" src={logo} alt="Dialoga"  />
}
