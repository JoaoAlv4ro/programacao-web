'use client';
import { Task } from '../context/TaskContext';
import { useState, useEffect } from 'react';

interface ModalProps { 
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Omit<Task, 'id'>) => void;
    task?: Task | null;
    categories: string[];
}

function TaskModal({ isOpen, onClose, onSave, task, categories }: ModalProps) {
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [prioridade, setPrioridade] = useState<'Baixa' | 'Média' | 'Alta'>('Baixa');
    const [status, setStatus] = useState<'Pendente' | 'Concluída'>('Pendente');
    const [dataLimite, setDataLimite] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (task) {
            setNome(task.nome);
            setCategoria(task.categoria);
            setPrioridade(task.prioridade);
            setStatus(task.status);
            setDataLimite(task.dataLimite.toISOString().split('T')[0]);
        } else {
            // Limpa para criar nova
            setNome('');
            setCategoria('');
            setPrioridade('Média');
            setStatus('Pendente');
            setDataLimite('');
        }
        setErro('');
    }, [task, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação
        if (!nome.trim()) {
            setErro('Nome é obrigatório');
            return;
        }
        if (!categoria) {
            setErro('Categoria é obrigatória');
            return;
        }
        if (!dataLimite) {
            setErro('Data limite é obrigatória');
            return;
        }

        // Salvar
        onSave({
            nome,
            categoria,
            prioridade,
            status,
            dataLimite: new Date(dataLimite)
        });

        setDataLimite('');
        // Limpar e fechar
        setNome('');
        setCategoria('');
        setPrioridade('Média');
        setStatus('Pendente');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div className="bg-white p-6 rounded-lg min-w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {task ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Nome */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Nome da Tarefa:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome da tarefa"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Categoria */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Categoria:</label>
                        <input
                            list="categoriasList"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            placeholder="Selecione ou digite uma categoria"
                            className="w-full p-2 border rounded"
                        />
                        <datalist id="categoriasList">
                            {categories.map(cat => (
                                <option key={cat} value={cat} />
                            ))}
                        </datalist>
                    </div>

                    {/* Prioridade */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Prioridade:</label>
                        <select
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value as any)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Concluída">Concluída</option>
                        </select>
                    </div>

                    {/* Data Limite */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Data Limite:</label>
                        <input
                            type="date"
                            value={dataLimite}
                            onChange={(e) => setDataLimite(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Erro */}
                    {erro && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                            {erro}
                        </div>
                    )}

                    {/* Botões */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        >
                            {task ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskModal;