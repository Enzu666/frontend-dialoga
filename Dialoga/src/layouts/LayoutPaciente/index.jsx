import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LayoutPaciente() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // apaga a sessão salva e volta para a tela de login
  function sair() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside>
        <NavLink to="/paciente/dashboard">Dashboard</NavLink>
        <NavLink to="/paciente/agenda">Agenda</NavLink>
        <NavLink to="/paciente/tarefas">Tarefas</NavLink>
        <button onClick={sair}>Sair</button>
      </aside>
      <main style={{ flex: 1 }}><Outlet /></main>
    </div>
  )
}
