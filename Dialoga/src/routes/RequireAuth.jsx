import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RequireAuth({ nivel }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  if (auth.nivel !== nivel) return <Navigate to="/login" replace />
  return <Outlet />
}