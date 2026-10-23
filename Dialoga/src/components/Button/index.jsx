// ============================================================
// components/Button
// Botão padrão do sistema, ocupa 100% da largura do container.
// Props:
//   variante   -> 'primario' (roxo preenchido) | 'contorno' (borda roxa)
//   carregando -> true desabilita o botão (evita clique duplo)
// Aceita também as props normais de <button> (type, onClick, ...).
// ============================================================

// Base comum a todas as variantes
const BASE =
  'flex items-center justify-center gap-2 w-full h-10 px-4 rounded-lg ' +
  'text-[13px] font-semibold leading-none cursor-pointer ' +
  'transition-[background,border-color,opacity] duration-200 ease-[ease] ' +
  'disabled:opacity-60 disabled:cursor-not-allowed ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaria' // acessibilidade (teclado)

// Variantes (classes escritas por extenso para o Tailwind encontrá-las)
const VARIANTES = {
  // fundo roxo
  primario: 'bg-primaria border border-primaria text-branco enabled:hover:bg-primaria-escura',
  // fundo branco e borda roxa
  contorno: 'bg-branco border border-primaria text-texto enabled:hover:bg-fundo-suave-2',
}

export default function Button({ variante = 'primario', carregando = false, children, ...props }) {
  return (
    <button
      className={`${BASE} ${VARIANTES[variante]}`}
      {...props}
      disabled={carregando || props.disabled}
    >
      {children}
    </button>
  )
}
