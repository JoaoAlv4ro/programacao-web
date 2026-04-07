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

export type GeneroFilme = typeof generosFilmes[number];

export interface Filme {
    titulo: string;
    anoLancamento: number;
    genero: GeneroFilme;
    duracao: number; // duração em minutos
    avaliacaoPublico?: number;
}