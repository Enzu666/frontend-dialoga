// ============================================================
// components/PontosProgresso
// Bolinhas de progresso (a atual vira uma "pílula" roxa).
// Só decorativo: quem informa a etapa para leitores de tela é o Stepper.
// Props:
//   total -> quantidade de bolinhas
//   atual -> número da bolinha ativa (começa em 1)
//   className -> classes extras (opcional)
// ============================================================
export default function PontosProgresso({ total, atual, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-[width,background-color] duration-200 ease-[ease] ${
            i + 1 === atual ? 'w-5 bg-primaria' : 'w-2 bg-borda'
          }`}
        />
      ))}
    </div>
  )
}
