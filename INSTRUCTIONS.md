# INSTRUCTIONS

## Projeto escolhido

- Opcao A: CineDash (Filmes)

## Pre-requisitos

- Node.js 20+
- pnpm 9+

## Como rodar o projeto

1. Instale as dependencias:

```bash
pnpm install
```

2. Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

No Windows (PowerShell), voce pode usar:

```powershell
Copy-Item .env.example .env
```

3. Configure as variaveis no arquivo `.env`:

```env
VITE_API_URL="https://api.themoviedb.org/3"
VITE_APP_TMDB_KEY="<SEU_TMDB_BEARER_TOKEN>"
```

4. Inicie o projeto em modo de desenvolvimento:

```bash
pnpm dev
```

5. Acesse no navegador:

- http://localhost:3000

## Login para testes

- A autenticacao e simulada no front-end.
- Use qualquer email valido e senha com pelo menos 7 caracteres.

Exemplo:

- Email: `alex@example.com`
- Senha: `1234567`

## Scripts disponiveis

- `pnpm dev`: inicia o servidor Vite na porta 3000.
- `pnpm build`: gera o build de producao.
- `pnpm preview`: sobe o build gerado para validacao local.
- `pnpm test`: executa os testes uma vez.
- `pnpm test:watch`: executa testes em modo watch.
- `pnpm test:cov`: executa testes com cobertura.
- `pnpm test:ui`: abre interface dos testes (Vitest UI).
- `pnpm lint`: roda o lint com Biome.
- `pnpm format`: roda formatacao com Biome.
- `pnpm check`: roda verificacoes completas do Biome.

## Validacao rapida antes de entregar

```bash
pnpm lint && pnpm test && pnpm build
```

## Observacoes

- Sem `VITE_APP_TMDB_KEY` valido, as requisicoes para o TMDB vao falhar.
- O projeto usa React + TypeScript + Vite com TanStack Query, TanStack Router, Zustand e Shadcn UI.