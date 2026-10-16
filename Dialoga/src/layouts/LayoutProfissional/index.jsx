import { Link, Outlet } from 'react-router-dom'

function LayoutProfissional() {
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
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutProfissional
