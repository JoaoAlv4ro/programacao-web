'use client';

import { useState } from "react";
import { Filme, generosFilmes, GeneroFilmes } from "@/core/types/filme";
import { Button, TextInput, Select, ButtonGroup } from 'flowbite-react';
import { MagnifyingGlassIcon, SortAscendingIcon, SortDescendingIcon, ArrowUpIcon, ArrowDownIcon } from "@phosphor-icons/react";

interface FilmeToolbarProps {
    onFiltro: (filmes: Filme[], tipo: 'titulo' | 'genero' | 'ano' | 'avaliacao') => void;  
    onLimparFiltros?: () => void;
    listarTodos: () => void;
    buscarPorTitulo: (titulo: string) => Filme[];
    buscarPorGenero: (genero: GeneroFilmes) => Filme[];
    ordenarPorAno: (crescente: boolean) => Filme[];
    ordenarPorAvaliacao: (crescente: boolean) => Filme[];
}

export default function FilmeToolbar({ 
    onFiltro, 
    onLimparFiltros,
    listarTodos, 
    buscarPorTitulo, 
    buscarPorGenero, 
    ordenarPorAno, 
    ordenarPorAvaliacao 
}: FilmeToolbarProps) {
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroGenero, setFiltroGenero] = useState<string>('');

    const handleFiltroTitulo = () => {
        if (filtroTitulo.trim()) { 
            const resultados = buscarPorTitulo(filtroTitulo);
            onFiltro(resultados, 'titulo');
        } else {
            // Se vazio, volta a mostrar todos
            setFiltroGenero('');
            onLimparFiltros?.();
        }
    }

    const handleFiltroGeneroChange = (genero: string) => {
        setFiltroGenero(genero);
        
        if (genero === '') {
            // Se selecionou "Todos os gêneros", reseta os filtros
            setFiltroTitulo('');
            onLimparFiltros?.();
        } else {
            // Busca pelo gênero selecionado
            const resultados = buscarPorGenero(genero as GeneroFilmes);
            onFiltro(resultados, 'genero');
        }
    }

    const handleLimparFiltros = () => {
        setFiltroTitulo('');
        setFiltroGenero('');
        onLimparFiltros?.();
        listarTodos();
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            
            {/* Busca por título */}
            <div className="flex items-center gap-2 w-full md:w-auto">
                <TextInput
                    placeholder="Buscar por título..."
                    value={filtroTitulo}
                    onChange={(e) => setFiltroTitulo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleFiltroTitulo();
                    }}
                    className="flex-1"
                    icon={() => <MagnifyingGlassIcon size={16}/>}
                />
                <Button color="info" onClick={handleFiltroTitulo} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                    <MagnifyingGlassIcon className="mr-2" />
                    Buscar
                </Button>
            </div>
            
            {/* Filtro por gênero */}
            <Select
                value={filtroGenero}
                onChange={(e) => handleFiltroGeneroChange(e.target.value)}
            >
                <option value="">Tudo</option>
                {generosFilmes.map((genero) => (
                    <option key={genero} value={genero}>
                        {genero}
                    </option>
                ))}
            </Select>

            {/* Botões de ordenação */}
            <ButtonGroup>
                <Button color="info" onClick={() => onFiltro(ordenarPorAno(true), 'ano')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                    <SortAscendingIcon size={20} className="mr-2" />
                    Ano (Crescente)
                </Button>
                <Button color="info" onClick={() => onFiltro(ordenarPorAno(false), 'ano')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                    <SortDescendingIcon size={20} className="mr-2" />
                    Ano (Decrescente)
                </Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button color="info" onClick={() => onFiltro(ordenarPorAvaliacao(true), 'avaliacao')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                    <ArrowUpIcon size={20} className="mr-2" />
                    Avaliação (Crescente)
                </Button>
                <Button color="info" onClick={() => onFiltro(ordenarPorAvaliacao(false), 'avaliacao')} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
                    <ArrowDownIcon size={20} className="mr-2" />
                    Avaliação (Decrescente)
                </Button>
            </ButtonGroup>
            <Button color="failure" onClick={handleLimparFiltros} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white">
                    Limpar
                </Button>
        </div>
    );
}
