import { Container } from '../components/App.styled'
import { PageCard, PageTitle, PageText } from '../pages/Page.styled'

export default function Clientes() {
  return (
    <Container>
      <PageCard>
        <PageTitle>Clientes</PageTitle>
        <PageText>
          Gerencie seus clientes cadastrados e adicione novos clientes ao sistema.
        </PageText>
        <PageText>
          Esta funcionalidade estará disponível em breve. Aqui você poderá visualizar,
          cadastrar, editar e gerenciar todas as informações dos seus clientes.
        </PageText>
      </PageCard>
    </Container>
  )
}

