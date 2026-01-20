interface CalculoProps {
  valor: number
  desagioPercent: number
  tacPercent: number
  iofFixoPercent: number
  iofDiarioPercent: number
  irpjPercent: number
  issPercent: number
  csllPercent: number
  pisPercent: number
  cofinsPercent: number
  dias: number
}

export function calcularOperacao({
  valor,
  desagioPercent,
  tacPercent,
  iofFixoPercent,
  iofDiarioPercent,
  irpjPercent,
  issPercent,
  csllPercent,
  pisPercent,
  cofinsPercent,
  dias
}: CalculoProps) {
  const desagio = valor * (desagioPercent / 100) * (dias / 30)

  const iofFixo = valor * (iofFixoPercent / 100)
  const iofDiario = valor * (iofDiarioPercent / 100) * dias
  const tac = valor * (tacPercent / 100)

  const irpj = desagio * (irpjPercent / 100)
  const iss = desagio * (issPercent / 100)
  const csll = desagio * (csllPercent / 100)
  const pis = desagio * (pisPercent / 100)
  const cofins = desagio * (cofinsPercent / 100)

  const repasseIofTotal = iofFixo + iofDiario

  const totalImpostosCedente = desagio + iofFixo + iofDiario + tac
  const totalImpostosGM = irpj + iss + csll + pis + cofins + repasseIofTotal

  const liquidoCliente = valor - totalImpostosCedente
  const lucroLiquidoGM = desagio - totalImpostosGM

  return {
    desagio,
    tac,
    iofFixo,
    iofDiario,
    repasseIofTotal,
    irpj,
    iss,
    csll,
    pis,
    cofins,
    totalImpostosCedente,
    totalImpostosGM,
    liquidoCliente,
    lucroLiquidoGM,
    receitaBruta: desagio + tac,
    impostos: totalImpostosCedente + totalImpostosGM,
    lucroLiquido: lucroLiquidoGM
  }
}
  