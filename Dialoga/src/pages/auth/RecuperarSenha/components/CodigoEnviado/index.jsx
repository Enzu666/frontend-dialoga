// ============================================================
// CodigoEnviado (passo 2 da recuperação de senha)
// Só layout: aviso de e-mail enviado, 4 caixas do código,
// botão "Redefinir senha" e link "Enviar novamente".
// Props:
//   onSubmit    -> chamado ao enviar o formulário
//   onReenviar  -> chamado ao clicar em "Enviar novamente"
// ============================================================
import Button from '../../../../../components/Button'

const QUANTIDADE_DIGITOS = 4

// Check verde (herda a cor do texto)
const IconeCheck = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default function CodigoEnviado({ onSubmit, onReenviar }) {
  return (
    <form className="flex flex-col items-center text-center" onSubmit={onSubmit} noValidate>
      <span className="grid place-items-center w-14 h-14 rounded-2xl bg-sucesso-fundo text-sucesso">
        {IconeCheck}
      </span>

      <h1 className="mt-4 text-[20px] font-extrabold text-texto">E-mail enviado!</h1>
      <p className="mt-2 max-w-[280px] text-[12px] text-secundaria">
        Verifique sua caixa de entrada. O código para redefinir a senha expirará em 30 minutos.
      </p>

      {/* Caixas do código */}
      <div className="flex gap-4 mt-6" role="group" aria-label="Código de verificação">
        {Array.from({ length: QUANTIDADE_DIGITOS }, (_, i) => (
          <input
            key={i}
            className="w-14 h-11 text-center bg-branco border border-borda rounded-lg text-[18px] font-bold leading-[normal] text-texto outline-0 transition-[border-color,box-shadow] duration-200 ease-[ease] focus:border-primaria focus:shadow-[0_0_0_3px_var(--color-primaria-alfa-20)]"
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="one-time-code"
            aria-label={`Dígito ${i + 1}`}
          />
        ))}
      </div>

      <div className="w-full mt-6">
        <Button type="submit">Redefinir senha</Button>
      </div>

      <button
        className="mt-4 p-0 border-0 bg-transparent text-[11px] text-secundaria cursor-pointer hover:underline"
        type="button"
        onClick={onReenviar}
      >
        Enviar novamente
      </button>
    </form>
  )
}
