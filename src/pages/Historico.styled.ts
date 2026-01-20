import styled from 'styled-components'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 24px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 600px;
`

export const MobileCardContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 24px;
  }
`

export const MobileCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`

export const MobileCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`

export const MobileCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const MobileCardTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #2d3748;
  margin-bottom: 4px;
  word-break: break-word;
`

export const MobileCardSubtitle = styled.div`
  font-size: 13px;
  color: #718096;
  margin-bottom: 8px;
`

export const MobileCardValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e6b4a;
  margin-top: 8px;
`

export const MobileCardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`

export const MobileCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f7fafc;

  &:last-child {
    border-bottom: none;
  }
`

export const MobileCardLabel = styled.span`
  font-size: 13px;
  color: #718096;
  font-weight: 500;
`

export const MobileCardContent = styled.span`
  font-size: 14px;
  color: #4a5568;
  text-align: right;
  word-break: break-word;
`

export const TableHeader = styled.tr`
  background: linear-gradient(135deg, #2d8659 0%, #1e6b4a 100%);
  color: white;

  @media (max-width: 768px) {
    display: none;
  }
`

export const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.3px;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(45, 134, 89, 0.03);
  }

  &:last-child {
    border-bottom: none;
  }
`

export const TableCell = styled.td`
  padding: 16px;
  color: #4a5568;
  font-size: 15px;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ExpandButton = styled.button<{ $expanded: boolean }>`
  background: transparent;
  border: 1.5px solid #2d8659;
  color: #2d8659;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #2d8659;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(45, 134, 89, 0.3);
  }

  ${props => props.$expanded && `
    background: #2d8659;
    color: white;
  `}

  &:active {
    transform: scale(0.95);
  }

  svg {
    stroke-width: 2.5;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    margin-right: 6px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const ExportButton = styled.button`
  background: transparent;
  border: 1.5px solid rgb(33, 89, 105);
  color: rgb(33, 89, 105);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgb(33, 89, 105);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(7, 128, 165, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    stroke-width: 2.5;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    margin-right: 6px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const DeleteButton = styled.button`
  background: transparent;
  border: 1.5px solid rgb(226, 150, 78);
  color:rgb(226, 150, 78);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background:rgb(226, 150, 78);
    color: white;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(240, 118, 5, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    stroke-width: 2.5;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const StatusSelectWrapper = styled.div<{ $status: 'Cancelado' | 'Em Análise' | 'Concluído' }>`
  position: relative;
  display: inline-block;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    z-index: 1;
    ${props => {
      switch (props.$status) {
        case 'Cancelado':
          return 'background-color: #dc2626;'
        case 'Em Análise':
          return 'background-color: #d97706;'
        case 'Concluído':
          return 'background-color: #16a34a;'
        default:
          return 'background-color: #d97706;'
      }
    }}
  }

  @media (max-width: 768px) {
    &::before {
      left: 8px;
      width: 8px;
      height: 8px;
    }
  }
`

export const StatusSelect = styled.select<{ $status: 'Cancelado' | 'Em Análise' | 'Concluído' }>`
  padding: 8px 32px 8px 28px;
  border-radius: 6px;
  border: 1.5px solid;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  width: 100%;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  ${props => {
    switch (props.$status) {
      case 'Cancelado':
        return `
          border-color: #dc2626;
          color: #dc2626;
          background-color: #fef2f2;
          &:hover {
            background-color: #fee2e2;
            border-color: #b91c1c;
          }
          &:focus {
            border-color: #b91c1c;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
          }
        `
      case 'Em Análise':
        return `
          border-color: #d97706;
          color: #d97706;
          background-color: #fffbeb;
          &:hover {
            background-color: #fef3c7;
            border-color: #b45309;
          }
          &:focus {
            border-color: #b45309;
            box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
          }
        `
      case 'Concluído':
        return `
          border-color: #16a34a;
          color: #16a34a;
          background-color: #f0fdf4;
          &:hover {
            background-color: #dcfce7;
            border-color: #15803d;
          }
          &:focus {
            border-color: #15803d;
            box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
          }
        `
      default:
        return ''
    }
  }}

  option {
    background: white;
    color: #4a5568;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    font-size: 13px;
    padding: 6px 28px 6px 24px;
    background-position: right 10px center;
    
    &::before {
      left: 8px;
      width: 6px;
      height: 6px;
    }
  }
`

export const ExpandedContent = styled.div`
  padding: 24px;
  background: #f7fafc;
  border-radius: 8px;
  margin: 16px 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const ExpandedSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const ExpandedTitle = styled.h4`
  color: #1e6b4a;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`

export const ExpandedText = styled.p`
  color: #4a5568;
  font-size: 14px;
  line-height: 1.6;
  margin: 4px 0;
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #718096;
  font-size: 16px;
  background: #f7fafc;
  border-radius: 12px;
  margin-top: 24px;
`

export const FilterContainer = styled.div`
  position: relative;
  margin-top: 24px;
  margin-bottom: 24px;
  width: 100%;
`

export const FilterIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  pointer-events: none;
  z-index: 1;
`

export const FilterInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: #4a5568;
  background: #ffffff;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }

  &:hover {
    border-color: #cbd5e0;
  }

  @media (max-width: 768px) {
    padding: 12px 14px 12px 44px;
    font-size: 14px;

    &::placeholder {
      font-size: 13px;
    }
  }
`

