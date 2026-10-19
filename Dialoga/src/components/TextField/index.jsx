// ============================================================
// components/TextField
// Campo de formulário completo: label + caixa com ícone + input + erro.
// Props:
//   label -> texto acima do campo
//   icone -> imagem (import de um .png/.svg) mostrada à esquerda
//   acao  -> elemento à direita (ex.: botão de mostrar senha)
//   erro  -> mensagem de erro (deixa a borda vermelha)
//   ...resto (type, value, onChange, placeholder...) vai direto no <input>
// ============================================================
import { useId } from 'react'
import './TextField.css'

export default function TextField({ label, icone, acao, erro, ...inputProps }) {
  const id = useId() // id único que liga o label ao input

  return (
    <div className="campo">
      <label className="campo__label" htmlFor={id}>{label}</label>

      <div className={`campo__caixa ${erro ? 'campo__caixa--erro' : ''}`}>
        {icone && <img className="campo__icone" src={icone} alt="" />}
        <input
          id={id}
          className="campo__input"
          aria-invalid={!!erro}
          aria-describedby={erro ? `${id}-erro` : undefined}
          {...inputProps}
        />
        {acao}
      </div>

      {erro && <span id={`${id}-erro`} className="campo__erro">{erro}</span>}
    </div>
  )
}
