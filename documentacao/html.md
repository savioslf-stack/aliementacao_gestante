# HTML (`index.html`)

[← Voltar ao índice](../README.md)

## Estrutura do documento

```
<html lang="pt-BR">
<head>  metadados · Google Fonts · recursos/estilo.css
<body>
  a.pular-conteudo                 link "Pular para o conteúdo" (aparece com Tab)
  header.cabecalho-site            título + nav.faixa-semanas (3 links, um por trimestre)
  div.aviso[role=note]             aviso fixo: "não é oficial" + responsabilidade
  div.estrutura                    grade de 2 colunas
    nav#menu-lateral.menu-lateral  menu de temas (vira botão "Temas" no celular)
    main#conteudo.conteudo
      section.secao × 6            uma por tema (ver abaixo)
      nav#paginacao.paginacao      Anterior / Próximo (preenchido pelo JS)
  script × 3                       fontes.js, alimentos.js, pagina.js
```

Elementos de referência (landmarks) usados: `header`, `nav` (3: faixa de semanas, menu lateral, paginação, cada um com `aria-label`), `main`, `aside` (caixa de alerta, criada pelo JS) e `role="search"` na busca.

## Seções

| `id` | `data-titulo` | `aria-labelledby` | Conteúdo principal |
|---|---|---|---|
| `primeiro-trimestre` | Primeiro trimestre | `h-primeiro` | Bebê, alimentação (completa), pré-natal, refeições |
| `segundo-trimestre` | Segundo trimestre | `h-segundo` | Mesmos blocos, alimentação em resumo |
| `terceiro-trimestre` | Terceiro trimestre | `h-terceiro` | Mesmos blocos, amamentação e pós-parto |
| `cuidados-na-gestacao` | Cuidados na gestação | `h-cuidados` | Sinais de alerta, linha do tempo, consultas, vacinas, parto, emoções |
| `consulta-de-alimentos` | Consulta de alimentos | `h-consulta` | Busca, legenda, tabela de alimentos |
| `bibliografia` | Bibliografia | `h-bibliografia` | Lista de fontes |

Regras:
- `id` da seção: usado na âncora (`#id`), nos links do menu e na faixa de semanas (`data-alvo`).
- `data-titulo`: usado no título da aba (`document.title`), no botão "Temas" e nos botões Anterior/Próximo.
- Cada `<h2>` tem `tabindex="-1"` para poder receber foco quando a seção é aberta.
- A **ordem das seções no HTML** define a ordem da paginação.
- Os três trimestres usam os mesmos blocos, na mesma ordem: abertura, "O bebê nesta fase", "Alimentação no dia a dia", "Alimentação nesta fase", "Alimentação no pré-natal", "Um dia de refeições" e o link para "Cuidados na gestação".

## Áreas preenchidas pelo JavaScript

| Elemento no HTML | Preenchido por | Com |
|---|---|---|
| `<ol id="referencias">` | parte 1 do `pagina.js` | itens `li#fonte-N` a partir de `FONTES` |
| `<div class="espaco-alerta">` | parte 2 | `aside.caixa-alerta` com `SINAIS_DE_ALERTA` |
| `<tbody id="linhas-alimentos">` | `desenharTabela()` | uma `<tr>` por alimento |
| `<td data-contagem="seguro\|limitar\|evitar\|sem-fonte\|total">` | `desenharTabela()` | contagens da legenda |
| `#contagem-resultados`, `#termo-buscado`, `#rotulo-total-legenda` | `desenharTabela()` | textos da busca |
| `<nav id="paginacao">` | `mostrarSecao()` | links Anterior / Próximo |
| `#menu-atual` | `mostrarSecao()` | título da seção aberta (botão "Temas") |

## Atributos `data-*`

| Atributo | Onde | Uso |
|---|---|---|
| `data-titulo` | `section.secao` | título da seção (aba, menu, paginação) |
| `data-alvo` | links da `faixa-semanas` | id da seção do trimestre, para marcar o ativo |
| `data-contagem` | células da legenda | chave da contagem a exibir |
| `data-rotulo` | células da tabela (criadas pelo JS) | rótulo exibido no celular via CSS `attr()` |

## Citações

Toda informação de saúde no texto termina com uma citação:

```html
<span class="citacao"><a href="#fonte-7" aria-label="Fonte 7, página 24">[7, p. 24]</a></span>
```

- `href="#fonte-N"`: o JavaScript abre a Bibliografia e rola até `li#fonte-N`.
- `aria-label`: versão por extenso para leitores de tela.
- Variações: sem página `[7]`; intervalo `[7, p. 88–91]` (`aria-label="Fonte 7, páginas 88–91"`).
- `p.linha-citacao` é usado quando a citação vale para um bloco inteiro (lista ou cartões).

## Barrinhas de 40 semanas no HTML

Os cartões de "O bebê nesta fase" e a linha do tempo de "Cuidados" têm barrinhas com estilo em linha:

```html
<span class="trilha" aria-hidden="true"><span class="preenchimento" style="left:40.0%;width:5.0%"></span></span>
```

Cada semana vale 2,5% da largura: `left = (semana inicial − 1) × 2,5` e `width = número de semanas × 2,5`. Na tabela de alimentos, a mesma conta é feita pelo JavaScript (`celulaQuando()`).

## Comentários

O arquivo tem comentários `<!-- -->` explicando cada bloco. Eles não aparecem na página e não afetam o funcionamento.
