import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { HiUser } from 'react-icons/hi'
import { HeaderContainer, LogoLink, Logo, Nav, NavLink, UserMenu, UserButton, UserGreeting, UserIcon, UserDropdown, DropdownItem } from './Header.styled'
import logo from '../../assets/saffia-logo.png'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
    setShowDropdown(false)
  }

  const handleEditProfile = () => {
    navigate('/perfil')
    setShowDropdown(false)
  }

  const getFirstName = (nome?: string) => {
    if (!nome) return 'Usuário'
    return nome.split(' ')[0]
  }

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo src={logo} alt="Saffia Fomento Mercantil" />
      </LogoLink>
      <Nav>
        <NavLink to="/" $active={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/orcamentos" $active={location.pathname === '/orcamentos'}>
          Orçamentos
        </NavLink>
        <NavLink to="/score" $active={location.pathname === '/score'}>
          Score
        </NavLink>
        <NavLink to="/clientes" $active={location.pathname === '/clientes'}>
          Clientes
        </NavLink>
        <NavLink
          to="/historico"
          $active={location.pathname === '/historico'}
        >
          Histórico
        </NavLink>
        {user && (
          <UserMenu ref={dropdownRef}>
            <UserButton onClick={() => setShowDropdown(!showDropdown)}>
              <UserIcon>
                <HiUser size={20} />
              </UserIcon>
              <UserGreeting>Olá, {getFirstName(user.nome)}</UserGreeting>
            </UserButton>
            {showDropdown && (
              <UserDropdown>
                <DropdownItem onClick={handleEditProfile}>
                  Alterar Cadastro
                </DropdownItem>
                <DropdownItem onClick={handleLogout} $danger>
                  Sair
                </DropdownItem>
              </UserDropdown>
            )}
          </UserMenu>
        )}
      </Nav>
    </HeaderContainer>
  )
}

