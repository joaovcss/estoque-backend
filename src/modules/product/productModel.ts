export interface Product {
  id: number,
  nome: string,
  descricao: string,
  preco_unitario: string,
  quantidade_total: number,
  estoque_minimo: number,
  categoria_id: number,
  criado_em: Date,
  atualizado_em: Date
}