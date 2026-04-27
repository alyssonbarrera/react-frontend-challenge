# INSTRUCTIONS

## Projeto escolhido

- Opção A: CineDash (Filmes)

## Pré-requisitos

- Node.js 20+
- pnpm 9+

## Como rodar o projeto

1. Instale as dependências:

```bash
pnpm install
```

2. Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

No Windows (PowerShell), você pode usar:

```powershell
Copy-Item .env.example .env
```

3. Configure as variáveis no arquivo `.env`:

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

- A autenticação é simulada no front-end.
- Use qualquer e-mail válido e senha com pelo menos 7 caracteres.

Exemplo:

- Email: `alex@example.com`
- Senha: `1234567`

## Scripts disponíveis

- `pnpm dev`: inicia o servidor Vite na porta 3000.
- `pnpm build`: gera o build de produção.
- `pnpm preview`: sobe o build gerado para validação local.
- `pnpm test`: executa os testes uma vez.
- `pnpm test:watch`: executa testes em modo watch.
- `pnpm test:cov`: executa testes com cobertura.
- `pnpm test:ui`: abre interface dos testes (Vitest UI).
- `pnpm lint`: roda o lint com Biome.
- `pnpm format`: roda formatação com Biome.
- `pnpm check`: roda verificações completas do Biome.

## Validação rápida antes de entregar

```bash
pnpm lint && pnpm test && pnpm build
```

## Observações

- Sem `VITE_APP_TMDB_KEY` válido, as requisições para o TMDB vão falhar.
- O projeto usa React + TypeScript + Vite com TanStack Query, TanStack Router, Zustand e Shadcn UI.