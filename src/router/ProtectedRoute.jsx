import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import Spinner from '../components/Spinner'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Spinner text="checking session..." />
  if (!user) return <Navigate to="/login" replace />

  return children
}