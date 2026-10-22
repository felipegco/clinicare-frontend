# CliniCare — Frontend

Site da **CliniCare**, clínica odontológica em Rio Claro (SP). Reúne a landing page da clínica (serviços, equipe e contato) e a tela de acesso ao sistema de agendamento.

**Site no ar:** https://felipegco.github.io/clinicare-frontend/

---

## Funcionalidades

- **Landing page:** apresentação da clínica, serviços, especialistas, contato com mapa e botão de agendamento pelo WhatsApp.
- **Header de vidro (liquid glass):** o header refrata o conteúdo da página que passa por baixo dele, em todos os navegadores (inclusive Safari), usando a biblioteca [`@ybouane/liquidglass`](https://liquid-glass.ybouane.com).
- **Carrossel no Hero:** fotos da recepção com transição automática ([Swiper](https://swiperjs.com)).
- **Login e cadastro em etapas:** um único fluxo que verifica o e-mail e leva o usuário ao login ou ao cadastro, com um stepper clicável para voltar a etapas anteriores e uma etapa opcional para completar o perfil.

## Tecnologias

- [React 19](https://react.dev) + [Vite 7](https://vite.dev)
- [React Router](https://reactrouter.com) (`HashRouter`, compatível com o GitHub Pages)
- [react-scroll](https://github.com/fisshy/react-scroll) para a navegação suave entre seções
- [Swiper](https://swiperjs.com)
- [@ybouane/liquidglass](https://github.com/ybouane/liquidglass) (WebGL)
- CSS puro, um arquivo por componente

## Backend

A landing page funciona sozinha. Já o **login e o cadastro** dependem da API do projeto rodando localmente em `http://localhost:8080`:

**Repositório da API:** [felipegco/clinicare-backend](https://github.com/felipegco/clinicare-backend)

Siga o README do backend para subir o banco e o servidor. O endereço da API está em `src/pages/Login.jsx` (`API_URL`).

## Como rodar

O projeto usa **[pnpm](https://pnpm.io)**. Use pnpm em vez de npm: a LiquidGlass recebe um patch (em `patches/`) que só o pnpm aplica.

```bash
git clone git@github.com:felipegco/clinicare-frontend.git
cd clinicare-frontend
pnpm install
pnpm dev
```

Abra o endereço que aparecer no terminal (por padrão `http://localhost:5173/clinicare-frontend/`).

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento com hot reload |
| `pnpm build` | Gera a versão de produção em `dist/` |
| `pnpm preview` | Serve o build de produção localmente |
| `pnpm lint` | Roda o ESLint |
| `pnpm run deploy` | Gera o build e publica no GitHub Pages |

## Deploy

O site é servido pelo GitHub Pages a partir da branch `gh-pages`. **Fazer merge na `main` não publica nada**: depois do merge, rode a partir da `main` atualizada:

```bash
pnpm run deploy
```

Use `pnpm run deploy`, não `pnpm deploy`, que é um comando interno do pnpm com outra função.

## Estrutura

```
src/
├── App.jsx               # Rotas e montagem da landing page
├── assets/               # Imagens e logos
├── components/
│   ├── sections/         # Header, Hero, Serviços, Especialistas, Contato, Footer
│   └── ui/               # Componentes reutilizáveis (botão, cards, efeito do header)
└── pages/
    └── Login.jsx         # Login e cadastro em etapas
patches/                  # Correção aplicada pelo pnpm na @ybouane/liquidglass
```

## Header de vidro: cuidados

O efeito captura o conteúdo da página e o redesenha com WebGL. Para ele continuar funcionando:

- **Imagens leves:** imagens muito grandes (na casa de MB) não são capturadas no Safari. Exporte as fotos já no tamanho em que aparecem na tela.
- **Nada de `<img src="">`:** uma imagem com `src` vazio quebra a captura da seção inteira.
- **Novas seções** precisam ser filhas diretas da `div.glass-root` em `App.jsx`, como as atuais.
- **Ajustes visuais** (refração, blur, cantos, sombra) ficam no `glassConfig`, em `src/components/sections/Header/Header.jsx`.
- **Ao atualizar a `@ybouane/liquidglass`**, confira se o patch em `patches/` ainda é necessário e teste no Safari.
