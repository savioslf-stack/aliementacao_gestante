# JavaScript (`recursos/pagina.js`)

[← Voltar ao índice](../README.md)

Script clássico, sem bibliotecas e sem módulos, executado uma vez no fim do carregamento. Depende das constantes globais `FONTES` e `ALIMENTOS` (ver [Dados](dados.md)). Recursos da linguagem usados: arrow functions, template literals, spread, desestruturação com valores padrão, `Object.fromEntries`, `String.prototype.normalize` (ES2019+).

## Partes do arquivo

| Parte | O que faz | Executa quando |
|---|---|---|
| Configurações | `ROTULO_SITUACAO` (código → texto da etiqueta), `TOTAL_SEMANAS = 40` | — |
| 1. Bibliografia | Gera `li#fonte-N` em `#referencias` a partir de `FONTES` | uma vez |
| 2. Sinais de alerta | Gera `aside.caixa-alerta` em cada `.espaco-alerta` a partir de `SINAIS_DE_ALERTA` | uma vez |
| 3. Tabela e busca | Prepara `alimentosOrdenados`, registra eventos, chama `desenharTabela()` | uma vez e a cada tecla |
| 4. Navegação | `mostrarSecao()` e eventos `hashchange` e do botão "Temas" | a cada mudança de âncora |
| 5. Partes fixas | `medirPartesFixas()` + `ResizeObserver` | ao carregar e quando as alturas mudam |
| Final | `mostrarSecao(âncora atual, { focar: false })` | uma vez |

## Funções

| Função | Entrada → saída | Descrição |
|---|---|---|
| `normalizar(texto)` | texto → texto | Minúsculas e sem acentos (`normalize("NFD")` + remoção de U+0300–U+036F) |
| `escaparHtml(texto)` | texto → texto | Escapa `& < > " '` antes de inserir texto em `innerHTML` |
| `destacar(texto, termo)` | → HTML | Envolve em `<mark>` o trecho que corresponde à busca |
| `celulaQuando(alimento)` | → HTML | Texto do período + barrinha (posição e largura em %) |
| `citar(referencia)` | `7` ou `"7:24"` → HTML | Link `#fonte-N` com rótulo `[7, p. 24]`, `aria-label` e `title` com o título da fonte |
| `linksDasFontes(alimento)` | → HTML | Junta as citações do alimento; nada para `sem-fonte` e `a-pesquisar` |
| `palavras(texto)` | → texto | Texto com separadores trocados por espaço, para testar começo de palavra |
| `notaDaBusca(alimento, termo)` | → número | Relevância do alimento para o termo (abaixo) |
| `desenharTabela()` | — | Filtra, ordena e renderiza as linhas; atualiza contadores e mensagens |
| `limparBusca()` | — | Esvazia o campo, redesenha e devolve o foco |
| `mostrarSecao(id, { focar, idFonte })` | — | Mostra uma seção e atualiza menu, faixa, título da aba e paginação |
| `medirPartesFixas()` | — | Grava `--altura-aviso` e `--altura-busca` no `<html>` |

## Busca

1. Na preparação, cada alimento ganha `_nome` e `_termos` já normalizados, e a lista é ordenada por nome com `localeCompare(…, "pt-BR")`.
2. A cada evento `input`, o texto digitado é normalizado e cada alimento recebe uma nota:

| Nota | Critério | Exemplo (termo → alimento) |
|---|---|---|
| 0 | o nome começa com o termo | `sal` → Sal, Salsicha |
| 1 | uma palavra do nome começa com o termo | `sal` → Biscoito de água e sal |
| 2 | o termo aparece no meio do nome | `cha` → Salsicha |
| 3 | uma palavra dos termos de busca começa com o termo | `sushi` → Peixe cru |
| 4 | o termo aparece no meio dos termos de busca | — |
| −1 | não corresponde (fica fora da lista) | — |

3. A lista filtrada é ordenada pela nota (a ordenação de `Array.prototype.sort` é estável, então empates mantêm a ordem alfabética).
4. O destaque usa a mesma normalização. Isso funciona porque, para letras do português, remover o acento não muda o tamanho do texto, então as posições coincidem.

Com 559 itens, a filtragem e a renderização completas a cada tecla são instantâneas; não há *debounce* nem paginação da tabela.

## Navegação por âncora

- A seção visível é a do `location.hash`. Âncora desconhecida ou vazia mostra a primeira seção.
- `#fonte-N` é tratado como caso especial: abre `#bibliografia` e rola até `li#fonte-N` (`scrollIntoView({ block: "center" })`).
- Ao trocar de seção (com `focar: true`): volta ao topo e dá foco ao `<h2>` da seção (`preventScroll`), o que ajuda quem usa teclado ou leitor de tela.
- Atualiza `aria-current="page"` no menu, `aria-current="true"` na faixa de semanas, `document.title`, o texto do botão "Temas" e a paginação; também fecha o menu no celular.
- O valor da âncora passa por `decodeURIComponent`, por segurança, caso venha com caracteres codificados.

## Eventos

| Evento | Elemento | Ação |
|---|---|---|
| `input` | `#busca-alimentos` | `desenharTabela()` |
| `keydown` (Escape) | `#busca-alimentos` | `limparBusca()` |
| `click` | `.busca .limpar`, `#limpar-busca-vazia` | `limparBusca()` |
| `hashchange` | `window` | `mostrarSecao(âncora)` |
| `click` | `.botao-menu` | alterna `.aberto` no menu e `aria-expanded` |
| `ResizeObserver` (ou `resize` como alternativa) | `.aviso`, `.ferramentas-busca` | `medirPartesFixas()` |

## Segurança

- Todo texto vindo dos dados que vai para `innerHTML` na tabela passa por `escaparHtml()` (nome, termos, observações, título no `title`).
- Os campos de `FONTES` (título, detalhes, endereço) e `SINAIS_DE_ALERTA` são inseridos sem escape: são conteúdo fixo do próprio projeto.
- Não há entrada de dados enviada a servidor, nem `eval`, nem armazenamento local (`localStorage`, cookies).

## Código não utilizado

- O valor de situação `a-pesquisar` e a etiqueta "fonte pendente" continuam tratados no código, mas não ocorrem nos dados atuais.
