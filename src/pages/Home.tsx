import { Container } from '../components/App.styled'
import { WelcomeCard, WelcomeTitle, WelcomeText, Logo } from './Home.styled'
import logo from '../assets/saffia-logo.png'

export default function Home() {
  return (
    <Container>
      <WelcomeCard>
        <Logo src={logo} alt="Saffia Fomento Mercantil" />
        <WelcomeTitle>Bem-vindo à Saffia Fomento Mercantil</WelcomeTitle>
        <WelcomeText>
          Somos especialistas em soluções de fomento mercantil, oferecendo as melhores
          condições para impulsionar o crescimento do seu negócio.
        </WelcomeText>
        <WelcomeText>
          Utilize nosso sistema para calcular orçamentos personalizados, gerenciar seus
          clientes e acompanhar o histórico de operações.
        </WelcomeText>
      </WelcomeCard>
    </Container>
  )
}

