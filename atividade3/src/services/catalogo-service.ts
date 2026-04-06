import { Filme, GeneroFilme } from "@/core/types/filme";
import { CatalogoFilmes } from "@/core/models/catalogoFilmes";
import { validarFilme } from "@/core/utils/validacoes";
import { filmesIniciais } from "@/data/filmes-store";

export class CatalogoService {
    private catalogo: CatalogoFilmes;

    constructor() {
        this.catalogo = new CatalogoFilmes(filmesIniciais);
    }

    public adicionarFilme(filme: Filme): { sucesso: boolean; erros?: string[] } {
        const validacao = validarFilme(filme);

        if (!validacao.valido) {
            return {
                sucesso: false,
                erros: validacao.erros
            }
        }

        try {
            this.catalogo.adicionarFilme(filme);
            return { sucesso: true };
        } catch (error) {
            return {
                sucesso: false,
                erros: ["Erro ao adicionar filme."]
            }
        }
    }

    public listarTodos(): Filme[] {
        return this.catalogo.listarFilmes();
    }

    public buscarTitulo(titulo: string): Filme[] {
        return this.catalogo.buscarPorTitulo(titulo);
    }

    public buscarGenero(genero: GeneroFilme): Filme[] {
        return this.catalogo.buscarPorGenero(genero);
    }

    public removerFilme(titulo: string): boolean {
        return this.catalogo.removerPorTitulo(titulo);
    }

    public ordenarPorAno(crescente: boolean = true): Filme[] {
        return this.catalogo.ordenarPorAno(crescente);
    }

    public ordenarPorAvaliacao(crescente: boolean = false): Filme[] {
        return this.catalogo.ordenarPorAvaliacao(crescente);
    }
}