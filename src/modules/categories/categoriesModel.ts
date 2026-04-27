export interface Category {
  id: number;
  nome: string;
  criado_em: Date;

  getId(): number;
  getNome(): string;
  getCriadoEm(): Date;
  validate(): boolean;
  toJSON(): Record<string, any>;
}

export class CategoryModel implements Category {
  id: number;
  nome: string;
  criado_em: Date;

  constructor(id: number, nome: string, criado_em: Date) {
    this.id = id;
    this.nome = nome;
    this.criado_em = criado_em;
  }

  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getCriadoEm(): Date {
    return this.criado_em;
  }

  validate(): boolean {
    return this.nome && this.nome.trim().length > 0;
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      nome: this.nome,
      criado_em: this.criado_em
    };
  }
}