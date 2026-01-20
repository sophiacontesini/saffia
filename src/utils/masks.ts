// Função para aplicar máscara de CPF: 000.000.000-00
export function maskCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

// Função para aplicar máscara de CNPJ: 00.000.000/0000-00
export function maskCNPJ(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 5)
    return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
  if (numbers.length <= 8)
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
  if (numbers.length <= 12)
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
}

// Função genérica que aplica a máscara baseada no tipo
export function applyDocumentMask(value: string, type: 'CPF' | 'CNPJ'): string {
  if (type === 'CPF') return maskCPF(value)
  return maskCNPJ(value)
}

// Função para formatar valor como moeda brasileira (BRL)
export function formatCurrency(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '')
  
  if (!numbers || numbers === '0') return ''
  
  // Converte para número dividindo por 100 (centavos)
  const number = parseFloat(numbers) / 100
  
  // Formata como moeda brasileira
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Função para converter valor formatado de volta para número
export function parseCurrency(value: string): number {
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return 0
  return parseFloat(numbers) / 100
}

