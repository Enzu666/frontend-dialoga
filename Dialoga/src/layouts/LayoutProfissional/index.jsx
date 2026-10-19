import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function LayoutProfissional() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // apaga a sessão salva e volta para a tela de login
  function sair() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <aside>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/profissional/dashboard">Dashboard</Link>
          <Link to="/profissional/agenda">Agenda</Link>
          <Link to="/profissional/pacientes">Pacientes</Link>
          <Link to="/profissional/tarefas">Tarefas</Link>
          <Link to="/profissional/notificacoes">Notificações</Link>
          <Link to="/profissional/perfil">Perfil</Link>
          <button onClick={sair}>Sair</button>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutProfissional
