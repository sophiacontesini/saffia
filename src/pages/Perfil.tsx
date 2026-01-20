import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container } from '../components/App.styled'
import { PageCard, PageTitle } from './Page.styled'
import {
  LoginForm,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  ErrorMessage,
  SuccessMessage
} from './Login.styled'

export default function Perfil() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setNome(user.nome || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!nome.trim()) {
      setError('Por favor, informe seu nome')
      setLoading(false)
      return
    }

    try {
      await updateProfile(nome.trim())
      setSuccess('Perfil atualizado com sucesso!')
      setTimeout(() => {
        navigate('/historico')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <PageCard>
        <PageTitle>Alterar Cadastro</PageTitle>
        <LoginForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
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
              disabled
              style={{ background: '#f7fafc', cursor: 'not-allowed' }}
            />
            <small style={{ color: '#718096', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              O email não pode ser alterado
            </small>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/historico')}
              style={{ marginTop: '12px', background: '#718096' }}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </LoginForm>
      </PageCard>
    </Container>
  )
}
