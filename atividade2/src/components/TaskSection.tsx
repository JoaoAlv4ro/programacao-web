'use client'
import { PlusIcon } from "@phosphor-icons/react";

function TaskSection() {
    return (
        <div className="flex flex-col h-full">
            {/* Header */ }
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold text-2xl">Lista de Tasks</h1>
                <button 
                    className="cursor-pointer font-bold flex items-center gap-2 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => {
                        alert('função para abrir modal de criar task')
                    }}
                >
                    <PlusIcon size={20} weight="bold"/>
                    Criar Task
                </button>
            </div>
            
            
            {/* Abas de Categorias */ }
            <div className="flex gap-4 border-b border-black pb-2 mb-4 text-zinc-700">
                {/* 
                    A aba "Geral" vai mostrar todas as tasks, independente da categoria.
                    Além disso devo fazer algum "focus" para a aba da categoria selecionada.
                */ }
                <button className="font-semibold cursor-pointer">Geral</button>
                <button className="font-semibold cursor-pointer">Categoria Exemplo</button>
            </div>

            {/* Lista de Tasks */ }
            <div>
                {/* Cards de tasks */}
            </div>
        </div>
    );
}

export default TaskSection;