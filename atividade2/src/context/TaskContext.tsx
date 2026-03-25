'use client';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

export interface Task {
    id: string;
    nome: string;
    categoria: string;
    prioridade: 'Baixa' | 'Média' | 'Alta';
    status: 'Pendente' | 'Concluída';
    dataLimite: Date;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedFields: Partial<Omit<Task, 'id'>>) => void;
    categories: string[];
    addCategoria: (category: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<string[]>(['Geral']);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            const savedCategories = localStorage.getItem('categories');

            if (savedTasks) {
                const parsedTasks = JSON.parse(savedTasks);
                // conversão Data em String para Date
                const tasksWithDates = parsedTasks.map((task: any) => ({
                    ...task,
                    dataLimite: new Date(task.dataLimite)
                }));
                setTasks(tasksWithDates);
            }

            if (savedCategories) {
                setCategories(JSON.parse(savedCategories));
            }
        } catch (error) {
            console.error('Erro ao carregar dados do localStorage:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Erro ao salvar tasks no localStorage:', error);
            }
        }
    }, [tasks, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('categories', JSON.stringify(categories));
            } catch (error) {
                console.error('Erro ao salvar categories no localStorage:', error);
            }
        }
    }, [categories, isLoading]);

    const addTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            ...task,
        };
        setTasks(prev => [...prev, newTask]);
    }

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    const updateTask = (id: string, updatedFields: Partial<Omit<Task, 'id' | 'dataLimite'>>) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updatedFields } : task));
    }

    const addCategoria = (category: string) => {
        setCategories(prev => [...prev, category]);
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, categories, addCategoria }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
    }
    return context;
}