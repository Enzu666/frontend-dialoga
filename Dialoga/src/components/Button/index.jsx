// ============================================================
// components/Button
// Botão padrão do sistema, ocupa 100% da largura do container.
// Props:
//   variante   -> 'primario' (roxo preenchido) | 'contorno' (borda roxa)
//   carregando -> true desabilita o botão (evita clique duplo)
// Aceita também as props normais de <button> (type, onClick, ...).
// ============================================================
import './Button.css'

export default function Button({ variante = 'primario', carregando = false, children, ...props }) {
  return (
    <button
      className={`btn btn--${variante}`}
      {...props}
      disabled={carregando || props.disabled}
    >
      {children}
    </button>
  )
}
