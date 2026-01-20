import styled from 'styled-components'

export const Card = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 107, 74, 0.1);
  transition: box-shadow 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`

export const CardTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #1e6b4a;
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`

export const Paragraph = styled.p`
  margin: 8px 0;
  color: #4a5568;
  font-size: 15px;
  line-height: 1.6;

  strong {
    color: #2d3748;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 6px 0;
  }
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
`

export const ListItem = styled.li`
  margin: 8px 0;
  color: #4a5568;
`

export const Divider = styled.hr<{ compact?: boolean }>`
  margin: ${props => (props.compact ? '16px 0' : '24px 0')};
  border: none;
  border-top: 2px solid #e2e8f0;
  background: none;
`

export const Highlight = styled.p<{ compact?: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d8659;
  margin: ${props => (props.compact ? '12px 0' : '16px 0')};
  padding: 16px;
  background: linear-gradient(135deg, rgba(45, 134, 89, 0.08) 0%, rgba(30, 107, 74, 0.05) 100%);
  border-radius: 10px;
  border-left: 4px solid #2d8659;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px;
    margin: ${props => (props.compact ? '10px 0' : '14px 0')};
  }
`

export const Profit = styled.p<{ compact?: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e6b4a;
  margin: ${props => (props.compact ? '12px 0' : '16px 0')};
  padding: 16px;
  background: linear-gradient(135deg, rgba(30, 107, 74, 0.1) 0%, rgba(13, 77, 46, 0.05) 100%);
  border-radius: 10px;
  border-left: 4px solid #1e6b4a;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px;
    margin: ${props => (props.compact ? '10px 0' : '14px 0')};
  }
`

export const Section = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
  border: 1px solid rgba(30, 107, 74, 0.08);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 10px;
  }
`

export const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #1e6b4a;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.2px;
  padding-bottom: 12px;
  border-bottom: 3px solid #2d8659;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 60px;
    height: 3px;
    background: #1e6b4a;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }
`

export const TaxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background: rgba(45, 134, 89, 0.03);
    border-radius: 6px;
    padding-left: 8px;
    padding-right: 8px;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
`

export const TaxLabel = styled.span`
  color: #4a5568;
  font-size: 15px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
    flex: 1;
    min-width: 0;
  }
`

export const TaxValue = styled.span`
  font-weight: 600;
  color: #2d3748;
  font-size: 15px;
  text-align: right;
  flex-shrink: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    text-align: left;
    margin-top: 4px;
  }
`

export const TaxPercent = styled.span`
  color: #718096;
  font-size: 13px;
  margin-left: 8px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-left: 4px;
    display: block;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`

export const ExportButton = styled.button`
  background: linear-gradient(135deg, #2d8659 0%, #1e6b4a 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(30, 107, 74, 0.2);
  letter-spacing: 0.3px;

  &:hover {
    background: linear-gradient(135deg, #1e6b4a 0%, #0d4d2e 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 107, 74, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(30, 107, 74, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
    width: 100%;
  }
`

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
  letter-spacing: 0.3px;

  &:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(66, 153, 225, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(66, 153, 225, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
    width: 100%;
  }
`

