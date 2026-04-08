'use client';
import { useState } from 'react';
import { useCatalogoFilmes } from '@/hooks/useCatalogoFilmes';
import FilmeForm  from '@/components/filme-form';
import FilmeList  from '@/components/filme-list';
import FilmeToolbar  from '@/components/filme-toolbar';
import { Filme } from '@/core/types/filme';
import { Toast } from 'flowbite-react';
import { CheckCircleIcon, FilmReelIcon } from '@phosphor-icons/react';

export default function FilmesPage() {
    const {
        filmes: filmesOriginais,
        loading,
        adicionarFilme,
        listarTodos,
        buscarPorTitulo,
        buscarPorGenero,
        removerFilme,
        ordenarPorAno,
        ordenarPorAvaliacao
    } = useCatalogoFilmes();

    const [filmesFiltrados, setFilmesFiltrados] = useState<Filme[]>([]);
    const [mostraFiltrados, setMostraFiltrados] = useState(false);
    const [toast, setToast] = useState('');
    const [toastTipo, setToastTipo] = useState<'success' | 'error'>('success');

    const handleAdicionarFilme = (filme: Filme) => {
        const resultado = adicionarFilme(filme);
        
        if (resultado.sucesso) {
            setToast(`Filme ${filme.titulo} adicionado com sucesso!`);
            setToastTipo('success');
            setMostraFiltrados(false);
        } else {
            setToast(`Erro ao adicionar filme: ${resultado.erros?.join(', ')}`);
            setToastTipo('error');
        }

        setTimeout(() => setToast(''), 4000);

        return resultado;
    }

    const handleFiltro = (filmes: Filme[]) => {
        setFilmesFiltrados(filmes || []);
        setMostraFiltrados(true);
    }

    const handleLimparFiltros = () => {
        setFilmesFiltrados([]);
        setMostraFiltrados(false);
        listarTodos();
    }

    const filmesExibidos = mostraFiltrados ? (filmesFiltrados || []) : filmesOriginais;

    return (
        <>
            <nav className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-4 mb-6 px-6 py-4 from-blue-600 bg-blue-700 rounded-lg shadow-lg mx-6">
                <div className="flex items-center gap-2">
                    <FilmReelIcon size={28} weight='fill' className="text-white" />
                    <h1 className="text-2xl font-bold text-white">Catálogo de Filmes</h1>
                </div>
                <FilmeForm onSubmit={handleAdicionarFilme} />
            </nav>


            <div className="px-6 py-6 space-y-2">
                <FilmeToolbar
                    onFiltro={handleFiltro}
                    onLimparFiltros={handleLimparFiltros}
                    listarTodos={listarTodos}
                    buscarPorTitulo={buscarPorTitulo}
                    buscarPorGenero={buscarPorGenero}
                    ordenarPorAno={ordenarPorAno}
                    ordenarPorAvaliacao={ordenarPorAvaliacao}
                />

                <FilmeList
                    filmes={filmesExibidos}
                    loading={loading}
                    onRemover={(titulo: string) => {
                        const resultado = removerFilme(titulo);
                        if (resultado) {
                            setToast(`Filme ${titulo} removido com sucesso!`);
                            setToastTipo('success');
                            if (mostraFiltrados && filmesFiltrados) {
                                const novosFiltrados = filmesFiltrados.filter(f => f.titulo !== titulo);
                                setFilmesFiltrados(novosFiltrados);
                                if (novosFiltrados.length === 0) {
                                    setMostraFiltrados(false);
                                }
                            }
                        } else {
                            setToast(`Erro ao remover filme.`);
                            setToastTipo('error');
                        }
                    }}
                />

                {/* Infos */}
                {!loading && (
                    <div className="text-center text-gray-700 py-4">
                        <p>
                            Total: <strong>{filmesOriginais.length}</strong> filme(s)
                            {mostraFiltrados && filmesFiltrados?.length > 0 && ` • Filtrando: ${filmesFiltrados.length}`}
                        </p>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <Toast className='fixed bottom-4 right-4'>
                        <div
                            className={`flex items-center gap-2 ${
                                toastTipo === 'success'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {toastTipo === 'success' && <CheckCircleIcon size={20} />}
                            {toast}
                        </div>
                    </Toast>
                )}
            </div>
        </>
    )
}