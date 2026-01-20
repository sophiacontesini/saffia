import styled from 'styled-components'

export const PageCard = styled.div`
  background: #ffffff;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 107, 74, 0.1);
  margin-top: 40px;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`

export const LoginCard = styled(PageCard)`
  max-width: 520px;
  width: 100%;
  min-height: 500px;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 48px 40px;

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: auto;
    padding: 32px 24px;
  }
`

export const CadastroCard = styled(PageCard)`
  max-width: 600px;
  width: 100%;
  min-height: 500px;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 48px 40px;

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: auto;
    padding: 32px 24px;
  }
`

export const LoginLogo = styled.img`
  width: 180px;
  height: auto;
  margin: 0 auto 32px;
  display: block;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 140px;
    margin-bottom: 24px;
  }
`

export const PageTitle = styled.h1`
  color: #1e6b4a;
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 24px;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

export const PageText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

