import { useState } from 'react'
import OperationForm from '../components/form/OperationForm'
import ResultCard from '../components/card/ResultCard'
import { calcularOperacao } from '../utils/calculations'
import { Container } from '../components/App.styled'

export default function Orcamentos() {
  const [resultado, setResultado] = useState<any>(null)
  const [dias, setDias] = useState<number>(0)
  const [taxas, setTaxas] = useState<any>(null)
  const [valor, setValor] = useState<number>(0)
  const [desagioPercent, setDesagioPercent] = useState<number>(0)
  const [cedente, setCedente] = useState<string>('')
  const [tipoDocumentoCedente, setTipoDocumentoCedente] = useState<'CPF' | 'CNPJ'>('CPF')
  const [documentoCedente, setDocumentoCedente] = useState<string>('')
  const [sacado, setSacado] = useState<string>('')
  const [tipoDocumentoSacado, setTipoDocumentoSacado] = useState<'CPF' | 'CNPJ'>('CPF')
  const [documentoSacado, setDocumentoSacado] = useState<string>('')

  return (
    <Container>
      <OperationForm
        onCalcular={(dados, diasCalculados) => {
          const res = calcularOperacao({ ...dados, dias: diasCalculados })
          setResultado(res)
          setDias(diasCalculados)
          setTaxas({
            iofFixoPercent: dados.iofFixoPercent,
            iofDiarioPercent: dados.iofDiarioPercent,
            tacPercent: dados.tacPercent,
            irpjPercent: dados.irpjPercent,
            issPercent: dados.issPercent,
            csllPercent: dados.csllPercent,
            pisPercent: dados.pisPercent,
            cofinsPercent: dados.cofinsPercent
          })
          setValor(dados.valor)
          setDesagioPercent(dados.desagioPercent)
          setCedente(dados.cedente)
          setTipoDocumentoCedente(dados.tipoDocumentoCedente)
          setDocumentoCedente(dados.documentoCedente)
          setSacado(dados.sacado)
          setTipoDocumentoSacado(dados.tipoDocumentoSacado)
          setDocumentoSacado(dados.documentoSacado)
        }}
      />

      {resultado && taxas && (
        <ResultCard
          resultado={resultado}
          dias={dias}
          taxas={taxas}
          valor={valor}
          desagioPercent={desagioPercent}
          cedente={cedente}
          tipoDocumentoCedente={tipoDocumentoCedente}
          documentoCedente={documentoCedente}
          sacado={sacado}
          tipoDocumentoSacado={tipoDocumentoSacado}
          documentoSacado={documentoSacado}
        />
      )}
    </Container>
  )
}

