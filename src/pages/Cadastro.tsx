import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LoginContainer } from '../components/App.styled'
import { CadastroCard, PageTitle, LoginLogo } from './Page.styled'
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

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!nome.trim()) {
      setError('Por favor, informe seu nome')
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, nome.trim())
      navigate('/historico')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <CadastroCard>
        <LoginLogo src={logo} alt="Saffia Fomento Mercantil" />
        <PageTitle style={{ textAlign: 'left', marginBottom: '16px', fontSize: '2rem' }}>Criar Conta</PageTitle>
        <LoginForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormGroup>
            <Label>Nome</Label>
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome completo"
              autoComplete="name"
            />
          </FormGroup>

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
                autoComplete="new-password"
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
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </ButtonGroup>

          <SwitchMode>
            Já tem uma conta?{' '}
            <Link to="/login">Fazer login</Link>
          </SwitchMode>
        </LoginForm>
      </CadastroCard>
    </LoginContainer>
  )
}
