import { Filme } from "../types/filme";

export function validarAvaliacao(avaliacao: number): boolean {
    return avaliacao >= 0 && avaliacao <= 10; 
}

export function validarDuracao(duracao: number): boolean {
    return duracao > 0;
}

export function validarAnoLancamento(ano: number): boolean {
    const anoAtual = new Date().getFullYear();
    return ano > 1800 && ano <= anoAtual;
}

export function validarTitulo(titulo: string): boolean {
    return titulo.trim().length > 0;
}

export function validarFilme(filme: Filme): { valido: boolean; erros: string[] } {
    const erros: string[] = [];

    if (!validarTitulo(filme.titulo)) {
        erros.push("O título do filme é obrigatório.");
    }
    
    if (!validarAnoLancamento(filme.anoLancamento)) {
        erros.push("O ano de lançamento deve ser entre 1800 e o ano atual.");
    }

    if (!validarDuracao(filme.duracao)) {
        erros.push("A duração do filme deve ser um número positivo.");
    }

    if (filme.avaliacaoPublico !== undefined && !validarAvaliacao(filme.avaliacaoPublico)) {
        erros.push("A avaliação do público deve ser entre 0 e 10.");
    }

    return {
        valido: erros.length === 0,
        erros
    }
}