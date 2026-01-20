const STORAGE_KEY = 'saffia_orcamentos_historico'

export type StatusOrcamento = 'Cancelado' | 'Em Análise' | 'Concluído'

export interface HistoricoOrcamento {
  id: string
  data: string
  status: StatusOrcamento
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
}

export function salvarOrcamento(orcamento: Omit<HistoricoOrcamento, 'id' | 'data' | 'status'>): void {
  const historico = obterHistorico()
  const novoOrcamento: HistoricoOrcamento = {
    ...orcamento,
    id: Date.now().toString(),
    data: new Date().toLocaleString('pt-BR'),
    status: 'Em Análise'
  }
  historico.push(novoOrcamento)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historico))
}

export function atualizarStatusOrcamento(id: string, status: StatusOrcamento): void {
  const historico = obterHistorico()
  const historicoAtualizado = historico.map(orcamento =>
    orcamento.id === id ? { ...orcamento, status } : orcamento
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historicoAtualizado))
}

export function obterHistorico(): HistoricoOrcamento[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    const historico = JSON.parse(data) as HistoricoOrcamento[]
    const historicoAtualizado = historico.map((orcamento) => ({
      ...orcamento,
      status: (orcamento.status || 'Em Análise') as StatusOrcamento
    }))
    const precisaAtualizar = historico.some((orcamento) => !orcamento.status)
    if (precisaAtualizar) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historicoAtualizado))
    }
    return historicoAtualizado
  } catch {
    return []
  }
}

export function excluirOrcamento(id: string): void {
  const historico = obterHistorico()
  const historicoAtualizado = historico.filter(orcamento => orcamento.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historicoAtualizado))
}
