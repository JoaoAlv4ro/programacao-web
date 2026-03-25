'use client'
import { CheckCircle, Trash, PencilSimple } from "@phosphor-icons/react";
import { Task } from "../context/TaskContext";

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

// Função para obter a cor da prioridade
const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
        case 'Alta':
            return 'bg-red-100 border-red-300 text-red-800';
        case 'Média':
            return 'bg-yellow-100 border-yellow-300 text-yellow-800';
        case 'Baixa':
            return 'bg-green-100 border-green-300 text-green-800';
        default:
            return 'bg-gray-100 border-gray-300 text-gray-800';
    }
};

// Função para formatar a data
const formatarDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
};

function TaskCard({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) {
    const isConcluida = task.status === 'Concluída';

    return (
        <div className={`
            border-l-4 rounded-lg p-4 mb-3 transition-all duration-300
            ${isConcluida 
                ? 'bg-gray-100 border-l-gray-400 opacity-60' 
                : 'bg-white border-l-blue-500 shadow-md hover:shadow-lg'
            }
        `}>
            {/* Header: Nome e Prioridade */}
            <div className="flex items-start justify-between mb-3">
                <h3 className={`
                    font-bold text-lg flex-1
                    ${isConcluida ? 'line-through text-gray-500' : 'text-gray-800'}
                `}>
                    {task.nome}
                </h3>
                <div className={`
                    px-3 py-1 rounded-full text-xs font-bold ml-2 whitespace-nowrap
                    ${getPriorityColor(task.prioridade)}
                    border
                `}>
                    {task.prioridade}
                </div>
            </div>

            {/* Informações: Categoria e Data */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                    <span className="text-gray-600 font-semibold">Categoria:</span>
                    <p className={isConcluida ? 'text-gray-400' : 'text-gray-700'}>
                        {task.categoria}
                    </p>
                </div>
                <div>
                    <span className="text-gray-600 font-semibold">Data Limite:</span>
                    <p className={isConcluida ? 'text-gray-400' : 'text-gray-700'}>
                        {formatarDate(task.dataLimite)}
                    </p>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2 justify-end pt-2 border-t border-gray-200">
                <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`
                        flex items-center gap-1 px-3 py-2 rounded transition-all duration-200 cursor-pointer
                        ${isConcluida
                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }
                    `}
                    title={isConcluida ? 'Marcar como pendente' : 'Marcar como concluída'}
                >
                    <CheckCircle size={18} weight={isConcluida ? 'regular' : 'fill'} />
                    <span className="text-sm font-medium">
                        {isConcluida ? 'Concluída' : 'Concluir'}
                    </span>
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                    title="Editar tarefa"
                >
                    <PencilSimple size={18} weight="bold" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200 cursor-pointer"
                    title="Excluir tarefa"
                >
                    <Trash size={18} weight="bold" />
                </button>
            </div>
        </div>
    );
}

export default TaskCard;