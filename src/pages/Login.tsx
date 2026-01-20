import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LoginContainer } from '../components/App.styled'
import { LoginCard, LoginLogo } from './Page.styled'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import logo from '../assets/saffia-logo.png'
import {
  LoginForm,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  PasswordToggle,
  Button,
  ButtonGroup,
  ErrorMessage,
  SwitchMode
} from './Login.styled'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/historico')
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo src={logo} alt="Saffia Fomento Mercantil" />
        <LoginForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </FormGroup>

          <FormGroup>
            <Label>Senha</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
                autoComplete="current-password"
                style={{ paddingRight: '45px' }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </ButtonGroup>

          <SwitchMode>
            Não tem uma conta?{' '}
            <Link to="/cadastro">Criar conta</Link>
          </SwitchMode>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  )
}
