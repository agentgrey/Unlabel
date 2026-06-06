import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import ScanPage from '../features/scan/pages/ScanPage'
import ResultsPage from '../features/results/pages/ResultsPage'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../features/auth/hooks/useAuth'

function AppLayout() {
  const { loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">loading...</p>
      </div>
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <ScanPage />
        </ProtectedRoute>
      } />
      <Route path="/results" element={
        <ProtectedRoute>
          <ResultsPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function Router() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <AppLayout />
      </div>
    </BrowserRouter>
  )
}