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
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 16px;
    min-height: auto;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    gap: 12px;
  }
`

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
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
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 4px;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 2px;
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
    flex: 1;
    text-align: center;
    min-width: 0;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 11px;
  }
`

export const UserMenu = styled.div`
  position: relative;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
    margin-top: 8px;
    width: 100%;
  }
`

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(45, 134, 89, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

export const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d8659 0%, #1e6b4a 100%);
  color: white;
`

export const UserGreeting = styled.span`
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
  }
`

export const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: none;
  text-align: left;
  font-size: 14px;
  color: ${props => props.$danger ? '#e53e3e' : '#4a5568'};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.$danger ? '#fee2e2' : '#f7fafc'};
  }

  &:first-child {
    border-bottom: 1px solid #e2e8f0;
  }
`
