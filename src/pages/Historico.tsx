import React, { useState, useEffect, useCallback } from 'react'
import { Container } from '../components/App.styled'
import { PageCard, PageTitle } from '../pages/Page.styled'
import { orcamentoService } from '../services/orcamentoService'
import type { HistoricoOrcamento, StatusOrcamento } from '../utils/history'
import { exportToPDF } from '../utils/pdfExport'
import { HiChevronDown, HiChevronRight, HiTrash, HiDocumentDownload, HiSearch } from 'react-icons/hi'
import {
  TableWrapper,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  ExpandButton,
  DeleteButton,
  ExportButton,
  StatusSelectWrapper,
  StatusSelect,
  ExpandedContent,
  EmptyMessage,
  FilterContainer,
  FilterInput,
  FilterIcon,
  MobileCardContainer,
  MobileCard,
  MobileCardHeader,
  MobileCardInfo,
  MobileCardTitle,
  MobileCardSubtitle,
  MobileCardValue,
  MobileCardActions,
  MobileCardRow,
  MobileCardLabel,
  MobileCardContent
} from './Historico.styled'
import ResultCard from '../components/card/ResultCard'

export default function Historico() {
  const [historico, setHistorico] = useState<HistoricoOrcamento[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<string>('')

  const loadHistorico = useCallback(async () => {
    try {
      const data = await orcamentoService.obterHistorico()
      setHistorico(data)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadHistorico()
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [loadHistorico])

  const historicoFiltrado = historico.filter((orcamento) => {
    if (!filtro.trim()) return true
    
    const termoBusca = filtro.toLowerCase()
    const valorFormatado = orcamento.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).toLowerCase()
    
    return (
      orcamento.cedente?.toLowerCase().includes(termoBusca) ||
      orcamento.sacado?.toLowerCase().includes(termoBusca) ||
      orcamento.documentoCedente?.toLowerCase().includes(termoBusca) ||
      orcamento.documentoSacado?.toLowerCase().includes(termoBusca) ||
      orcamento.data.toLowerCase().includes(termoBusca) ||
      orcamento.status.toLowerCase().includes(termoBusca) ||
      valorFormatado.includes(termoBusca)
    )
  })

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      try {
        await orcamentoService.excluirOrcamento(id)
        await loadHistorico()
        if (expandedId === id) {
          setExpandedId(null)
        }
      } catch (error) {
        console.error('Erro ao excluir orçamento:', error)
        alert('Erro ao excluir orçamento. Tente novamente.')
      }
    }
  }

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleExportPDF = (orcamento: HistoricoOrcamento) => {
    exportToPDF({
      cedente: orcamento.cedente,
      tipoDocumentoCedente: orcamento.tipoDocumentoCedente,
      documentoCedente: orcamento.documentoCedente,
      sacado: orcamento.sacado,
      tipoDocumentoSacado: orcamento.tipoDocumentoSacado,
      documentoSacado: orcamento.documentoSacado,
      valor: orcamento.valor,
      dias: orcamento.dias,
      desagioPercent: orcamento.desagioPercent,
      resultado: orcamento.resultado,
      taxas: orcamento.taxas
    })
  }

  const handleStatusChange = async (id: string, status: StatusOrcamento) => {
    try {
      await orcamentoService.atualizarStatus(id, status)
      await loadHistorico()
    } catch (error: unknown) {
      console.error('Erro ao atualizar status:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar status. Verifique se as políticas RLS estão configuradas corretamente.'
      alert(errorMessage)
    }
  }

  return (
    <Container>
      <PageCard>
        <PageTitle>Histórico</PageTitle>
        {historico.length > 0 && (
          <FilterContainer>
            <FilterIcon>
              <HiSearch size={20} />
            </FilterIcon>
            <FilterInput
              type="text"
              placeholder="Buscar por cedente, sacado, valor, data, status..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </FilterContainer>
        )}
        {historico.length === 0 ? (
          <EmptyMessage>
            Nenhum orçamento salvo ainda. Os orçamentos salvos aparecerão aqui.
          </EmptyMessage>
        ) : historicoFiltrado.length === 0 ? (
          <EmptyMessage>
            Nenhum orçamento encontrado com o filtro "{filtro}".
          </EmptyMessage>
        ) : (
          <>
            <TableWrapper>
              <Table>
                <thead>
                  <TableHeader>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Data</TableHeaderCell>
                    <TableHeaderCell>Cedente</TableHeaderCell>
                    <TableHeaderCell>Valor</TableHeaderCell>
                    <TableHeaderCell>Ações</TableHeaderCell>
                  </TableHeader>
                </thead>
                <tbody>
                  {historicoFiltrado.map((orcamento) => (
                    <React.Fragment key={orcamento.id}>
                      <TableRow>
                        <TableCell>
                          <StatusSelectWrapper $status={orcamento.status || 'Em Análise'}>
                            <StatusSelect
                              value={orcamento.status || 'Em Análise'}
                              onChange={(e) => handleStatusChange(orcamento.id, e.target.value as StatusOrcamento)}
                              $status={orcamento.status || 'Em Análise'}
                            >
                              <option value="Cancelado">Cancelado</option>
                              <option value="Em Análise">Em Análise</option>
                              <option value="Concluído">Concluído</option>
                            </StatusSelect>
                          </StatusSelectWrapper>
                        </TableCell>
                        <TableCell>{orcamento.data}</TableCell>
                        <TableCell>{orcamento.cedente || '-'}</TableCell>
                        <TableCell>
                          {orcamento.valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </TableCell>
                        <TableCell>
                          <ExpandButton
                            onClick={() => handleToggleExpand(orcamento.id)}
                            $expanded={expandedId === orcamento.id}
                          >
                            {expandedId === orcamento.id ? (
                              <HiChevronDown size={18} />
                            ) : (
                              <HiChevronRight size={18} />
                            )}
                          </ExpandButton>
                          <ExportButton onClick={() => handleExportPDF(orcamento)}>
                            <HiDocumentDownload size={16} />
                          </ExportButton>
                          <DeleteButton onClick={() => handleExcluir(orcamento.id)}>
                            <HiTrash size={16} />
                          </DeleteButton>
                        </TableCell>
                      </TableRow>
                      {expandedId === orcamento.id && (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <ExpandedContent>
                              <ResultCard
                                resultado={orcamento.resultado}
                                dias={orcamento.dias}
                                taxas={orcamento.taxas}
                                valor={orcamento.valor}
                                desagioPercent={orcamento.desagioPercent}
                                cedente={orcamento.cedente}
                                tipoDocumentoCedente={orcamento.tipoDocumentoCedente}
                                documentoCedente={orcamento.documentoCedente}
                                sacado={orcamento.sacado}
                                tipoDocumentoSacado={orcamento.tipoDocumentoSacado}
                                documentoSacado={orcamento.documentoSacado}
                                hideButtons={true}
                              />
                            </ExpandedContent>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <MobileCardContainer>
              {historicoFiltrado.map((orcamento) => (
                <MobileCard key={orcamento.id}>
                  <MobileCardHeader>
                    <MobileCardInfo>
                      <MobileCardTitle>{orcamento.cedente || 'Sem cedente'}</MobileCardTitle>
                      <MobileCardSubtitle>{orcamento.data}</MobileCardSubtitle>
                      <MobileCardValue>
                        {orcamento.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </MobileCardValue>
                    </MobileCardInfo>
                    <MobileCardActions>
                      <ExpandButton
                        onClick={() => handleToggleExpand(orcamento.id)}
                        $expanded={expandedId === orcamento.id}
                      >
                        {expandedId === orcamento.id ? (
                          <HiChevronDown size={16} />
                        ) : (
                          <HiChevronRight size={16} />
                        )}
                      </ExpandButton>
                      <ExportButton onClick={() => handleExportPDF(orcamento)}>
                        <HiDocumentDownload size={16} />
                      </ExportButton>
                      <DeleteButton onClick={() => handleExcluir(orcamento.id)}>
                        <HiTrash size={16} />
                      </DeleteButton>
                    </MobileCardActions>
                  </MobileCardHeader>
                  
                  <MobileCardRow>
                    <MobileCardLabel>Status:</MobileCardLabel>
                    <MobileCardContent>
                      <StatusSelectWrapper $status={orcamento.status || 'Em Análise'}>
                        <StatusSelect
                          value={orcamento.status || 'Em Análise'}
                          onChange={(e) => handleStatusChange(orcamento.id, e.target.value as StatusOrcamento)}
                          $status={orcamento.status || 'Em Análise'}
                        >
                          <option value="Cancelado">Cancelado</option>
                          <option value="Em Análise">Em Análise</option>
                          <option value="Concluído">Concluído</option>
                        </StatusSelect>
                      </StatusSelectWrapper>
                    </MobileCardContent>
                  </MobileCardRow>

                  {expandedId === orcamento.id && (
                    <ExpandedContent style={{ marginTop: '16px', marginBottom: 0 }}>
                      <ResultCard
                        resultado={orcamento.resultado}
                        dias={orcamento.dias}
                        taxas={orcamento.taxas}
                        valor={orcamento.valor}
                        desagioPercent={orcamento.desagioPercent}
                        cedente={orcamento.cedente}
                        tipoDocumentoCedente={orcamento.tipoDocumentoCedente}
                        documentoCedente={orcamento.documentoCedente}
                        sacado={orcamento.sacado}
                        tipoDocumentoSacado={orcamento.tipoDocumentoSacado}
                        documentoSacado={orcamento.documentoSacado}
                        hideButtons={true}
                      />
                    </ExpandedContent>
                  )}
                </MobileCard>
              ))}
            </MobileCardContainer>
          </>
        )}
      </PageCard>
    </Container>
  )
}

