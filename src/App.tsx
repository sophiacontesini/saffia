import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Header from './components/header/Header'
import Home from './pages/Home'
import Orcamentos from './pages/Orcamentos'
import Score from './pages/Score'
import Clientes from './pages/Clientes'
import Historico from './pages/Historico'
import Login from './pages/Login'

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Carregando...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Carregando...</div>
      </div>
    )
  }

  return (
    <Router>
      {user && <Header />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/historico" replace /> : <Login />} />
        <Route path="/cadastro" element={user ? <Navigate to="/historico" replace /> : <Cadastro />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/orcamentos" element={<ProtectedRoute><Orcamentos /></ProtectedRoute>} />
        <Route path="/score" element={<ProtectedRoute><Score /></ProtectedRoute>} />
        <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
        <Route path="/historico" element={<ProtectedRoute><Historico /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

function App() {
  return <AppRoutes />
}

export default App
