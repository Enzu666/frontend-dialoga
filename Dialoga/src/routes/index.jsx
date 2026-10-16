import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from './RequireAuth'

// ---- Páginas públicas (qualquer um acessa, sem login) ----
import Login from '../pages/auth/Login'
import Cadastro from '../pages/auth/Cadastro'
import PrimeiroAcesso from '../pages/auth/PrimeiroAcesso'

// ---- Área do paciente ----
import LayoutPaciente from '../layouts/LayoutPaciente'
// As pastas de paciente e profissional têm páginas com o MESMO nome (Dashboard...).
// Por isso damos apelidos diferentes na importação: "PacDashboard" e "ProfDashboard".
import PacDashboard from '../pages/paciente/Dashboard'
import PacAgenda from '../pages/paciente/Agenda'
import PacTarefas from '../pages/paciente/Tarefas'
// ...importe aqui as outras páginas do paciente (Perfil, Relatorios, etc.)

// ---- Área do profissional ----
import LayoutProfissional from '../layouts/LayoutProfissional'
import ProfDashboard from '../pages/profissional/Dashboard'
import ProfPacientes from '../pages/profissional/Pacientes'
// ...importe aqui as outras páginas do profissional

export default function AppRoutes() {
  return (
    // <Routes> olha a URL atual e escolhe UMA <Route> que combine com ela
    <Routes>

      {/* ===== ROTAS PÚBLICAS =====
          Sem layout e sem porteiro. path = a URL, element = a tela mostrada. */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/primeiro-acesso" element={<PrimeiroAcesso />} />

      {/* ===== ÁREA DO PACIENTE (nivel 2) =====
          Esta <Route> não tem "path": ela só serve para colocar o porteiro
          na frente de tudo que está dentro dela. */}
      <Route element={<RequireAuth nivel={2} />}>

        {/* Qualquer URL que comece com /paciente usa o LayoutPaciente (sidebar etc.).
            As rotas filhas abaixo aparecem DENTRO do <Outlet /> do layout. */}
        <Route path="/paciente" element={<LayoutPaciente />}>

          {/* "index" = quando a URL for exatamente /paciente (sem nada depois).
              Redireciona para /paciente/dashboard, pra nunca ficar uma tela vazia. */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* path SEM barra no início = continua a partir do pai.
              "dashboard" vira /paciente/dashboard */}
          <Route path="dashboard" element={<PacDashboard />} />
          <Route path="agenda" element={<PacAgenda />} />
          <Route path="tarefas" element={<PacTarefas />} />
          {/* ...adicione aqui as outras páginas do paciente */}
        </Route>
      </Route>

      {/* ===== ÁREA DO PROFISSIONAL (nivel 1) =====
          Mesma ideia, mas com outro porteiro (nivel 1) e outro layout. */}
      <Route element={<RequireAuth nivel={1} />}>
        <Route path="/profissional" element={<LayoutProfissional />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProfDashboard />} />
          <Route path="pacientes" element={<ProfPacientes />} />
          {/* ...adicione aqui as outras páginas do profissional */}
        </Route>
      </Route>

      {/* ===== URL QUE NÃO EXISTE =====
          O "*" combina com qualquer coisa que nenhuma rota acima pegou.
          Em vez de mostrar tela em branco, mandamos pro login. */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}