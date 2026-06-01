import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import ScanPage from '../features/scan/pages/ScanPage'
import ResultsPage from '../features/results/pages/ResultsPage'
import ProtectedRoute from './ProtectedRoute'
import Navbar from '../components/Navbar'
import { useAuth } from '../features/auth/hooks/useAuth'
import Spinner from '../components/Spinner'

function AppLayout() {
  const { loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <Spinner text="loading..." />
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <div className="min-h-screen flex flex-col bg-base-100">
            <Navbar />
            <main className="flex-1 overflow-hidden">
              <ScanPage />
            </main>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/results" element={
        <ProtectedRoute>
          <div className="min-h-screen flex flex-col bg-base-100">
            <Navbar />
            <main className="flex-1 overflow-hidden">
              <ResultsPage />
            </main>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function Router() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-100">
        <AppLayout />
      </div>
    </BrowserRouter>
  )
}