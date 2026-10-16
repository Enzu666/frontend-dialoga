import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LayoutPaciente() {
  // Pegamos o logout para o botão "Sair"
  const { logout } = useAuth()

  return (
    // display: 'flex' coloca a sidebar e o conteúdo lado a lado.
    // minHeight: '100vh' faz a moldura ocupar a altura inteira da tela.
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* SIDEBAR: menu lateral, fixo. Aparece em TODAS as páginas do paciente. */}
      <aside style={{ width: 220, padding: 16 }}>

        {/* NavLink é um <a> (link) especial do React Router:
            1) troca de página SEM recarregar o site inteiro;
            2) sabe qual link está "ativo" (útil para destacar o item atual no CSS).
            Aqui usamos o caminho completo, com a barra inicial. */}
        <NavLink to="/paciente/dashboard">Dashboard</NavLink><br />
        <NavLink to="/paciente/agenda">Agenda</NavLink><br />
        <NavLink to="/paciente/tarefas">Tarefas</NavLink><br />

        <button onClick={logout}>Sair</button>
      </aside>

      {/* CONTEÚDO: flex: 1 faz ocupar todo o espaço que sobrou ao lado da sidebar */}
      <main style={{ flex: 1, padding: 16 }}>

        {/* AQUI é a mágica: o <Outlet /> é substituído pela página da rota atual.
            URL /paciente/agenda → aqui dentro aparece <Agenda />
            URL /paciente/tarefas → aqui dentro aparece <Tarefas /> */}
        <Outlet />
      </main>
    </div>
  )
}