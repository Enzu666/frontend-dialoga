import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppRoutes from './routes'

export default function App() {
  return (
    // BrowserRouter: liga o sistema de rotas. Ele "escuta" a URL do navegador.
    // Sem ele, nenhum <Route>, <Link> ou <Outlet> funciona.
    <BrowserRouter>

      {/* AuthProvider: guarda quem está logado (token e nível).
          Fica POR DENTRO do BrowserRouter porque, depois, vamos usar
          navegação dentro dele. Tudo que estiver aqui dentro consegue
          acessar o login/logout usando useAuth(). */}
      <AuthProvider>

        {/* AppRoutes: o arquivo com o "mapa" de todas as URLs do site */}
        <AppRoutes />

      </AuthProvider>
    </BrowserRouter>
  )
}