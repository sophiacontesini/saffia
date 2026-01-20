import { supabase } from '../lib/supabase'
import type { HistoricoOrcamento, StatusOrcamento } from '../utils/history'

interface OrcamentoDB {
  id: string
  user_id: string
  data: string
  status: StatusOrcamento
  valor: number
  dias: number
  desagio_percent: number
  cedente: string | null
  tipo_documento_cedente: 'CPF' | 'CNPJ' | null
  documento_cedente: string | null
  sacado: string | null
  tipo_documento_sacado: 'CPF' | 'CNPJ' | null
  documento_sacado: string | null
  resultado: any
  taxas: any
  created_at: string
  updated_at: string
}

function dbToHistorico(db: OrcamentoDB): HistoricoOrcamento {
  return {
    id: db.id,
    data: new Date(db.data).toLocaleString('pt-BR'),
    status: db.status,
    valor: Number(db.valor),
    dias: db.dias,
    desagioPercent: Number(db.desagio_percent),
    cedente: db.cedente || '',
    tipoDocumentoCedente: db.tipo_documento_cedente || 'CPF',
    documentoCedente: db.documento_cedente || '',
    sacado: db.sacado || '',
    tipoDocumentoSacado: db.tipo_documento_sacado || 'CPF',
    documentoSacado: db.documento_sacado || '',
    resultado: db.resultado,
    taxas: db.taxas
  }
}

export const orcamentoService = {
  async salvarOrcamento(orcamento: Omit<HistoricoOrcamento, 'id' | 'data' | 'status'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { data, error } = await supabase
      .from('orcamentos')
      .insert({
        user_id: user.id,
        valor: orcamento.valor,
        dias: orcamento.dias,
        desagio_percent: orcamento.desagioPercent,
        cedente: orcamento.cedente || null,
        tipo_documento_cedente: orcamento.tipoDocumentoCedente || null,
        documento_cedente: orcamento.documentoCedente || null,
        sacado: orcamento.sacado || null,
        tipo_documento_sacado: orcamento.tipoDocumentoSacado || null,
        documento_sacado: orcamento.documentoSacado || null,
        resultado: orcamento.resultado,
        taxas: orcamento.taxas,
        status: 'Em Análise'
      })
      .select()
      .single()

    if (error) throw error
    return dbToHistorico(data as OrcamentoDB)
  },

  async obterHistorico(): Promise<HistoricoOrcamento[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')
      .eq('user_id', user.id)
      .order('data', { ascending: false })

    if (error) throw error
    return (data || []).map(dbToHistorico)
  },

  async excluirOrcamento(id: string) {
    const { error } = await supabase
      .from('orcamentos')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async atualizarStatus(id: string, status: StatusOrcamento) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { error: rpcError } = await supabase.rpc('atualizar_status_orcamento', {
      orcamento_id: id,
      novo_status: status
    })

    if (rpcError) {
      console.log('RPC não disponível, tentando UPDATE direto:', rpcError)
      
      const { data, error } = await supabase
        .from('orcamentos')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Erro detalhado ao atualizar status:', error)
        throw error
      }
      
      return data
    }

    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Erro ao buscar registro atualizado:', error)
      throw error
    }

    return data
  }
}
