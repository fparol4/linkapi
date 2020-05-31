export interface IBlingDeal {
  cliente: {
    nome: string
  }
  item: {
    codigo: number
    descricao: string
    vlr_unit: number
    currency: string
  }
}
