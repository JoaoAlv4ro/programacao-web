'use client';
import Link from 'next/link';
import { FilmReelIcon, TerminalIcon } from '@phosphor-icons/react';
import { Button } from 'flowbite-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <FilmReelIcon size={48} className="mx-auto mb-4 text-blue-600" weight="fill" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Catálogo de Filmes</h1>
          <p className="text-lg text-gray-600">Aplicação completa com CLI e GUI</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <div className="flex items-start gap-3">
              <TerminalIcon size={24} className="text-blue-600 flex-shrink-0 mt-1" weight="fill" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Versão CLI Disponível</h2>
                <p className="text-gray-700">
                  Este projeto também oferece uma versão CLI (Command Line Interface) completa com 8 opções de menu para gerenciar seu catálogo de filmes via terminal. Caso queira acessar essa versão, basta acessar o repositório do projeto e seguir as instruções no README para rodar a aplicação CLI.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <div className="flex items-start gap-3">
              <FilmReelIcon size={24} className="text-green-600 flex-shrink-0 mt-1" weight="fill" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Versão GUI Disponível</h2>
                <p className="text-gray-700">
                  Ou explore a interface gráfica moderna construída com React, Flowbite e Tailwind CSS para uma experiência visual completa. 
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/filmes" className="flex-1">
            <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3" size="lg">
              Acessar GUI
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            <strong>Desenvolvido com:</strong> TypeScript • Next.js • React • Tailwind CSS • Flowbite
          </p>
        </div>
      </div>
    </main>
  );
}
