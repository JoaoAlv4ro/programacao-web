import { MenuCLI } from "./menu";
import { perguntarOpcao, fecharPerguntas } from "./inputs";

async function main(): Promise<void> {
    const menu = new MenuCLI();

    console.clear()
    console.log("Bem vindo ao Catálogo de Filmes CLI!");

    let executando = true;

    while (executando) {
        await menu.exibirMenuPrincipal();
        const opcao = await perguntarOpcao("Escolha uma opção: ", 1, 8);

        console.clear()

        switch (opcao) {
            case 1:
                await menu.adicionarFilme();
                break;
            case 2:
                await menu.listarTodos();
                break;
            case 3:
                await menu.buscarPorTitulo();
                break;
            case 4:
                await menu.buscarPorGenero();
                break;
            case 5:
                await menu.ordenarPorAno();
                break;
            case 6:
                await menu.ordenarPorAvaliacao();
                break;
            case 7:
                await menu.removerFilme();
                break;
            case 8:
                console.log("Até a próxima!");
                executando = false;
                break;
        }
    }

    fecharPerguntas();
}

main().catch((error) => {
    console.error("Ocorreu um erro inesperado:", error);
    fecharPerguntas();
});