import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 82px);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px;
    min-height: calc(100vh - 120px);
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`

export const Logo = styled.img`
  max-width: 300px;
  width: 100%;
  height: auto;
  object-fit: contain;
  
  @media (max-width: 768px) {
    max-width: 250px;
  }
  
  @media (max-width: 480px) {
    max-width: 200px;
  }
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #1e6b4a;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 30px;
  }
`

