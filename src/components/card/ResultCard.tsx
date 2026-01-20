/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardTitle,
  Paragraph,
  Divider,
  Highlight,
  Profit,
  Section,
  SectionTitle,
  TaxRow,
  TaxLabel,
  TaxValue,
  TaxPercent,
  ExportButton,
  SaveButton,
  ButtonContainer
} from './ResultCard.styled'
import { exportToPDF } from '../../utils/pdfExport'
import { orcamentoService } from '../../services/orcamentoService'

interface Props {
  resultado: {
    desagio: number
    tac: number
    iofFixo: number
    iofDiario: number
    repasseIofTotal: number
    irpj: number
    iss: number
    csll: number
    pis: number
    cofins: number
    totalImpostosCedente: number
    totalImpostosGM: number
    liquidoCliente: number
    lucroLiquidoGM: number
  }
  dias: number
  taxas: {
    iofFixoPercent: number
    iofDiarioPercent: number
    tacPercent: number
    irpjPercent: number
    issPercent: number
    csllPercent: number
    pisPercent: number
    cofinsPercent: number
  }
  valor: number
  desagioPercent: number
  cedente: string
  tipoDocumentoCedente: 'CPF' | 'CNPJ'
  documentoCedente: string
  sacado: string
  tipoDocumentoSacado: 'CPF' | 'CNPJ'
  documentoSacado: string
  hideButtons?: boolean
}

const moeda = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ResultCard({
  resultado,
  dias,
  taxas,
  valor,
  desagioPercent,
  cedente,
  tipoDocumentoCedente,
  documentoCedente,
  sacado,
  tipoDocumentoSacado,
  documentoSacado,
  hideButtons = false
}: Props) {
  return (
    <Card>
      <CardTitle>Resultado da Operação</CardTitle>

      {cedente && (
        <Paragraph>
          <strong>Cedente:</strong> {cedente}
        </Paragraph>
      )}

      {documentoCedente && (
        <Paragraph>
          <strong>{tipoDocumentoCedente} do Cedente:</strong> {documentoCedente}
        </Paragraph>
      )}

      {sacado && (
        <Paragraph>
          <strong>Sacado:</strong> {sacado}
        </Paragraph>
      )}

      {documentoSacado && (
        <Paragraph>
          <strong>{tipoDocumentoSacado} do Sacado:</strong> {documentoSacado}
        </Paragraph>
      )}

      <Divider />

      <Paragraph>Dias até o vencimento: <strong>{dias}</strong></Paragraph>
      <Paragraph>Valor do Título: <strong>{moeda(valor)}</strong></Paragraph>
      <Paragraph>Deságio: <strong>{moeda(resultado.desagio)}</strong> ({desagioPercent}% mensal)</Paragraph>

      <Divider />

      {/* Seção do Cedente */}
      <Section>
        <SectionTitle>Despesas do Cedente</SectionTitle>
        
        <TaxRow>
          <TaxLabel>Deságio</TaxLabel>
          <TaxValue>
            {moeda(resultado.desagio)}
            <TaxPercent>({desagioPercent}% mensal)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>TAC</TaxLabel>
          <TaxValue>
            {moeda(resultado.tac)}
            <TaxPercent>({taxas.tacPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>IOF Fixo</TaxLabel>
          <TaxValue>
            {moeda(resultado.iofFixo)}
            <TaxPercent>({taxas.iofFixoPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>IOF Diário ({dias} dias)</TaxLabel>
          <TaxValue>
            {moeda(resultado.iofDiario)}
            <TaxPercent>({taxas.iofDiarioPercent}% ao dia)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <Divider compact />

        <TaxRow>
          <TaxLabel><strong>Total de Despesas do Cedente</strong></TaxLabel>
          <TaxValue><strong>{moeda(resultado.totalImpostosCedente)}</strong></TaxValue>
        </TaxRow>

        <Highlight compact>
          Valor Líquido ao Cliente: {moeda(resultado.liquidoCliente)}
        </Highlight>
      </Section>

      <Divider />

      {/* Seção da Saffia Fomento Mercantil */}
      <Section>
        <SectionTitle>Despesas da Saffia Fomento Mercantil</SectionTitle>
        
        <TaxRow>
          <TaxLabel>Repasse IOF Total</TaxLabel>
          <TaxValue>
            {moeda(resultado.repasseIofTotal)}
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>IRPJ</TaxLabel>
          <TaxValue>
            {moeda(resultado.irpj)}
            <TaxPercent>({taxas.irpjPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>ISS</TaxLabel>
          <TaxValue>
            {moeda(resultado.iss)}
            <TaxPercent>({taxas.issPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>CSLL</TaxLabel>
          <TaxValue>
            {moeda(resultado.csll)}
            <TaxPercent>({taxas.csllPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>PIS</TaxLabel>
          <TaxValue>
            {moeda(resultado.pis)}
            <TaxPercent>({taxas.pisPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <TaxRow>
          <TaxLabel>COFINS</TaxLabel>
          <TaxValue>
            {moeda(resultado.cofins)}
            <TaxPercent>({taxas.cofinsPercent}%)</TaxPercent>
          </TaxValue>
        </TaxRow>

        <Divider compact />

        <TaxRow>
          <TaxLabel><strong>Total de Impostos da Saffia Fomento Mercantil</strong></TaxLabel>
          <TaxValue><strong>{moeda(resultado.totalImpostosGM)}</strong></TaxValue>
        </TaxRow>

        <Profit compact>
          Lucro Líquido da Saffia Fomento Mercantil: {moeda(resultado.lucroLiquidoGM)}
        </Profit>
      </Section>

      {!hideButtons && (
        <>
      <Divider />

          <ButtonContainer>
            <SaveButton
              onClick={async () => {
                try {
                  await orcamentoService.salvarOrcamento({
                    resultado,
                    dias,
                    taxas,
                    valor,
                    desagioPercent,
                    cedente,
                    tipoDocumentoCedente,
                    documentoCedente,
                    sacado,
                    tipoDocumentoSacado,
                    documentoSacado
                  })
                  alert('Orçamento salvo com sucesso!')
                } catch (error: any) {
                  console.error('Erro ao salvar orçamento:', error)
                  alert(error.message || 'Erro ao salvar orçamento. Tente novamente.')
                }
              }}
            >
              Salvar
            </SaveButton>
      <ExportButton
        onClick={() =>
          exportToPDF({
            cedente,
            tipoDocumentoCedente,
            documentoCedente,
            sacado,
            tipoDocumentoSacado,
            documentoSacado,
            valor,
            dias,
            desagioPercent,
            resultado,
            taxas
          })
        }
      >
        Exportar para PDF
      </ExportButton>
          </ButtonContainer>
        </>
      )}
    </Card>
  )
}
  