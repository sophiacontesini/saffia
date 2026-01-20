/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { applyDocumentMask, formatCurrency, parseCurrency } from '../../utils/masks'
import {
  FaUser,
  FaBuilding,
  FaIdCard,
  FaMoneyBillWave,
  FaPercent,
  FaFileInvoiceDollar,
  FaReceipt
} from 'react-icons/fa'
import {
  Card,
  CardTitle,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  Select,
  Grid,
  GridItem,
  Row,
  RowEqual,
  FieldGroup
} from './OperationForm.styled'

interface Props {
  onCalcular: (
    dados: {
      valor: number
      desagioPercent: number
      tacPercent: number
      iofFixoPercent: number
      iofDiarioPercent: number
      irpjPercent: number
      issPercent: number
      csllPercent: number
      pisPercent: number
      cofinsPercent: number
      cedente: string
      tipoDocumentoCedente: 'CPF' | 'CNPJ'
      documentoCedente: string
      sacado: string
      tipoDocumentoSacado: 'CPF' | 'CNPJ'
      documentoSacado: string
    },
    dias: number
  ) => void
}

export default function OperationForm({ onCalcular }: Props) {
  const [cedente, setCedente] = useState('')
  const [tipoDocumentoCedente, setTipoDocumentoCedente] = useState<'CPF' | 'CNPJ'>('CPF')
  const [documentoCedente, setDocumentoCedente] = useState('')
  const [sacado, setSacado] = useState('')
  const [tipoDocumentoSacado, setTipoDocumentoSacado] = useState<'CPF' | 'CNPJ'>('CPF')
  const [documentoSacado, setDocumentoSacado] = useState('')
  const [valor, setValor] = useState(0)
  const [valorFormatado, setValorFormatado] = useState('')
  const [vencimento, setVencimento] = useState('')
  const [desagioPercent, setDesagioPercent] = useState(3)
  const [tacPercent, setTacPercent] = useState(1)
  const [iofFixoPercent, setIofFixoPercent] = useState(0.38)
  const [iofDiarioPercent, setIofDiarioPercent] = useState(0.0041)
  const [irpjPercent, setIrpjPercent] = useState(15)
  const [issPercent, setIssPercent] = useState(5)
  const [csllPercent, setCsllPercent] = useState(9)
  const [pisPercent, setPisPercent] = useState(0.65)
  const [cofinsPercent, setCofinsPercent] = useState(3)

  useEffect(() => {
    if (!valor || !vencimento) return

    const hoje = new Date()
    const dataVenc = new Date(vencimento)

    const dias = Math.max(
      0,
      Math.ceil(
        (dataVenc.getTime() - hoje.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    )

    onCalcular(
      {
        valor,
        desagioPercent,
        tacPercent,
        iofFixoPercent,
        iofDiarioPercent,
        irpjPercent,
        issPercent,
        csllPercent,
        pisPercent,
        cofinsPercent,
        cedente,
        tipoDocumentoCedente,
        documentoCedente,
        sacado,
        tipoDocumentoSacado,
        documentoSacado
      },
      dias
    )
  }, [
    valor,
    vencimento,
    desagioPercent,
    tacPercent,
    iofFixoPercent,
    iofDiarioPercent,
    irpjPercent,
    issPercent,
    csllPercent,
    pisPercent,
    cofinsPercent,
    cedente,
    tipoDocumentoCedente,
    documentoCedente,
    sacado,
    tipoDocumentoSacado,
    documentoSacado
  ])

  const handleDocumentChange = (value: string, tipo: 'CPF' | 'CNPJ', isCedente: boolean) => {
    const masked = applyDocumentMask(value, tipo)
    if (isCedente) {
      setDocumentoCedente(masked)
    } else {
      setDocumentoSacado(masked)
    }
  }

  const handleTipoDocumentoChange = (tipo: 'CPF' | 'CNPJ', isCedente: boolean) => {
    if (isCedente) {
      setTipoDocumentoCedente(tipo)
      setDocumentoCedente('')
    } else {
      setTipoDocumentoSacado(tipo)
      setDocumentoSacado('')
    }
  }

  const handleValorChange = (value: string) => {
    const formatted = formatCurrency(value)
    setValorFormatado(formatted)
    const numericValue = parseCurrency(value)
    setValor(numericValue)
  }

  return (
    <Card>
      <CardTitle>Dados da Operação</CardTitle>

      <Label>Cedente</Label>
      <InputWrapper>
        <InputIcon>
          <FaUser />
        </InputIcon>
        <Input hasIcon value={cedente} onChange={e => setCedente(e.target.value)} placeholder="Nome do cedente" />
      </InputWrapper>

      <Row>
        <FieldGroup>
          <Label>Tipo de Documento do Cedente</Label>
          <InputWrapper>
            <InputIcon>
              <FaIdCard />
            </InputIcon>
            <Select
              hasIcon
              value={tipoDocumentoCedente}
              onChange={e => handleTipoDocumentoChange(e.target.value as 'CPF' | 'CNPJ', true)}
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </Select>
          </InputWrapper>
        </FieldGroup>
        <FieldGroup>
          <Label>{tipoDocumentoCedente} do Cedente</Label>
          <InputWrapper>
            <InputIcon>
              <FaIdCard />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              value={documentoCedente}
              onChange={e => handleDocumentChange(e.target.value, tipoDocumentoCedente, true)}
              placeholder={tipoDocumentoCedente === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
              maxLength={tipoDocumentoCedente === 'CPF' ? 14 : 18}
            />
          </InputWrapper>
        </FieldGroup>
      </Row>

      <Label>Sacado</Label>
      <InputWrapper>
        <InputIcon>
          <FaBuilding />
        </InputIcon>
        <Input hasIcon value={sacado} onChange={e => setSacado(e.target.value)} placeholder="Nome do sacado" />
      </InputWrapper>

      <Row>
        <FieldGroup>
          <Label>Tipo de Documento do Sacado</Label>
          <InputWrapper>
            <InputIcon>
              <FaIdCard />
            </InputIcon>
            <Select
              hasIcon
              value={tipoDocumentoSacado}
              onChange={e => handleTipoDocumentoChange(e.target.value as 'CPF' | 'CNPJ', false)}
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </Select>
          </InputWrapper>
        </FieldGroup>
        <FieldGroup>
          <Label>{tipoDocumentoSacado} do Sacado</Label>
          <InputWrapper>
            <InputIcon>
              <FaIdCard />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              value={documentoSacado}
              onChange={e => handleDocumentChange(e.target.value, tipoDocumentoSacado, false)}
              placeholder={tipoDocumentoSacado === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
              maxLength={tipoDocumentoSacado === 'CPF' ? 14 : 18}
            />
          </InputWrapper>
        </FieldGroup>
      </Row>

      <RowEqual>
        <FieldGroup>
          <Label>Valor do Título</Label>
          <InputWrapper>
            <InputIcon>
              <FaMoneyBillWave />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              value={valorFormatado}
              onChange={e => handleValorChange(e.target.value)}
              placeholder="0,00"
            />
          </InputWrapper>
        </FieldGroup>
        <FieldGroup>
          <Label>Data de Vencimento</Label>
          <Input
            type="date"
            value={vencimento}
            onChange={e => setVencimento(e.target.value)}
          />
        </FieldGroup>
      </RowEqual>

      <Grid columns={3}>
        <GridItem>
          <Label>Deságio (mensal)</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={desagioPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setDesagioPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>TAC</Label>
          <InputWrapper>
            <InputIcon>
              <FaReceipt />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={tacPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setTacPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>IOF Fixo</Label>
          <InputWrapper>
            <InputIcon>
              <FaFileInvoiceDollar />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={iofFixoPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setIofFixoPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>IOF Diário</Label>
          <InputWrapper>
            <InputIcon>
              <FaFileInvoiceDollar />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={iofDiarioPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setIofDiarioPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>IRPJ</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={irpjPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setIrpjPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>ISS</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={issPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setIssPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>CSLL</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={csllPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setCsllPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>PIS</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={pisPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setPisPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>

        <GridItem>
          <Label>COFINS</Label>
          <InputWrapper>
            <InputIcon>
              <FaPercent />
            </InputIcon>
            <Input
              hasIcon
              type="text"
              inputMode="numeric"
              value={cofinsPercent}
              onChange={e => {
                const num = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.')
                if (num === '' || !isNaN(Number(num))) {
                  setCofinsPercent(num === '' ? 0 : Number(num))
                }
              }}
              placeholder="%"
            />
          </InputWrapper>
        </GridItem>
      </Grid>
    </Card>
  )
}
