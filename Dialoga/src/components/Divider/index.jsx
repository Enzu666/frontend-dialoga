// ============================================================
// components/Divider
// Linha divisória com texto no meio (ex.: "ou continue com").
// Prop: texto (opcional; sem texto vira só uma linha).
// ============================================================
import './Divider.css'

export default function Divider({ texto }) {
  return (
    <div className="divisor" role="separator">
      <span className="divisor__linha" />
      {texto && <span className="divisor__texto">{texto}</span>}
      <span className="divisor__linha" />
    </div>
  )
}
