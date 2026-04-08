export const generosFilmes = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Ficção Científica',
    'Terror',
    'Romance',
    'Animação',
    'Documentário',
    'Fantasia',
    'Suspense',
    'Musical'
] as const;

export type GeneroFilmes = typeof generosFilmes[number];

export interface Filme {
    titulo: string;
    anoLancamento: number;
    genero: GeneroFilmes;
    duracao: number; // duração em minutos
    avaliacaoPublico?: number;
}