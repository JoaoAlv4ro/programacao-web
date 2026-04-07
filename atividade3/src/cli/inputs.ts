import * as readline from 'readline';
import { generosFilmes, GeneroFilme } from '@/core/types/filme';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


// Função para interação com o usuário por CLI
export function perguntar(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Função para perguntar um número ao usuário, garantindo válidação
export async function perguntarNumero(question: string): Promise<number> { 
    while (true) {
        const resposta = await perguntar(question);
        const numero = Number(resposta);

        if (!isNaN(numero)) {
            return numero;
        }
        console.log("Por favor, digite um número válido");
    }
}

// Função para perguntar uma opção numérica dentro de um intervalo específico
export async function perguntarOpcao(question: string, min: number, max: number) : Promise<number> {
    while (true) {
        const resposta = await perguntar(question);
        const numero = Number(resposta);

        if (!isNaN(numero) && numero >= min && numero <= max) {
            return numero;
        }
        console.log(`Por favor, digite um número entre ${min} e ${max}`);
    }
}

// Função para escolher um gênero de filme a partir da lista de gêneros disponíveis
export async function escolherGenero(): Promise<GeneroFilme> {
    const generos = generosFilmes;

    console.log("Gêneros disponíveis:");
    generos.forEach((genero, index) => {
        console.log(`${index + 1}. ${genero}`);
    });

    const indice = await perguntarOpcao("\nEscolha um gênero (número): ", 1, generos.length);
    return generos[indice - 1];
}

// Função para fechar a leitura do CLI
export function fecharPerguntas(): void {
    rl.close();
}