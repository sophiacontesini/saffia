import jsPDF from 'jspdf'

interface PDFData {
  cedente: string
  tipoDocumentoCedente: 'CPF' | 'CNPJ'
  documentoCedente: string
  sacado: string
  tipoDocumentoSacado: 'CPF' | 'CNPJ'
  documentoSacado: string
  valor: number
  dias: number
  desagioPercent: number
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
}

const moeda = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function exportToPDF(data: PDFData) {
  const doc = new jsPDF()
  let yPosition = 20
  const margin = 20
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 107, 74) // Verde escuro
  doc.text('Saffia Fomento Mercantil', margin, yPosition)
  yPosition += 10

  doc.setFontSize(16)
  doc.setTextColor(45, 134, 89) // Verde médio
  doc.text('Resultado da Operação', margin, yPosition)
  yPosition += 15
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  if (data.cedente) {
    doc.setFont('helvetica', 'bold')
    doc.text('Cedente:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(data.cedente, margin + 30, yPosition)
    yPosition += 7
  }

  if (data.documentoCedente) {
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.tipoDocumentoCedente} do Cedente:`, margin, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(data.documentoCedente, margin + 50, yPosition)
    yPosition += 7
  }

  if (data.sacado) {
    doc.setFont('helvetica', 'bold')
    doc.text('Sacado:', margin, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(data.sacado, margin + 30, yPosition)
    yPosition += 7
  }

  if (data.documentoSacado) {
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.tipoDocumentoSacado} do Sacado:`, margin, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(data.documentoSacado, margin + 50, yPosition)
    yPosition += 7
  }

  yPosition += 5
  doc.setFont('helvetica', 'bold')
  doc.text('Dados da Operação', margin, yPosition)
  yPosition += 7
  doc.setFont('helvetica', 'normal')

  doc.text(`Dias até o vencimento: ${data.dias}`, margin, yPosition)
  yPosition += 7

  doc.text(`Valor do Título: ${moeda(data.valor)}`, margin, yPosition)
  yPosition += 7

  doc.text(
    `Deságio: ${moeda(data.resultado.desagio)} (${data.desagioPercent}% mensal)`,
    margin,
    yPosition
  )
  yPosition += 10
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(30, 107, 74) // Verde escuro
  doc.text('Despesas do Cedente', margin, yPosition)
  yPosition += 8
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  const addTaxRow = (label: string, value: number, percent: number | string) => {
    const text = percent ? `${label}: ${moeda(value)} (${percent})` : `${label}: ${moeda(value)}`
    doc.text(text, margin + 5, yPosition)
    yPosition += 6
  }

  addTaxRow('Deságio', data.resultado.desagio, `${data.desagioPercent}% mensal`)
  addTaxRow('TAC', data.resultado.tac, `${data.taxas.tacPercent}%`)
  addTaxRow('IOF Fixo', data.resultado.iofFixo, data.taxas.iofFixoPercent)
  addTaxRow(
    `IOF Diário (${data.dias} dias)`,
    data.resultado.iofDiario,
    data.taxas.iofDiarioPercent
  )

  yPosition += 3
  doc.setFont('helvetica', 'bold')
  doc.text(
    `Total de Despesas do Cedente: ${moeda(data.resultado.totalImpostosCedente)}`,
    margin + 5,
    yPosition
  )
  yPosition += 8

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(45, 134, 89) // Verde médio
  doc.text(
    `Valor Líquido ao Cliente: ${moeda(data.resultado.liquidoCliente)}`,
    margin,
    yPosition
  )
  yPosition += 15
  doc.setTextColor(0, 0, 0)

  if (yPosition > 250) {
    doc.addPage()
    yPosition = 20
  }
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(30, 107, 74) // Verde escuro
  doc.text('Despesas da Saffia Fomento Mercantil', margin, yPosition)
  yPosition += 8
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  addTaxRow('Repasse IOF Total', data.resultado.repasseIofTotal, '')
  addTaxRow('IRPJ', data.resultado.irpj, data.taxas.irpjPercent)
  addTaxRow('ISS', data.resultado.iss, data.taxas.issPercent)
  addTaxRow('CSLL', data.resultado.csll, data.taxas.csllPercent)
  addTaxRow('PIS', data.resultado.pis, data.taxas.pisPercent)
  addTaxRow('COFINS', data.resultado.cofins, data.taxas.cofinsPercent)

  yPosition += 3
  doc.setFont('helvetica', 'bold')
  doc.text(
    `Total de Impostos da Saffia Fomento Mercantil: ${moeda(data.resultado.totalImpostosGM)}`,
    margin + 5,
    yPosition
  )
  yPosition += 8

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 107, 74) // Verde escuro
  doc.text(
    `Lucro Líquido da Saffia Fomento Mercantil: ${moeda(data.resultado.lucroLiquidoGM)}`,
    margin,
    yPosition
  )

  yPosition += 15
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(128, 128, 128)
  const dataGeracao = new Date().toLocaleString('pt-BR')
  doc.text(`Gerado em: ${dataGeracao}`, margin, yPosition)

  const fileName = `Resultado_Operacao_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

