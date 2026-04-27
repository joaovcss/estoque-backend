export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco_unitario: string;
  quantidade_total: number;
  estoque_minimo: number;
  categoria_id: number;
  criado_em: Date;
  atualizado_em: Date;

  getId(): number;
  getNome(): string;
  getDescricao(): string;
  getPrecoUnitario(): string;
  getQuantidadeTotal(): number;
  getEstoqueMinimo(): number;
  getCategoriaId(): number;
  getCriadoEm(): Date;
  getAtualizadoEm(): Date;
  validate(): boolean;
  toJSON(): Record<string, any>;
}

export class ProductModel implements Product {
  id: number;
  nome: string;
  descricao: string;
  preco_unitario: string;
  quantidade_total: number;
  estoque_minimo: number;
  categoria_id: number;
  criado_em: Date;
  atualizado_em: Date;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    preco_unitario: string,
    quantidade_total: number,
    estoque_minimo: number,
    categoria_id: number,
    criado_em: Date,
    atualizado_em: Date
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco_unitario = preco_unitario;
    this.quantidade_total = quantidade_total;
    this.estoque_minimo = estoque_minimo;
    this.categoria_id = categoria_id;
    this.criado_em = criado_em;
    this.atualizado_em = atualizado_em;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getPrecoUnitario(): string {
    return this.preco_unitario;
  }

  getQuantidadeTotal(): number {
    return this.quantidade_total;
  }

  getEstoqueMinimo(): number {
    return this.estoque_minimo;
  }

  getCategoriaId(): number {
    return this.categoria_id;
  }

  getCriadoEm(): Date {
    return this.criado_em;
  }

  getAtualizadoEm(): Date {
    return this.atualizado_em;
  }

  validate(): boolean {
    return (
      this.nome &&
      this.nome.trim().length > 0 &&
      this.descricao &&
      this.descricao.trim().length > 0 &&
      this.quantidade_total >= 0 &&
      this.estoque_minimo >= 0 &&
      this.categoria_id > 0
    );
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco_unitario: this.preco_unitario,
      quantidade_total: this.quantidade_total,
      estoque_minimo: this.estoque_minimo,
      categoria_id: this.categoria_id,
      criado_em: this.criado_em,
      atualizado_em: this.atualizado_em
    };
  }
}