import { NavLink, Outlet } from 'react-router-dom'

export default function LayoutPaciente() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside>
        <NavLink to="/paciente/dashboard">Dashboard</NavLink>
        <NavLink to="/paciente/agenda">Agenda</NavLink>
        <NavLink to="/paciente/tarefas">Tarefas</NavLink>
      </aside>
      <main style={{ flex: 1 }}><Outlet /></main>
    </div>
  )
}