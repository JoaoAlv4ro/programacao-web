import { CatalogoService } from "@/services/catalogo-service";
import { GeneroFilme, Filme } from "@/core/types/filme";
import { perguntar, perguntarNumero, perguntarOpcao, escolherGenero, fecharPerguntas } from "@/cli/inputs";

export class MenuCLI {
    private servico: CatalogoService;

    constructor() {
        this.servico = new CatalogoService();
    }
    
    // Menu principal
    public async exibirMenuPrincipal(): Promise<void> {
        console.log("\n=== Catálogo de Filmes ===");
        console.log("1. Adicionar filme");
        console.log("2. Listar todos os filmes");
        console.log("3. Buscar por título");
        console.log("4. Buscar por gênero");
        console.log("5. Ordenar por ano");
        console.log("6. Ordenar por avaliação");
        console.log("7. Remover filme");
        console.log("8. Sair");
    }

    // Exibe todos os filmes formatados
    private exibirFilmes(filmes: Filme[]): void {
        if (filmes.length === 0) {
            console.log("Nenhum filme encontrado.");
            return;
        }

        console.log("\n" + "=".repeat(75));
        filmes.forEach((filme) => {
            console.log(`Título: ${filme.titulo}`);
            console.log(`Ano de Lançamento: ${filme.anoLancamento}`);
            console.log(`Gênero: ${filme.genero}`);
            console.log(`Duração: ${filme.duracao} minutos`);
            if (filme.avaliacaoPublico !== undefined) {
                console.log(`Avaliação do Público: ${filme.avaliacaoPublico}/10`);
            }
        });

        console.log("=".repeat(75) + "\n");
    }

    // Opção 1: Adicionar filme
    public async adicionarFilme(): Promise<void> {
        const titulo = await perguntar("Digite o título do filme: ");
        const anoLancamento = await perguntarNumero("Digite o ano de lançamento: ");
        const genero = await escolherGenero();
        const duracao = await perguntarNumero("Digite a duração do filme (em minutos): ");
        
        let avaliacaoPublico: number | undefined = undefined;
        const respostaAvaliacao = await perguntar("O filme possuí uma avaliação do público? (s/n): ");
        if (respostaAvaliacao.trim().toLowerCase() === 's') {
            avaliacaoPublico = await perguntarNumero("Digite a avaliação do público (0 a 10): ");
        }

        const novoFilme: Filme = {
            titulo,
            anoLancamento,
            genero,
            duracao,
            avaliacaoPublico
        };

        const resultado = this.servico.adicionarFilme(novoFilme);
        if (resultado.sucesso) {
            console.log("Filme adicionado com sucesso!");
        } else {
            console.log("Erro ao adicionar filme:");
            resultado.erros?.forEach((erro) => console.log(`- ${erro}`));
        }
    }

    // Opção 2: Listar todos
    public async listarTodos(): Promise<void> {
        console.log("\n TODOS OS FILMES: ");
        const filmes = this.servico.listarTodos();
        this.exibirFilmes(filmes);
    }

    // Opção 3: Buscar por título
    public async buscarPorTitulo(): Promise<void> {
        const titulo = await perguntar("Digite o título ou parte do título para buscar: ");
        const filmes = this.servico.buscarTitulo(titulo);
        if (filmes.length === 0) {
            console.log("Nenhum filme encontrado com esse título.");
        }

        console.log(`\n Resultados de "${titulo}": `);
        this.exibirFilmes(filmes);
    }

    // Opção 4: Buscar por gênero
    public async buscarPorGenero(): Promise<void> {
        const genero = await escolherGenero();
        const filmes = this.servico.buscarGenero(genero);
        if (filmes.length === 0) {
            console.log("Nenhum filme encontrado com esse gênero.");
        }

        console.log(`\n Resultados de "${genero}": `);
        this.exibirFilmes(filmes);
    }

    // Opção 5: Ordenar por ano
    public async ordenarPorAno(): Promise<void> {
        const opcao = await perguntarOpcao("\n Escolha a ordem: 1. Crescente 2. Decrescente: ", 1, 2);
        
        const crescente = opcao === 1;
        const filmes = this.servico.ordenarPorAno(crescente);
        const ordem = crescente ? "Crescente" : "Decrescente";

        console.log(`\n Filmes ordenados por anoa (${ordem}):`);
        this.exibirFilmes(filmes);
    }

    // Opção 6: Ordenar por avaliação
    public async ordenarPorAvaliacao(): Promise<void> {
        const opcao = await perguntarOpcao("\n Escolha a ordem: 1. Maiores Avaliações 2. Menores Avaliações: ", 1, 2);
        
        const crescente = opcao === 2;

        const filmes = this.servico.ordenarPorAvaliacao(crescente);
        const ordem = crescente ? "Crescente" : "Decrescente";

        console.log(`\n Filmes ordenados por avaliação (${ordem}):`);
        this.exibirFilmes(filmes);
    }

    // Opção 7: Remover filme
    public async removerFilme(): Promise<void> {
        const titulo = await perguntar("Digite o título do filme que deseja remover: ");
        const removido = this.servico.removerFilme(titulo);

        if (removido) {
            console.log(`Filme "${titulo}" removido com sucesso!`);
        } else {
            console.log(`Nenhum filme encontrado com o título "${titulo}".`);
        }
    }
}