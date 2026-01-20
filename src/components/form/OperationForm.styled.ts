import styled from 'styled-components'

export const Card = styled.div`
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 107, 74, 0.1);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
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
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
`

export const Label = styled.label`
  display: block;
  margin-top: 16px;
  margin-bottom: 4px;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.875rem;
  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    margin-top: 12px;
    margin-bottom: 2px;
  }
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;
  font-size: 14px;
  
  svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 768px) {
    left: 10px;
    font-size: 13px;
    
    svg {
      width: 13px;
      height: 13px;
    }
  }
`

export const Input = styled.input<{ hasIcon?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  padding-left: ${props => (props.hasIcon ? '40px' : '16px')};
  margin-top: 0;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #2d3748;
  background: #ffffff;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-left: ${props => (props.hasIcon ? '38px' : '14px')};
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }

  &:hover {
    border-color: #cbd5e0;
  }

  &::placeholder {
    color: #a0aec0;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`

export const Select = styled.select<{ hasIcon?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  padding-left: ${props => (props.hasIcon ? '40px' : '16px')};
  margin-top: 0;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #2d3748;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231e6b4a' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;

  @media (max-width: 768px) {
    padding: 10px 14px;
    padding-left: ${props => (props.hasIcon ? '38px' : '14px')};
    font-size: 16px;
    background-position: right 10px center;
  }

  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }

  &:hover {
    border-color: #cbd5e0;
  }
`

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

export const GridItem = styled.div`
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

export const RowEqual = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 0;
  }
`

