import styled from 'styled-components'

export const WelcomeCard = styled.div`
  background: #ffffff;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 107, 74, 0.1);
  text-align: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    padding: 32px 24px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    margin-top: 16px;
    border-radius: 12px;
  }
`

export const WelcomeTitle = styled.h1`
  color: #1e6b4a;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 24px;
  letter-spacing: -0.5px;


  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const WelcomeText = styled.p`
  color: #4a5568;
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 16px;
  text-align: justify;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const Logo = styled.img`
  height: 120px;
  width: auto;
  object-fit: contain;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    height: 80px;
    margin-bottom: 24px;
  }
`

