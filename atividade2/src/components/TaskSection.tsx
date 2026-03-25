'use client'
import { PlusIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { Task } from "@/context/TaskContext";

function TaskSection() {
    const { tasks, addTask, deleteTask, updateTask, addCategoria } = useTaskContext();
    const [selectedCategory, setSelectedCategory] = useState<string>('Geral');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtrar tarefas por categoria
    const filteredTasks = selectedCategory === 'Geral' 
        ? tasks 
        : tasks.filter(task => task.categoria === selectedCategory);

    // Obter categorias únicas das tarefas
    const uniqueCategories = Array.from(new Set(tasks.map(t => t.categoria)));

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Lista de Tarefas</h1>
                <button 
                    className="cursor-pointer font-bold flex items-center gap-2 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                    onClick={() => {
                        setEditingTask(null);
                        setIsModalOpen(true);
                    }}
                >
                    <PlusIcon size={20} weight="bold"/>
                    Criar Tarefas
                </button>
            </div>
            
            {/* Abas de Categorias */}
            <div className="flex gap-4 border-b-2 border-gray-300 pb-3 mb-6 overflow-x-auto">
                <button 
                    onClick={() => setSelectedCategory('Geral')}
                    className={`
                        font-semibold cursor-pointer px-4 py-2 rounded transition-all whitespace-nowrap
                        ${selectedCategory === 'Geral'
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }
                    `}
                >
                    Geral ({tasks.length})
                </button>

                {uniqueCategories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                            font-semibold cursor-pointer px-4 py-2 rounded transition-all whitespace-nowrap
                            ${selectedCategory === category
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }
                        `}
                    >
                        {category} ({tasks.filter(t => t.categoria === category).length})
                    </button>
                ))}
            </div>

            {/* Lista de Tasks */}
            <div className="flex-1 overflow-y-auto">
                {filteredTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                        <p className="text-lg font-semibold">Nenhuma tarefa encontrada</p>
                        <p className="text-sm">Clique em "Criar Task" para adicionar uma nova</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggleComplete={(id) => {
                                    const newStatus = task.status === 'Concluída' ? 'Pendente' : 'Concluída';
                                    updateTask(id, { status: newStatus });
                                }}
                                onEdit={handleEdit}
                                onDelete={deleteTask}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* TaskModal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(taskData) => {
                    // Se categoria é nova, adicionar à lista
                    if (!uniqueCategories.includes(taskData.categoria)) {
                        addCategoria(taskData.categoria);
                    }
                    if (editingTask) {
                        updateTask(editingTask.id, taskData);
                    } else {
                        addTask(taskData);
                    }
                }}
                task={editingTask}
                categories={uniqueCategories}
            />
        </div>
    );
}

export default TaskSection;