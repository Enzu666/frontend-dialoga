// ============================================================
// components/Divider
// Linha divisória com texto no meio (ex.: "ou continue com").
// Prop: texto (opcional; sem texto vira só uma linha).
// ============================================================
export default function Divider({ texto }) {
  return (
    <div className="flex items-center gap-3" role="separator">
      <span className="flex-1 h-px bg-borda-forte" />
      {texto && <span className="text-[10px] text-secundaria">{texto}</span>}
      <span className="flex-1 h-px bg-borda-forte" />
    </div>
  )
}
