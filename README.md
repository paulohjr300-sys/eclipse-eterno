# Eclipse Eterno — site

Site estático pronto para produção. Sem build, sem dependências, sem back-end.
Todos os arquivos ficam soltos na raiz (sem pastas), então dá para subir pelo celular.

| Arquivo | O que é |
|---|---|
| `index.html` | landing page (o jogo abre dentro dela ao tocar em Jogar) |
| `jogar.html` | o jogo, versão de produção |
| `manifest.webmanifest`, `sw.js` | fazem o jogo ser um app instalável (PWA) que abre até sem internet |
| `icon-*.png`, `apple-touch-icon.png`, `favicon*`, `logo.svg`, `emblem-256.png` | logo e ícones |
| `shot-*.webp` | prints do jogo usados na landing page |
| `pix_qr.png` | QR Code do Pix |
| `vercel.json` | cabeçalhos para o app atualizar direito no Vercel |

## Publicar no GitHub + Vercel

1. No repositório do GitHub: **Add file → Upload files**, selecione todos os arquivos e faça o commit.
2. Em vercel.com: **Add New → Project**, importe o repositório.
3. Framework: *Other*. Não preencha build command nem output directory.
4. Deploy. O jogo fica em `https://seu-projeto.vercel.app/jogar.html`.

## Instalar na tela inicial

- **Android (Chrome):** abra o site, toque em Jogar e use o botão **Instalar o app** do menu do jogo
  (ou menu ⋮ → *Instalar app*).
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.

O app instalado abre direto no jogo, em tela cheia.

## Atualizar o jogo depois

Substitua `jogar.html` (e o `sw.js` novo que vem junto) e faça o commit. O Vercel republica sozinho
e o app instalado pega a versão nova na próxima vez que abrir com internet.

## Observações

- O progresso fica salvo no navegador do jogador. Trocar de domínio começa um save novo.
