# Arquitetura

[← Voltar ao índice](../README.md)

## Visão geral

A página é um **site estático de página única**. Todo o conteúdo fixo (textos dos trimestres, cuidados, legendas) está no `index.html`. As partes extensas ou repetitivas (tabela de alimentos, bibliografia, caixa de sinais de alerta) são montadas no navegador pelo `pagina.js`, a partir de dados guardados em arquivos JavaScript.

```
┌──────────────┐   <link>    ┌──────────────────────┐
│  index.html  │ ──────────▶ │ recursos/estilo.css  │  aparência
│  (estrutura  │             └──────────────────────┘
│  e textos)   │   <script>  ┌──────────────────────┐
│              │ ──────────▶ │ dados/fontes.js      │  const FONTES
│              │ ──────────▶ │ dados/alimentos.js   │  const ALIMENTOS
│              │ ──────────▶ │ recursos/pagina.js   │  lê FONTES e ALIMENTOS e altera o DOM
└──────────────┘             └──────────────────────┘
```

## Ordem de carregamento

1. O navegador lê o `<head>`: metadados, `preconnect` e folha de estilo do Google Fonts, depois `recursos/estilo.css`.
2. Lê o `<body>` inteiro: cabeçalho, aviso, menu lateral e as 6 seções. Todas as seções existem no DOM; a partir da segunda, começam com o atributo `hidden`.
3. No fim do `<body>`, executa três scripts clássicos, nesta ordem:
   1. `recursos/dados/fontes.js`: declara `const FONTES`
   2. `recursos/dados/alimentos.js`: declara `const ALIMENTOS`
   3. `recursos/pagina.js`: usa as duas constantes e monta a página
4. O `pagina.js` roda de cima para baixo, uma única vez:
   bibliografia → sinais de alerta → tabela e busca → navegação → medição das partes fixas → `mostrarSecao()` da âncora atual.

Os scripts não usam `defer` nem `type="module"`. Ficam no fim do `<body>` para que o HTML já exista quando rodam. As constantes declaradas com `const` no nível superior de um script clássico ficam acessíveis aos scripts seguintes: é assim que `pagina.js` enxerga `FONTES` e `ALIMENTOS`.

## Fluxo de dados

```
ALIMENTOS ──▶ alimentosOrdenados (ordenados por nome, com campos normalizados para a busca)
                   │
   texto digitado ─┴─▶ desenharTabela() ──▶ <tbody id="linhas-alimentos">
                                       └──▶ contagens da legenda (data-contagem)
FONTES ──▶ <ol id="referencias">  e  FONTE_POR_NUMERO (índice usado por citar())
```

A busca e a renderização são locais: não há requisições de rede depois do carregamento inicial.

## Decisões de projeto

| Decisão | Motivo | Consequência |
|---|---|---|
| Sem build, sem bibliotecas | Facilidade de leitura e de manutenção; limite do GitHub Pages sem ferramentas | Todo o código está nos arquivos, como foi escrito |
| Dados em `.js` carregados por `<script>` | `fetch()` de arquivos locais é bloqueado em `file://` | A página abre direto do disco, sem servidor |
| Página única com seções e âncoras | O GitHub Pages não tem rotas nem reescrita de URL | Cada seção tem endereço próprio (`#segundo-trimestre`) e o botão Voltar funciona |
| Tabela montada pelo JavaScript | 559 linhas escritas à mão seriam difíceis de manter e de buscar | Sem JavaScript, a tabela e a bibliografia não aparecem (os textos aparecem) |
| Citações como links internos `#fonte-N` | Rastreabilidade de cada informação | Os números das fontes são fixos (ver [Dados](dados.md)) |
| Aviso fixo no topo | O site não é oficial e o aviso precisa estar sempre visível | As outras partes fixas são posicionadas abaixo dele (ver [CSS](css.md)) |

## Limites conhecidos

- **Dependência de JavaScript:** sem JS, a tabela de alimentos, a bibliografia e a caixa de sinais de alerta ficam vazias, e todas as seções, menos a primeira, ficam escondidas.
- **Indexação:** como só uma seção é visível por vez e parte do conteúdo é gerada no navegador, buscadores podem indexar menos conteúdo do que existe.
- **Fontes externas:** sem acesso ao Google Fonts, o navegador usa fontes do sistema (Georgia e a fonte padrão da interface).
- **Dados no carregamento inicial:** os 214 KB de `alimentos.js` são baixados mesmo por quem não abre a consulta. O GitHub Pages comprime as respostas, o que reduz bastante o tamanho transferido.
