import { Container } from '../components/App.styled'
import { PageCard, PageTitle, PageText } from './Page.styled'

export default function Score() {
  return (
    <Container>
      <PageCard>
        <PageTitle>Score</PageTitle>
        <PageText>Verifique aqui o score dos seus clientes cadastrados</PageText>
        <PageText>
          Esta funcionalidade estará disponível em breve. Aqui você poderá consultar
          e gerenciar os scores de crédito de todos os seus clientes.
        </PageText>
      </PageCard>
    </Container>
  )
}

