// Não utilizado, mas mantido como ref para a implementação em tabela
'use client';
import { useState } from "react";
import { Filme } from "@/core/types/filme";
import { Card, Badge, Button, Dropdown, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { TrashIcon, StarIcon, CalendarIcon, ClockIcon, FilmSlateIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";

interface FilmeItemProps {
    filme: Filme;
    onRemover: (titulo: string) => void;
}

export default function FilmeItem({ filme, onRemover }: FilmeItemProps) {
    const [modalRemoverAberto, setModalRemoverAberto] = useState(false);

    const handleAbrirModalRemocao = () => {
        setModalRemoverAberto(true);
    }

    const handleConfirmarRemocao = () => {
        onRemover(filme.titulo);
        setModalRemoverAberto(false);
    }

    return (
        <>
            {/* Card */}
            <Card className="h-full flex-col shadow-lg hover:shadow-xl hover:scale-105 transition-shadow duration-300 bg-slate-800 border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{filme.titulo}</h3>

                    <Dropdown renderTrigger={() => <DotsThreeVerticalIcon size={20} className="cursor-pointer text-slate-300 hover:text-white" />} placement="bottom">
                        <Button color="failure" onClick={handleAbrirModalRemocao} className="cursor-pointer text-red-700 hover:text-red-900 bg-red-100 border-0 border-none">
                            <TrashIcon className="mr-2" />
                            Remover
                        </Button>
                    </Dropdown>
                </div>
                <div className="mb-2">
                    <Badge color="info" icon={() => <FilmSlateIcon size={14} weight="fill" />}>
                        {filme.genero}
                    </Badge>
                </div>
                <div className="flex items-center mt-2 text-slate-300">
                    <CalendarIcon className="text-blue-400 mr-1" />
                    <span>{filme.anoLancamento}</span>
                </div>
                <div className="flex items-center mt-2 text-slate-300">
                    <ClockIcon className="text-green-400 mr-1" />
                    <span>{filme.duracao} min</span>
                </div>
                {filme.avaliacaoPublico !== undefined && (
                    <div className="flex items-center mt-2 text-slate-300">
                        <StarIcon className="text-yellow-400 mr-1" />
                        <span>{filme.avaliacaoPublico.toFixed(1)}</span>
                    </div>
                )}
            </Card>
            {/* Modal */}
            <Modal show={modalRemoverAberto} onClose={() => setModalRemoverAberto(false)}>
                <ModalHeader className="bg-red-600 text-white">Confirmar Remoção</ModalHeader>
                <ModalBody className="bg-gray-50">
                    <p className="text-gray-800">Tem certeza que deseja remover o filme <strong>{filme.titulo}</strong>?</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <Button onClick={() => setModalRemoverAberto(false)} className="cursor-pointer" color="gray">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmarRemocao} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white" color="failure">
                            Remover
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}