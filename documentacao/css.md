# CSS (`recursos/estilo.css`)

[← Voltar ao índice](../README.md)

Folha de estilo única, sem pré-processador, organizada em 12 partes numeradas (cada uma começa com um comentário de título).

| Parte | Conteúdo |
|---|---|
| 1 | Variáveis de design (`:root`) |
| 2 | Regras gerais: `box-sizing`, tipografia base, foco, `prefers-reduced-motion`, utilitários |
| 3 | Cabeçalho e faixa de 40 semanas |
| 4 | Layout em grade: menu lateral + conteúdo |
| 5 | Seções, abertura, caixas "a escrever" e etiquetas pendentes |
| 6 | Trimestres e "Cuidados": cartões, fatos, linha do tempo, caixa de alerta |
| 7 | Consulta de alimentos: busca, legenda, tabela, etiquetas de situação, barrinha |
| 8 | Bibliografia |
| 9 | Paginação (Anterior / Próximo) |
| 10 | Aviso fixo |
| 11 | Responsividade (`max-width: 880px` e `680px`) |
| 12 | Impressão (`@media print`) |

## Variáveis de design

| Variável | Valor | Uso |
|---|---|---|
| `--papel` | `#F3F6F1` | fundo da página |
| `--superficie` | `#FFFFFF` | fundo de caixas e tabelas |
| `--tinta` | `#1D2B28` | texto principal |
| `--tinta-suave` | `#4E5F5A` | texto secundário |
| `--linha` | `#D6E1DA` | bordas e divisórias |
| `--verde` / `--verde-claro` | `#2F6B5F` / `#E3EEE8` | links, item ativo, foco / fundos de destaque |
| `--tri1` `--tri2` `--tri3` | `#C7DDCD` `#8FBBA2` `#4E8D73` | escala dos trimestres (claro → escuro) |
| `--seguro` / `--seguro-fundo` | `#2E7D4F` / `#E2F1E7` | situação Seguro |
| `--limitar` / `--limitar-fundo` / `--limitar-barra` | `#9A6A00` / `#FBF0D2` / `#D9A021` | situação Limitar; o fundo também é usado no aviso |
| `--evitar` / `--evitar-fundo` | `#A62D42` / `#F8E3E6` | situação Evitar e caixa de alerta |
| `--fonte-titulo` | Young Serif → Georgia → serif | títulos |
| `--fonte-texto` | Atkinson Hyperlegible → fonte do sistema | texto |
| `--largura-menu` | `248px` | coluna do menu lateral |
| `--raio-pequeno` / `--raio-grande` | `6px` / `14px` | cantos arredondados |
| `--altura-aviso` / `--altura-busca` | medidas pelo JS | posição das camadas fixas (abaixo) |

As cores de situação sempre aparecem junto com um texto ("Seguro", "Limitar"…), nunca sozinhas.

## Layout

- `.estrutura`: `display: grid` com `grid-template-columns: var(--largura-menu) minmax(0, 1fr)`, largura máxima de 1280px.
- `.faixa-semanas ol` e `.info-trimestre .mini`: `grid-template-columns: 13fr 14fr 13fr`, a proporção das semanas de cada trimestre (13 + 14 + 13 = 40).
- Cartões (`.crescimento`) e colunas de texto (`.duas-colunas`): `repeat(auto-fit, minmax(…, 1fr))`, que reflui sem precisar de *media query*.
- Comprimento de linha limitado em `ch` (`.texto-corrido` 68ch, `.abertura` 62ch) para facilitar a leitura.

## Camadas fixas (*sticky*)

Três camadas ficam presas no topo ao rolar e precisam se empilhar sem se sobrepor:

| Elemento | `top` | `z-index` |
|---|---|---|
| `.aviso` | `0` | 20 |
| `.ferramentas-busca` (busca) | `var(--altura-aviso)` | 5 |
| `.alimentos thead th` (cabeçalho da tabela) | `calc(var(--altura-aviso) + var(--altura-busca))` | 4 |
| `.menu-lateral` | `calc(var(--altura-aviso) + 1.5rem)` | — |

As alturas variam com a largura da tela (o texto quebra em mais linhas). Por isso são medidas pelo JavaScript (`medirPartesFixas()`) e gravadas como variáveis CSS no `<html>`. Observação: `.moldura-tabela` não pode ter `overflow: hidden`, porque isso desliga o *sticky* do cabeçalho da tabela.

`.referencias li` usa `scroll-margin-top` para que a fonte aberta por um link não fique escondida atrás do aviso, e `:target` para destacá-la.

## Componentes principais

| Classe | Componente |
|---|---|
| `.etiqueta` + `.seguro` / `.limitar` / `.evitar` / `.sem-fonte` / `.a-pesquisar` | etiqueta de situação (bolinha via `::before`) |
| `.janela` > `.periodo` + `.trilha` > `.preenchimento.<situacao>` | coluna "Quando": texto + barrinha de 40 semanas, com marcas nas semanas 13 e 27 (gradientes em `background-image`) |
| `.tabela-legenda` | legenda "Como ler a tabela", com coluna `.numero` alinhada (`tabular-nums`) |
| `.caixa-alerta` | sinais de alerta (lista em `columns: 2 260px`) |
| `.fatos` | lista de definições `dl` em grade de 2 colunas |
| `.linha-do-tempo` | etapas do pré-natal com barrinha |
| `.a-escrever` | caixa tracejada para conteúdo ainda não escrito |
| `.nota` | caixa verde de observação |
| `.citacao`, `.fontes` | links de fonte, sem sublinhado até o *hover* |

## Responsividade

| Ponto de quebra | Mudanças |
|---|---|
| `max-width: 880px` | Cabeçalho em coluna; layout em 1 coluna; menu lateral vira o botão `.botao-menu` ("Temas") que abre a lista (`.menu-lateral.aberto .menu`) |
| `max-width: 680px` | Tabela de alimentos e legenda viram blocos empilhados (`display: block`); rótulos das células vêm de `content: attr(data-rotulo)` e de `content: "Itens: "`; `.fatos` e `.linha-do-tempo` em 1 coluna; paginação em 1 coluna |

## Impressão

`@media print` esconde faixa de semanas, menu, paginação e busca, deixa o aviso estático e mostra **todas** as seções (`.secao[hidden] { display: block }`), uma após a outra.

## Convenções

- Classes e variáveis em português, com hífens (`menu-lateral`, `--altura-aviso`).
- Estados vêm de atributos colocados pelo JavaScript, não de classes extras: `[hidden]`, `[aria-current]`, `[aria-expanded]`, `:target`. A única classe de estado é `.aberto`.
- `.grade-a-escrever` não é usada atualmente; foi mantida, sem efeito.
