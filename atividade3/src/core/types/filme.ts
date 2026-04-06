export type GeneroFilme =
    | 'Ação'
    | 'Aventura'
    | 'Comédia'
    | 'Drama'
    | 'Ficção Científica'
    | 'Terror'
    | 'Romance'
    | 'Animação'
    | 'Documentário'
    | 'Fantasia'
    | 'Suspense'
    | 'Musical';

export interface Filme {
    titulo: string;
    anoLancamento: number;
    genero: GeneroFilme;
    duracao: number; 
    avaliacaoPublico?: number;
}