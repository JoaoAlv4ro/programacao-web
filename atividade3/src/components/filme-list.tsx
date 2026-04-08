import { Filme } from "@/core/types/filme";
import { Spinner, Button, Modal, ModalBody, ModalHeader, Table, TableHead, TableHeadCell, TableRow, TableBody, TableCell, Dropdown } from "flowbite-react";
import { 
    TrashIcon, 
    CalendarIcon, 
    ClockIcon, 
    StarIcon, 
    DotsThreeVerticalIcon, 
    FilmSlateIcon,
    BombIcon,
    MapPinIcon,
    SmileyIcon,
    HeartBreakIcon,
    RocketIcon,
    GhostIcon,
    HeartIcon,
    PaintBrushIcon,
    BookmarkIcon,
    MagicWandIcon,
    EyeIcon,
    VinylRecordIcon
} from "@phosphor-icons/react";
import { useState } from "react";

interface FilmeListProps {
    filmes: Filme[];
    loading: boolean;
    onRemover: (titulo: string) => void;
}

export default function FilmeList({ filmes, loading, onRemover }: FilmeListProps) {
    const [modalRemoverAberto, setModalRemoverAberto] = useState(false);
    const [filmeParaRemover, setFilmeParaRemover] = useState<string | null>(null);

    const generoConfig: Record<string, { Icon: React.ComponentType<any>; bgColor: string; textColor: string }> = {
        'Ação': { Icon: BombIcon, bgColor: 'bg-red-100', textColor: 'text-red-800' },
        'Aventura': { Icon: MapPinIcon, bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
        'Comédia': { Icon: SmileyIcon, bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
        'Drama': { Icon: HeartBreakIcon, bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
        'Ficção Científica': { Icon: RocketIcon, bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
        'Terror': { Icon: GhostIcon, bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
        'Romance': { Icon: HeartIcon, bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
        'Animação': { Icon: PaintBrushIcon, bgColor: 'bg-cyan-100', textColor: 'text-cyan-800' },
        'Documentário': { Icon: BookmarkIcon, bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
        'Fantasia': { Icon: MagicWandIcon, bgColor: 'bg-violet-100', textColor: 'text-violet-800' },
        'Suspense': { Icon: EyeIcon, bgColor: 'bg-orange-200', textColor: 'text-orange-900' },
        'Musical': { Icon: VinylRecordIcon, bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
    };

    const handleConfirmarRemocao = () => {
        if (filmeParaRemover) {
            onRemover(filmeParaRemover);
            setModalRemoverAberto(false);
            setFilmeParaRemover(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner aria-label="Carregando Filmes..." size="xl" />
            </div>
        );
    }

    if (!filmes || filmes.length === 0) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
                <p className="text-gray-700">
                    Nenhum filme registrado. Adicione filmes para começar a construir seu catálogo!
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <Table>
                    <TableHead className="bg-blue-600">
                        <TableRow>
                            <TableHeadCell className="bg-blue-600 text-white">Título</TableHeadCell>
                            <TableHeadCell className="bg-blue-600 text-white text-center">
                                <FilmSlateIcon size={18} className="inline mr-2" />
                                Gênero
                            </TableHeadCell>
                            <TableHeadCell className="bg-blue-600 text-white text-center">
                                <CalendarIcon size={18} className="inline mr-2" />
                                Ano
                            </TableHeadCell>
                            <TableHeadCell className="bg-blue-600 text-white text-center">
                                <ClockIcon size={18} className="inline mr-2" />
                                Duração
                            </TableHeadCell>
                            <TableHeadCell className="bg-blue-600 text-white text-center">
                                <StarIcon size={18} className="inline mr-2" />
                                Avaliação
                            </TableHeadCell>
                            <TableHeadCell className="bg-blue-600 text-white text-center">Ações</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {filmes.map((filme) => (
                            <TableRow key={filme.titulo} className="bg-white hover:bg-gray-50">
                                <TableCell className="font-medium text-gray-900">{filme.titulo}</TableCell>
                                <TableCell className="text-center">
                                    {(() => {
                                        const config = generoConfig[filme.genero];
                                        const IconComponent = config?.Icon;
                                        return (
                                            <span className={`${config?.bgColor} ${config?.textColor} px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1`}>
                                                {IconComponent && <IconComponent size={14} weight="fill" />}
                                                {filme.genero}
                                            </span>
                                        );
                                    })()}
                                </TableCell>
                                <TableCell className="text-center text-gray-700">
                                    <CalendarIcon size={16} className="inline mr-1 text-blue-500" />
                                    {filme.anoLancamento}
                                </TableCell>
                                <TableCell className="text-center text-gray-700">
                                    <ClockIcon size={16} className="inline mr-1 text-green-500" />
                                    {filme.duracao} min
                                </TableCell>
                                <TableCell className="text-center">
                                    {filme.avaliacaoPublico !== undefined ? (
                                        <span className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1">
                                            <StarIcon size={16} className="text-yellow-500" weight="fill" />
                                            {filme.avaliacaoPublico.toFixed(1)}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Dropdown 
                                        renderTrigger={() => (
                                            <DotsThreeVerticalIcon 
                                                size={20} 
                                                className="cursor-pointer text-gray-600 hover:text-gray-900 inline" 
                                            />
                                        )}
                                        placement="bottom"
                                    >
                                        <Button 
                                            color="failure" 
                                            onClick={() => {
                                                setFilmeParaRemover(filme.titulo);
                                                setModalRemoverAberto(true);
                                            }}
                                            className="cursor-pointer text-red-700 hover:text-red-900 bg-red-100 border-0 border-none"
                                        >
                                            <TrashIcon size={16} className="mr-2" weight="fill" />
                                            Remover
                                        </Button>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Modal show={modalRemoverAberto} onClose={() => setModalRemoverAberto(false)}>
                <ModalHeader className="bg-red-600 text-white">Confirmar Remoção</ModalHeader>
                <ModalBody className="bg-gray-50">
                    <p className="text-gray-800">
                        Tem certeza que deseja remover o filme <strong>{filmeParaRemover}</strong>?
                    </p>
                    <div className="mt-4 flex justify-center gap-4">
                        <Button 
                            onClick={() => setModalRemoverAberto(false)} 
                            className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white"
                            color='gray'
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={handleConfirmarRemocao} 
                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                            color=''
                        >
                            Remover
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
