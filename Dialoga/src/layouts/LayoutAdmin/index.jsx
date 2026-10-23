import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function LayoutAdmin() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <aside>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/dashboard">Dashboard</Link>
          <button onClick={sair}>Sair</button>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
