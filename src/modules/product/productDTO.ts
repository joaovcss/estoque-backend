export interface CreateProductDTO {
  nome: string, 
  descricao: string, 
  preco_unitario: string,
  quantidade_total: string,
  estoque_minimo: string,
  categoria_id: number
}