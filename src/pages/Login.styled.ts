import styled from 'styled-components'

export const LoginForm = styled.form`
  margin-top: 8px;
`

export const FormGroup = styled.div`
  margin-bottom: 24px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
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
`

export const Button = styled.button`
  width: 100%;
  padding: 14px 32px;
  background: linear-gradient(135deg, #2d8659 0%, #1e6b4a 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(30, 107, 74, 0.2);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e6b4a 0%, #0d4d2e 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(30, 107, 74, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const ButtonGroup = styled.div`
  margin-top: 32px;
`

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 24px;
`

export const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  color: #065f46;
  font-size: 14px;
  margin-bottom: 24px;
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #2d8659;
  }

  &:focus {
    outline: none;
  }
`

export const SwitchMode = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #718096;
  font-size: 14px;

  a {
    color: #2d8659;
    font-weight: 600;
    text-decoration: underline;
    margin-left: 4px;

    &:hover {
      color: #1e6b4a;
    }
  }

  button {
    background: none;
    border: none;
    color: #2d8659;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
    padding: 0;
    margin-left: 4px;

    &:hover {
      color: #1e6b4a;
    }
  }
`
