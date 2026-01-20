import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.header`
  background: #ffffff;
  padding: 12px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid rgba(30, 107, 74, 0.1);
  min-height: 80px;

  @media (max-width: 768px) {
    padding: 12px 20px;
    flex-direction: column;
    gap: 16px;
    min-height: auto;
  }
`

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

export const Logo = styled.img`
  height: 100%;
  max-height: 70px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 50px;
  }
`

export const Nav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }
`

export const NavLink = styled(Link)<{ $active?: boolean }>`
  padding: 10px 20px;
  text-decoration: none;
  color: ${props => (props.$active ? '#ffffff' : '#2d3748')};
  background: ${props => (props.$active ? '#1e6b4a' : 'transparent')};
  border-radius: 8px;
  font-weight: ${props => (props.$active ? 600 : 500)};
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => (props.$active ? '#1e6b4a' : 'rgba(30, 107, 74, 0.1)')};
    color: ${props => (props.$active ? '#ffffff' : '#1e6b4a')};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`

