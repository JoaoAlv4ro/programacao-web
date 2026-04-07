# 🎬 Catálogo de Filmes - TypeScript

Aplicação completa para gerenciar um catálogo de filmes, desenvolvida com **TypeScript**, **Clean Architecture** e **DDD (Domain-Driven Design)**.

A aplicação oferece **duas interfaces**:
- **CLI**: Menu interativo no console 
- **GUI**: Interface web moderna com React 

---

## 🏗️ Arquitetura

O projeto segue **Clean Architecture + Domain-Driven Design**:

```
┌─────────────────────────────────────────┐
│  Presentation Layer                     │
│  ├─ CLI (src/cli/)                      │
│  └─ GUI (src/app/, src/components/)     │
├─────────────────────────────────────────┤
│  Application Layer                      │
│  └─ Services (src/services/)            │
├─────────────────────────────────────────┤
│  Domain Layer                           │
│  ├─ Models (src/core/models/)           │
│  ├─ Types (src/core/types/)             │
│  └─ Business Rules (src/core/utils/)    │
├─────────────────────────────────────────┤
│  Infrastructure Layer                   │
│  └─ Data Store (src/data/)              │
└─────────────────────────────────────────┘
```

---

## 🚀 Como Executar

### 1️⃣ Instalação

```bash
npm install
```

### 2️⃣ Executar CLI (Menu no Console)

```bash
npm run cli
```

**Funcionalidades:**
- ➕ Adicionar novo filme
- 📋 Listar todos os filmes
- 🔍 Buscar filme por título
- 🎯 Buscar filmes por gênero
- 📊 Ordenar por ano
- ⭐ Ordenar por avaliação
- 🗑️ Remover filme

### 3️⃣ Executar GUI (Interface Web)

```bash
npm run dev
```

Acesse: **http://localhost:3000**

**Funcionalidades:**
- ✨ Design moderno com Tailwind CSS + Flowbite
- 🎨 Ícones do Phosphor
- 📱 Responsivo
- ⚡ Atualização em tempo real
- 🔍 Busca e filtros
- 📊 Visualização em cards

---

## 📦 Estrutura

```
src/
├── cli/              # Interface de console
├── app/              # Next.js (GUI)
├── components/       # Componentes React
├── core/             # Domínio
│   ├── types/        # Tipagem
│   ├── models/       # Classes
│   └── utils/        # Validações
├── services/         # Serviços
├── data/             # Dados
└── hooks/            # Custom Hooks
```

---

## 📋 Requisitos Atendidos

- [x] Tipagem TypeScript
- [x] Interface interativa (CLI)
- [x] Classes e objetos
- [x] Manipulação de arrays
- [x] Validações
- [x] GUI moderna e responsiva com React

---

## 🤖 Tecnologias

- **TypeScript** - Tipagem
- **React 19** / **Next.js 16** - GUI
- **Tailwind CSS** - Estilização
- **Flowbite** - Componentes
- **Phosphor Icons** - Ícones
- **Node.js** - CLI

---
