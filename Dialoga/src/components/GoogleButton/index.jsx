// ============================================================
// components/GoogleButton
// Botão "Continuar com Google" (usa o Button de contorno).
// Props: onClick (o que fazer ao clicar) e disabled.
// ============================================================
import Button from '../Button'
import iconeGoogle from '../../assets/auth/Google.png'

export default function GoogleButton({ onClick, disabled }) {
  return (
    <Button type="button" variante="contorno" onClick={onClick} disabled={disabled}>
      <img src={iconeGoogle} alt="" width="34" height="50" style={{ objectFit: 'contain' }} />
      Continuar com Google
    </Button>
  )
}
