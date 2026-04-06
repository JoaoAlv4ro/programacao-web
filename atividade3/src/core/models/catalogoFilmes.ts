import { Filme, GeneroFilme } from "../types/filme";

export class CatalogoFilmes {
    private filmes: Filme[] = [];

    constructor(filmesIniciais: Filme[] = []) {
        this.filmes = [...filmesIniciais];
    }

    public adicionarFilme(filme: Filme): void {
        if (filme.avaliacaoPublico !== undefined) {
            if (filme.avaliacaoPublico < 0 || filme.avaliacaoPublico > 10) {
                throw new Error("A avaliação precisa ser de entre 0 a 10");
            }
        }

        this.filmes.push(filme);
    }

    public listarFilmes(): Filme[] {
        return [...this.filmes]
    }

    public buscarPorTitulo(titulo: string): Filme[] {
        const termo = titulo.trim().toLowerCase();

        return this.filmes.filter(
            (filme) => filme.titulo.toLowerCase().includes(termo)
        )
    }

    public buscarPorGenero(genero: GeneroFilme): Filme[] {
        return this.filmes.filter(
            (filme) => filme.genero === genero
        )
    }

    public removerPorTitulo(titulo: string): boolean {
        const termo = titulo.trim().toLowerCase();
        const indice = this.filmes.findIndex(
            (filme) => filme.titulo.toLowerCase() === termo 
        );

        if (indice === -1) {
            return false;
        }

        this.filmes.splice(indice, 1);
        return true;
    }

    public ordenarPorAno(crescente: boolean = true): Filme[] {
        const copia = [...this.filmes];

        const filmesOrdenados = copia.sort((filmeA, filmeB) => {
            if (crescente) {
                return filmeA.anoLancamento - filmeB.anoLancamento;
            } else {
                return filmeB.anoLancamento - filmeA.anoLancamento;
            }        
        });
        
        return filmesOrdenados;
    }

    public ordenarPorAvaliacao(crescente: boolean = false): Filme[] {
        const copia = [...this.filmes];

        return copia.sort((a, b) => {
            const avA = a.avaliacaoPublico ?? -1;
            const avB = b.avaliacaoPublico ?? -1;
            return crescente ? avA - avB : avB -avA
        });
    }
}