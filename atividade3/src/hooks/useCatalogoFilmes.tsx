'use client';
import { useState, useEffect, useCallback } from "react";
import { CatalogoService } from "@/services/catalogo-service";
import { Filme, GeneroFilmes } from "@/core/types/filme";

export function useCatalogoFilmes() {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [catalogo] = useState(() => new CatalogoService());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setFilmes(catalogo.listarTodos());
        setLoading(false);
    }, [catalogo]);

    const adicionarFilme = useCallback(
        (filme: Filme) => { 
            const resultado = catalogo.adicionarFilme(filme);

            if (resultado.sucesso) {
                setFilmes(catalogo.listarTodos());
            }
            return resultado;
        },
        [catalogo]
    );

    const listarTodos = useCallback(() => {
        setFilmes(catalogo.listarTodos());
    }, [catalogo]);

    const buscarPorTitulo = useCallback(
        (titulo: string): Filme[] => {
            const resultados = catalogo.buscarTitulo(titulo);
            return resultados;
        },
        [catalogo]
    );

    const buscarPorGenero = useCallback(
        (genero: GeneroFilmes): Filme[] => {
            const resultados = catalogo.buscarGenero(genero);
            return resultados;
        },
        [catalogo]
    );

    const removerFilme = useCallback(
        (titulo: string) => {
            const resultado = catalogo.removerFilme(titulo);
            if (resultado) {
                setFilmes(catalogo.listarTodos());
            }
            return resultado;
        },
        [catalogo]
    );

    const ordenarPorAno = useCallback(
        (crescente: boolean = true): Filme[] => {
            const resultados = catalogo.ordenarPorAno(crescente);
            return resultados;
        },
        [catalogo]
    );

    const ordenarPorAvaliacao = useCallback(
        (crescente: boolean = false): Filme[] => {
            const resultados = catalogo.ordenarPorAvaliacao(crescente);
            return resultados;
        },
        [catalogo]
    );

    return {
        filmes,
        loading,
        adicionarFilme,
        listarTodos,
        buscarPorTitulo,
        buscarPorGenero,
        removerFilme,
        ordenarPorAno,
        ordenarPorAvaliacao
    };
}
