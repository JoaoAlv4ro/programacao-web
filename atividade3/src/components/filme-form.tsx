'use client';
import { useState } from 'react';
import { Filme, generosFilmes } from '@/core/types/filme';
import { Modal, ModalHeader, ModalBody, Button, Select, Label, Checkbox, Alert } from 'flowbite-react';
import { PlusIcon } from '@phosphor-icons/react';

interface FilmeFormProps {
    onSubmit: (filme: Filme) => { sucesso: boolean; erros?: string[] };
}

export default function FilmeForm({ onSubmit }: FilmeFormProps) {
    const [modalAberto, setModalAberto] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [anoLancamento, setAnoLancamento] = useState(new Date().getFullYear().toString());
    const [genero, setGenero] = useState(generosFilmes[0]);
    const [duracao, setDuracao] = useState('');
    const [temAvaliacaoPublico, setTemAvaliacaoPublico] = useState(false);
    const [avaliacaoPublico, setAvaliacaoPublico] = useState('');
    const [erros, setErros] = useState<string[]>([]);
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErros([]);
        setSucesso(false);

        const filme: Filme = {
            titulo: titulo.trim(),
            anoLancamento: parseInt(anoLancamento),
            genero,
            duracao: parseInt(duracao),
            avaliacaoPublico: temAvaliacaoPublico ? parseFloat(avaliacaoPublico) : undefined,
        };

        const resultado = onSubmit(filme);

        if (resultado.sucesso) {
            setSucesso(true);
            // Limpar formulário
            setTitulo('');
            setAnoLancamento(new Date().getFullYear().toString());
            setGenero(generosFilmes[0]);
            setDuracao('');
            setTemAvaliacaoPublico(false);
            setAvaliacaoPublico('');

            setTimeout(() => setModalAberto(false), 2000);
        } else {
            setErros(resultado.erros || ['Erro desconhecido']);
        }
    }

    return (
        <>
            <Button 
                onClick={() => setModalAberto(true)}
                className="cursor-pointer bg-slate-600 hover:bg-slate-700 text-white border-2 border-blue-600"
                color='light'
            >
                <PlusIcon className="mr-2 h-5 w-5" />
                Adicionar Filme
            </Button>

            <Modal show={modalAberto} onClose={() => setModalAberto(false)} popup size="md">
                <ModalHeader className="border-b border-gray-200 bg-blue-600 text-white px-4">
                    Adicionar Novo Filme
                </ModalHeader>
                <ModalBody className="px-6 py-6 bg-gray-50">
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {sucesso && (
                            <Alert color="success">
                                Filme adicionado com sucesso!
                            </Alert>
                        )}
                        
                        {erros.length > 0 && (
                            <Alert color="failure">
                                <ul className="list-disc list-inside">
                                    {erros.map((erro, idx) => (
                                        <li key={idx}>{erro}</li>
                                    ))}
                                </ul>
                            </Alert>
                        )}

                        <div>
                            <Label htmlFor="Título" color="" className="text-gray-800 font-semibold mb-2 block">Título *</Label>
                            <input
                                id="Título"
                                type="text"
                                placeholder='Ex: Inception'
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="Ano de Lançamento" color="" className="text-gray-800 font-semibold mb-2 block">Ano de Lançamento *</Label>
                                <input
                                    id="Ano de Lançamento"
                                    type="number"
                                    placeholder='2000'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={anoLancamento}
                                    onChange={(e) => setAnoLancamento(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="Duração (minutos)" color="" className="text-gray-800 font-semibold mb-2 block">Duração (minutos) *</Label>
                                <input
                                    id="Duração (minutos)"
                                    type="number"
                                    placeholder='120'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={duracao}
                                    onChange={(e) => setDuracao(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="Gênero" color="" className="text-gray-800 font-semibold mb-2 block">Gênero *</Label>
                            <Select
                                id="Gênero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value as any)}
                                required
                            >
                                {generosFilmes.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="Tem Avaliação do Público"
                                checked={temAvaliacaoPublico}
                                onChange={(e) => setTemAvaliacaoPublico(e.target.checked)}
                            />
                            <Label htmlFor="Tem Avaliação do Público" color="" className="text-gray-800">Tem Avaliação do Público?</Label>
                        </div>
                        
                        {temAvaliacaoPublico && (
                            <div>
                                <Label htmlFor="Avaliação do Público" color="" className="text-gray-800 font-semibold mb-2 block">Avaliação do Público *</Label>
                                <input
                                    id="Avaliação do Público"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder='8.5'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={avaliacaoPublico}
                                    onChange={(e) => setAvaliacaoPublico(e.target.value)}
                                />
                            </div>
                        )}
                        
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" color="success" className='flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white'>
                                Adicionar Filme
                            </Button>

                            <Button type="button" onClick={() => setModalAberto(false)} className='flex-1 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white'>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}