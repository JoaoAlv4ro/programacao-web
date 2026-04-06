import { Filme, GeneroFilme } from "../types/filme";

export class CatalogoFilmes {
    private filmes: Filme[] = [];

    constructor(filmesIniciais: Filme[] = []) {
        this.filmes = [...filmesIniciais];
    }

    public adicionarFilme(filme: Filme): void {
        if (filme.avaliacaoPublico !== undefined) {
            if (filme.avaliacaoPublico < 0 || filme.avaliacaoPublico > 10) {
                throw new Error("A avaliação ser de entre 0 a 10")
            }
        }
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
        const termo = genero.trim().toLowerCase();

        return this.filmes.filter(
            (filme) => filme.genero.toLowerCase() ===termo
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

        return copia.sort((x,y) =>
            crescente ? x.anoLancamento - y.anoLancamento : y.anoLancamento - x.anoLancamento
        );
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