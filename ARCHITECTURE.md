# 🏛 ARCHITECTURE

Este documento descreve as decisões técnicas do **CineDash** (Opção A do desafio) e o porquê de cada uma. A intenção é que qualquer pessoa que abra este repositório consiga, em poucos minutos, entender **como o código está organizado**, **por que está organizado assim** e **como evoluí-lo sem quebrar contratos internos**.

---

## 0. Mapa em 60 segundos

- **Arquitetura base**: organização por módulos de domínio (`src/modules`) com camada transversal em `src/core` e integrações externas em `src/infra`.
- **UI e regra separadas**: componentes não triviais seguem View + Model (`.tsx` + `.hook.ts`).
- **Dados remotos**: Query/Mutation em `modules/*/queries|mutations`, requests puras em `modules/*/http`, cliente HTTP único em `infra/http/api-client.ts`.
- **Roteamento**: TanStack Router com layouts por prefixo `_`, `beforeLoad` para guard/redirect e loader híbrido em `/movie/$id`.
- **Estados**: Server state com TanStack Query, client state com Zustand e filtros/busca em URL via nuqs.

---

## 1. Visão geral

CineDash é uma SPA construída com **React 19 + Vite + TypeScript (strict)** que consome a API pública do **TMDB** para oferecer:

- Descoberta e busca de filmes (lista virtualizada com infinite scroll).
- Watchlist pessoal persistida no `localStorage` (tabela com ordenação, busca e paginação).
- Página de detalhes de filme (sinopse, elenco, trailer, providers de streaming).
- Autenticação simulada (login form com validação Zod, persistência via cookie).

A arquitetura combina duas convenções principais:

1. **Module-Based Code Organization** — para organizar o código em alto nível.
2. **View + Model (MVVM simplificado)** — para separar UI (View) de regra/orquestração (Model) dentro de cada componente.

---

## 2. Stack e por que cada peça

| Camada | Tecnologia | Motivação |
|---|---|---|
| Build / Dev server | **Vite 8** | HMR rápido, configuração mínima, suporte nativo a TS e a `tsconfig paths`. |
| UI lib | **React 19** | Concurrent Features estáveis e `Activity` para alternar visibilidade sem desmontar subárvores da UI (ex.: paginação/ícones na watchlist). |
| Tipagem | **TypeScript strict** | `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports` para falhar cedo. |
| Roteamento | **TanStack Router** | File-based routing tipado, layouts via prefixo `_`, code splitting por rota (`autoCodeSplitting`) e preloading por intenção (`defaultPreload: "intent"`). |
| Server state | **TanStack Query** | Cache, deduplicação, `useInfiniteQuery`, `queryOptions` reutilizáveis e chaves centralizadas (`queryKeys`) para consistência de cache e prefetch. |
| Client state | **Zustand** | Store mínima, sem boilerplate; usada para `auth`, `theme` e `watchlist` (com `persist` middleware). |
| URL state | **nuqs** | Filtros de discovery e busca da watchlist viram parte da URL — links compartilháveis e back/forward funcionam. |
| Forms | **React Hook Form + Zod + `@hookform/resolvers/standard-schema`** | Validação declarativa, performática (uncontrolled), schema reaproveitável para tipagem (`z.infer`). |
| HTTP | **ky** | Wrapper sobre `fetch` com `hooks.beforeRequest` (injeta o Bearer do TMDB) e `timeout`. |
| UI Kit | **shadcn/ui (radix-nova) + Tailwind v4** | Componentes copiados (não dependência opaca), totalmente customizáveis e versionados junto do app. |
| Tabelas | **TanStack Table v8** | Headless. Usado na watchlist para sorting/paginação client-side com tipagem forte. Diferencial mencionado no desafio. |
| Virtualização | **@tanstack/react-virtual** | Lista de descoberta pode ter centenas de filmes; virtualização headless com controle fino de layout/scroll evita renderização fora do viewport. |
| Cookies | **js-cookie** | API simples para persistir o token de auth simulado. |
| Notificações | **sonner** | Toasts acessíveis e leves. |
| Lint / format | **Biome** | Substitui ESLint+Prettier numa única ferramenta rápida. |
| Testes | **Vitest + RTL + jsdom + MSW** | Unit + integração. MSW mocka o TMDB; nas suítes que dependem de variação de cenário, a função de request é mockada diretamente (preferência do projeto). |

---

## 3. Module-Based Code Organization

A convenção segue o artigo [Module-Based Code Organization](https://medium.com/@alyssonbarrera.s/module-based-code-organization-48091ee917b0). Em síntese: **agrupar código pelo contexto de negócio** ao qual ele pertence, e **promover a `core/`** apenas o que for de fato compartilhado.

### 3.1 Estrutura de alto nível

```text
src/
├── main.tsx               # Bootstrap (React + Router + QueryClient)
├── route-tree.gen.ts      # Gerado automaticamente pelo TanStack Router
├── styles.css             # Tailwind + tokens globais
│
├── routes/                # Rotas (TanStack file-based)
│   ├── __root.tsx
│   ├── _authenticated.tsx           # Guard: redireciona se não autenticado
│   ├── _authenticated/
│   │   ├── _app-shell.tsx           # Layout (sidebar + header)
│   │   ├── _app-shell/
│   │   │   ├── discovery.tsx        # → DiscoveryScreen
│   │   │   └── watchlist.tsx        # → WatchlistScreen
│   │   ├── movie.tsx                # Wrapper de /movie/$id
│   │   └── movie.$id.tsx            # → MovieDetailScreen
│   ├── design-system.tsx
│   └── index.tsx                    # Login
│
├── core/                  # Código transversal (qualquer módulo pode usar)
│   ├── components/        # Botões, sidebar, header, table-pagination, ui/ (shadcn)
│   ├── constants/         # global-search, query-keys
│   ├── dtos/
│   ├── hooks/             # use-mobile, use-global-search, use-movie-details-prefetch-intent
│   ├── lib/               # cn(), helpers de UI
│   ├── stores/            # auth-store, theme-store
│   └── utils/             # debounce, to-year-data, ...
│
├── infra/                 # Dependências externas / "porta para o mundo"
│   ├── http/              # api-client (ky) + beforeRequest (Bearer TMDB)
│   └── cookies/           # auth-cookie helpers
│
└── modules/               # Núcleo do domínio
    ├── auth/
    │   ├── forms/login-form/        # form + .hook + .spec
    │   ├── http/                    # login-with-credentials-request
    │   ├── mutations/               # use-auth-mutations (TanStack Query)
    │   └── schemas/                 # login.schema (Zod)
    │
    ├── discovery/
    │   ├── components/              # discovery-filter-bar, movie-card, movie-grid, ...
    │   ├── constants/
    │   ├── dtos/                    # Movie, MoviesPage
    │   ├── hooks/                   # use-discovery-filters, use-discovery-search
    │   ├── http/                    # discover-movies-request, search-movies-request
    │   ├── queries/                 # use-list-movies-query (useInfiniteQuery)
    │   ├── screens/discovery-screen/
    │   ├── types/
    │   └── utils/
    │
    ├── movie-details/
    │   ├── components/              # movie-detail-body, movie-detail-hero, movie-detail-related, ...
    │   ├── http/                    # get-movie-details, get-credits, get-videos, ...
    │   ├── queries/                 # use-movie-details-query, ...
    │   └── screens/movie-detail-screen/
    │
    └── watchlist/
    │   ├── components/              # watchlist-table, watchlist-table-play-button, watchlist-empty-state, ...
    │   ├── hooks/                   # use-watchlist-search, use-watchlist-table-query
    │   ├── stores/                  # watchlist-store (Zustand + persist)
    │   ├── screens/watchlist-screen/
    │   └── utils/

tests/
├── factories/             # makeMovie, makeUser, makeWatchlistItem, ...
├── mocks/handlers/        # MSW handlers que espelham endpoints do TMDB
├── utils.tsx              # render()/renderHook com QueryClient + NuqsTestingAdapter + TooltipProvider
└── setup-tests.ts
```

### 3.2 Regras de dependência

```text
routes/ ─────► modules/<x>
routes/ ─────► core/

modules/<x> ─► core/
modules/<x> ─► infra/
modules/<x> ─► modules/<y> (imports pragmáticos, sem ciclos)

core/ ───────► infra/
core/ ───────► modules/<x> (exceções pontuais de composição global)
```

- `routes/` é **majoritariamente fina** (mapeia URL para Screen), mas também concentra responsabilidades de roteamento como `beforeLoad` (guard) e `loader` (orquestração de prefetch/dados críticos).
- Um **módulo pode importar de `core/` e `infra/`**.
- **Import entre módulos é permitido de forma pragmática**, desde que o contrato reutilizado seja canônico e não se introduza ciclo. Exemplos atuais: DTOs/utilitários de `discovery` reaproveitados por `watchlist` e `movie-details`.
- `core/` deve permanecer **agnóstico de domínio por padrão**. Exceções pontuais de composição global (como navegação/sidebar exibindo estado de módulo) são aceitas; quando possível, prefira inversão de dependência por props/selectors.

### 3.3 Quando promover algo para `core/`

> **Heurística:** só sobe para `core/` quando **dois ou mais módulos** já precisam, ou quando o conceito é genuinamente genérico (ex.: `debounce`, `useMobile`, `Button`).

Componentes que parecem genéricos mas têm acoplamento de domínio (ex.: `MovieCard`) ficam **dentro do módulo**. Isso evita o anti-padrão de uma `core/components` virar lixeira.

---

## 4. MVVM simplificado

A convenção adotada nos componentes **não-triviais** (form, screen, tabela, qualquer coisa com estado) segue o padrão **View + Model** das regras internas (MVVM simplificado):

- **View** → arquivo `.tsx`. Só JSX, props, e desestruturação do que vem da hook.
- **Model** → arquivo `.hook.ts(x)`. Concentra estado, side effects, queries/mutations, callbacks, validação.
- **Utilitários puros** → arquivo `.utils.ts(x)` quando há lógica que dá pra testar isolada (ex.: definição de colunas da `WatchlistTable`).

A diferença para um MVVM "ortodoxo" é que **não existe um componente intermediário** que receba o objeto de Model e repasse via props para a View. A View **chama a hook diretamente** — daí o "simplificado".

### 4.1 Por que assim?

- **Coesão**: tudo que descreve o comportamento de `LoginForm` mora em `login-form/`.
- **Testabilidade**: a hook é testável com `renderHook`, isolada da árvore visual; a View é testável com RTL focando em interação/acessibilidade.
- **Diff legível**: alterar regra (hook) não polui o diff da apresentação (tsx) e vice-versa.
- **Sem boilerplate**: dispensa um componente container vazio só para "amarrar" hook e view.

### 4.2 Anatomia padrão

```text
modules/auth/forms/login-form/
├── index.ts                    # re-export público do módulo
├── login-form.tsx              # View
├── login-form.hook.ts          # Model
├── login-form.spec.tsx         # teste de View (RTL)
└── login-form.hook.spec.ts     # teste de Model (renderHook)
```

### 4.3 Exemplo (resumido)

**Model** (`login-form.hook.ts`):

```ts
export function useLoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const form = useForm<LoginSchema>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLoginMutation({
    onSuccess: ({ token, user }) => {
      setAuth({ token, user });
      navigate({ to: "/discovery" });
    },
    onError: () => toast.error("Unable to login."),
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    isPending: loginMutation.isPending,
    handleSubmit: form.handleSubmit,
    onSubmit: (data: LoginSchema) => loginMutation.mutate(data),
    onSocialLogin,
    onForgotPassword,
    onCreateAccount,
  };
}
```

**View** (`login-form.tsx`):

```tsx
export function LoginForm() {
  const { errors, onSubmit, register, isPending, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* JSX puro consumindo o que a hook expôs */}
    </form>
  );
}
```

A View **não conhece** `react-hook-form`, `useNavigate`, `useAuthStore` ou a mutation. Trocar a estratégia de auth (REST → OAuth real, p.ex.) altera **só** a hook.

### 4.4 Quando NÃO criar `.hook.ts`

Componente puramente apresentacional (ex.: `CinedashLogo`, `PageHeader`, `EmptyState`) **não** precisa de hook. A regra é pragmática: se o `.tsx` começou a juntar `useState`, `useEffect`, `useQuery`, callbacks com regra... extraia.

---

## 5. Camada de dados (TanStack Query)

```text
                ┌──────────────────────────────┐
                │  Component (.tsx) — View      │
                └──────────────┬────────────────┘
                               │ chama
                               ▼
                ┌──────────────────────────────┐
                │  *.hook.ts — Model            │
                └──────────────┬────────────────┘
                               │ usa
                               ▼
                ┌──────────────────────────────┐
                │  modules/<x>/queries          │
                │  ou /mutations                │
                │  (useInfiniteQuery/useQuery)  │
                └──────────────┬────────────────┘
                               │ chama
                               ▼
                ┌──────────────────────────────┐
                │  modules/<x>/http/*.ts        │
                │  (função pura que usa `api`)  │
                └──────────────┬────────────────┘
                               │
                               ▼
                ┌──────────────────────────────┐
                │  infra/http/api-client (ky)   │
                │  + beforeRequest (Bearer)     │
                └──────────────────────────────┘
```

**Por que essa separação rígida?**

- A função em `http/` é **uma função, não uma hook**. Isso a torna trivial de testar (pode ser chamada direto) e de observar em testes de hook com `vi.spyOn` no módulo de request.
- O hook de query/mutation isola o ciclo de vida da requisição (cache key, `staleTime`, `getNextPageParam`, …).
- Se o backend mudar, mexe só em `http/`. Se a estratégia de cache mudar, mexe só em `queries/`.

**Cache keys**: chaves centralizadas em `core/constants/query-keys.ts` via builders tipados por domínio (ex.: `queryKeys.discovery.listMovies(queryParams)` e `queryKeys.movieDetails.details(movieId)`). Isso evita divergência de naming e facilita prefetch/invalidations consistentes.

**`staleTime` consciente**: 5 minutos no `useListMoviesQuery` para reduzir refetch em navegação back/forward — listas do TMDB raramente mudam dentro desse intervalo.

**`useInfiniteQuery`** para paginação progressiva no `MovieGrid`, com flatten via `useMemo` — a referência do array só muda quando há páginas novas.

### 5.1 Estratégia de Prefetch (Movie Details)

O prefetch foi dividido em três camadas para equilibrar latência percebida e custo de rede:

- **Intenção de interação (UI)**: `useMovieDetailsPrefetchIntent` faz prefetch por hover (com delay) e focus, com dedupe por `movieId`.
- **Rota**: o loader de `/movie/$id` garante os dados críticos com `ensureQueryData`.
- **Dados secundários**: créditos/vídeos/providers/recomendações só aquecem na navegação real (`!preload`).

Detalhamento e trade-offs dessa decisão estão na seção **7.2**.

---

## 6. Estado do cliente

Três Zustand stores, cada uma com responsabilidade única:

| Store | Local | Responsabilidade | Persistência |
|---|---|---|---|
| `auth-store` | `core/stores/` | token + user (login simulado) | cookie via `infra/cookies` |
| `theme-store` | `core/stores/` | tema claro/escuro | `localStorage` |
| `watchlist-store` | `modules/watchlist/stores/` | itens da watchlist + ações `add`/`remove`/`toggle`/`clear` | `localStorage` (`cinedash:watchlist`) via `persist` middleware |

**Por que `watchlist-store` mora no módulo e não em `core/`?** Porque é estado **de um módulo só**. Mantê-lo no módulo preserva encapsulamento e evita espalhar regra de domínio para o código transversal; componentes globais que precisam desse dado consomem seletivamente.

**URL state** (filtros de discovery, busca da watchlist) **não vai pra Zustand**: vai pro `nuqs`, ou seja, vira parte da URL. Isso resolve "share link", "voltar do navegador" e "abrir em nova aba" sem código extra.

---

## 7. Roteamento (TanStack Router)

```text
routes/
├── __root.tsx                       (providers globais visuais, devtools)
├── index.tsx                        ─►  /              (login)
├── design-system.tsx                ─►  /design-system
└── _authenticated.tsx               (layout virtual — guard)
    └── _authenticated/
        ├── movie.tsx                ─►  /movie         (wrapper)
        ├── movie.$id.tsx            ─►  /movie/:id
        └── _app-shell.tsx           (layout virtual — sidebar+header)
            └── _app-shell/
                ├── discovery.tsx    ─►  /discovery
                └── watchlist.tsx    ─►  /watchlist
```

- Prefixo `_` cria **layouts virtuais** sem segmento de URL. Ex.: `_authenticated.tsx` aplica o guard de auth para tudo abaixo.
- `autoCodeSplitting: true` no `tanstackRouter` plugin: cada rota vira chunk próprio. Login e design-system **não** carregam código de discovery/watchlist.
- `defaultPreload: "intent"` combinado com `defaultPreloadStaleTime: 0` permite preloading de rota orientado a intenção, sempre reavaliando staleness.
- A rota `/movie/$id` tem loader híbrido: garante `movieDetails` como dado bloqueante e só prefetch de dados complementares fora do fluxo de preload.
- Há `beforeLoad` para guard/redirect em três pontos: `_authenticated` (não autenticado -> `/`), `/` (autenticado -> `/discovery`) e `/movie` base (redirect para `/discovery`).
- Tipagem ponta a ponta: `navigate({ to: "/discovery" })` é validado em build.

### 7.1 Botão "Back" e a Navigation API (`infra/history/history-back.ts`)

No cenário reproduzido no app (`/discovery -> /movie/A -> /movie/B`), observou-se no Chromium que `window.history.back()` pode ser ignorado por intervention de histórico em sequência específica de navegação, sem sinal explícito de erro no app.

**Decisão adotada.** O helper `historyBack()` prioriza `window.navigation.back()` (quando disponível) e mantém fallback para `window.history.back()`. Com isso, o comportamento de voltar fica mais previsível sem introduzir estado manual de histórico na aplicação.

### 7.2 Estratégia de prefetch (composição Router + Query)

Três peças se compõem para reduzir latência percebida sem sobrecarregar o TMDB:

1. **Preload por intenção do Router.** `defaultPreload: "intent"` + `defaultPreloadStaleTime: 0` no `createRouter`. Ao dar hover/focus num `<Link>`, o Router pré-carrega o **bundle** da rota (chunk separado por `autoCodeSplitting`) e dispara o `loader` da rota com a flag `preload: true`.

2. **Loader da rota `/movie/$id`.** Usa `context.queryClient.ensureQueryData(movieDetailsQueryOptions(movieId))` para garantir os dados críticos do detalhe (sinopse, poster, rating). Quando `preload === false` (navegação real, não intent-preload), dispara também `prefetchQuery` para créditos, vídeos, watch providers e recomendações. **Por que gatear no `!preload`?** Hover é sinal forte mas não definitivo; aquecer cinco endpoints por hover seria desperdício se o usuário acabar não clicando. As queries secundárias só esquentam quando há commit de navegação.

3. **Intent prefetch granular nos cards (`useMovieDetailsPrefetchIntent`).** O `MovieCard` chama `router.preloadRoute({ to: "/movie/$id", params })` em **hover (com 120ms de debounce)** e em **focus**. O hook mantém um `Map` de timeouts e um `Set` de IDs já prefetchados (idempotência); `mouseLeave` cancela o timeout pendente, evitando requests para cards "tangenciados" pelo cursor. Isso aciona o mesmo loader do item 2 — ou seja, hover num card aquece `movieDetails`, mas não as queries secundárias.

**Decisão consciente: nada de prefetch no mobile.** Considerou-se `onTouchStart` e `IntersectionObserver` com `rootMargin`. Ambos foram descartados:
- `onTouchStart` dispara no mesmo gesto que comita a navegação (~50ms de janela). Ganho de latência irrelevante e ainda gera request em toques que viram scroll.
- `IntersectionObserver` com margem dispararia prefetch para cada card que entrasse na viewport — numa grade de ~100 cards, seriam ~100 requests ao TMDB por sessão de scroll, com >90% de desperdício. TMDB tem rate limit (~50 req/s) e o usuário mobile paga em dados.

Hover é sinal forte (mira deliberada num card específico). Toque/scroll não é. No mobile, o detalhe carrega no tap com skeleton da rota — comportamento honesto, sem queimar API/dados.

> **A lista de Discovery não tem loader de dados.** O `defaultPreload: "intent"` já adianta o **bundle** ao dar hover no link da sidebar; os dados carregam em paralelo ao commit, com skeleton breve. Implementar um loader exigiria expor os filtros (hoje em `nuqs`) também via `validateSearch` da rota — duplicaria parsers e ainda não traria ganho perceptível, dado que a query principal entra em cache de 5 min após o primeiro acesso.

---

## 8. Infra (`src/infra`)

Pequena por princípio. Hoje HTTP + cookies + um adapter de history do browser.

**`infra/http/api-client.ts`**:

```ts
export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL || "http://localhost:3333",
  timeout: 10_000,
  hooks: { beforeRequest: [beforeRequest] },
});
```

`beforeRequest` injeta o Bearer do TMDB e o header `Accept`. **As chamadas HTTP ao TMDB passam por aqui** — não há `fetch` solto para esse fluxo no código. A autenticação do desafio é simulada localmente, então não depende de request de rede. Trocar de `ky` para `axios` (ou para um SDK gerado) continua sendo uma alteração local em `infra/`.

**`infra/history/history-back.ts`** encapsula a navegação "voltar" do browser priorizando a Navigation API; ver seção 7.1 para a motivação.

---

## 9. Testes

Duas frentes complementares:

| Tipo | Como | Onde |
|---|---|---|
| Unit (lógica pura) | Vitest puro | `*.utils.spec.ts`, `stores/*.spec.ts` |
| Hook (Model) | `renderHook` via `@tests/utils` + `vi.spyOn` nos requests | `*.hook.spec.ts(x)` |
| Componente (View) | RTL com `@tests/utils` + `vi.mock` do hook local | `*.spec.tsx` |
| Request (HTTP) | Chamada real ao request com interceptação MSW | `http/*.spec.ts` |

**Convenções importantes** (consolidadas no projeto):

- **Não mockar query hooks**: para variar cenários de erro/loading em hook specs, observa-se o request com `vi.spyOn` no módulo `http/*.ts` e controla-se o retorno com `mockResolvedValueOnce` / `mockRejectedValueOnce`.
- **Em specs de View**, mocka-se o hook local do componente com `vi.mock("./componente.hook")` para testar somente renderização e interação da View.
- **Factories** ficam em `tests/factories/` e seguem assinatura `(override?: Partial<T>) => T`.
- **`data-testid`** em pontos-chave da árvore (`discovery-screen`, `watchlist-table`, ...) para queries estáveis.
- **Matchers de presença**: base atual usa bastante validação de presença; evolução prevista é aumentar matchers semânticos e consultas orientadas a acessibilidade nos fluxos críticos.

---

## 10. Convenções de código

- **kebab-case** para nomes de pastas/arquivos.
- **Componente** = `function Name()` (não `const`).
- **TypeScript**: prefira `type` a `interface`; `unknown` a `any`; optional chaining e `??`.
- **Imports** com alias `@/` (src) e `@tests/` (tests) — definidos em `tsconfig.json` e resolvidos pelo `vite-tsconfig-paths`.
- **Lint/format** com Biome (`biome.json`). Pré-commit recomendado: `pnpm check`.

---

## 11. Trade-offs assumidos

| Decisão | Alternativa rejeitada | Por quê |
|---|---|---|
| MVVM simplificado (sem container) | Container component repassando props | Custo de boilerplate sem ganho real; React Hooks já dão a mesma testabilidade. |
| Module-based em vez de Feature-Sliced Design (FSD) | FSD canônico (`entities/`, `features/`, `widgets/`...) | FSD tem ganhos em produtos com muitos *features cross-entity*; aqui o domínio é compacto e a convenção interna é mais leve e direta. Atende o critério "estrutura modular sólida" do desafio. |
| Zustand para client state | Redux Toolkit / Context API | Bundle menor, API mínima, `persist` middleware resolve watchlist sem código adicional. |
| `nuqs` para filtros/busca | Estado em store + sincronização manual com URL | Elimina uma classe inteira de bugs de navegação e estado (perda de filtros ao retornar). |
| `ky` em vez de `axios` | `axios` | Menor, baseado em `fetch` (Edge-friendly), API de hooks (`beforeRequest`) muito enxuta. |
| Auth simulada | Backend mock real (json-server/MSW only) | O desafio explicitamente foca em frontend; manter a simulação local + cookie cobre os fluxos de UX (guard, persistência, logout). |
| Watchlist em `localStorage` (Zustand persist) | IndexedDB / backend | Volume pequeno, leitura síncrona, bom o suficiente. Mudar para IndexedDB é trocar o `storage` do middleware. |
| Mock direto da função de request nos testes | `server.use` do MSW por suíte | Mais explícito e menos verboso para variações pontuais (erro/sucesso) sem precisar redefinir handlers. MSW segue cobrindo o cenário "feliz" global. |

---

## 12. Como evoluir

- **Novo módulo** (ex.: `recommendations`): crie `src/modules/recommendations/{components,http,queries,screens,...}`. Não precisa tocar em `core/` nem em `infra/` se o backend já está exposto pelo `api-client`.
- **Nova rota**: crie o arquivo em `src/routes/...` seguindo a convenção do TanStack Router; o `route-tree.gen.ts` é regenerado automaticamente pelo plugin do Vite.
- **Novo componente "global"**: comece dentro do módulo. Só promova para `core/components` quando um segundo módulo realmente precisar.
- **Nova query de server state**: primeiro adicione a key em `core/constants/query-keys.ts`, depois exponha `queryOptions` no módulo. Isso evita strings soltas de cache key.
- **Trocar provider de auth**: alterar `modules/auth/http`, `modules/auth/mutations` e `core/stores/auth-store`. Componentes não precisam mudar.

---

## 13. Aderência aos critérios do desafio

| Critério da avaliação | Como o projeto atende |
|---|---|
| Estrutura modular sólida | Organização por domínio em `modules/`, com fronteiras explícitas e convenção de promoção para `core/`. |
| Separação UI / lógica / dados | View + Model por componente e camada de dados separada em `queries/mutations/http`. |
| TanStack Query bem aplicado | Cache keys centralizadas, `queryOptions`, `useInfiniteQuery`, prefetch por intenção + loader. |
| Estado e persistência | Zustand para auth/theme/watchlist, com persist e responsabilidades separadas. |
| UX de estados assíncronos | Skeletons, erro e vazio tratados em telas/componentes-chave. |
| Testes significativos | Cobertura de hook, view e requests com estratégia consistente de mocks/factories. |
| Documentação de decisões | Trade-offs explícitos, justificativa de escolhas e caminhos de evolução. |

---

## 14. Referências

- [Module-Based Code Organization — Alysson Barrera](https://medium.com/@alyssonbarrera.s/module-based-code-organization-48091ee917b0)
- [TanStack Router — File-based routing](https://tanstack.com/router)
- [TanStack Query — Caching & Infinite Queries](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com)
