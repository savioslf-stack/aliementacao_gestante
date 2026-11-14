# CSS: guia completo do `estilo.css`

[← Voltar ao README](../README.md)

Este guia explica, desde o começo, tudo o que foi usado no `estilo.css`. Ele supõe só que você já leu o [guia de HTML](html.md), ou pelo menos sabe o que são tags, atributos e classes. Ele vai do geral para o específico:

- as **Partes 1 a 3** explicam o que é CSS, como escolher os elementos e como escrever os valores;
- as **Partes 4 a 8** apresentam, por assunto, todas as propriedades usadas no projeto;
- a **Parte 9** percorre o `estilo.css` deste site, parte por parte;
- a **Parte 10** é um resumo para consulta rápida.

## Sumário

- [Parte 1. O básico do CSS](#parte-1-o-básico-do-css)
- [Parte 2. Seletores: como escolher os elementos](#parte-2-seletores-como-escolher-os-elementos)
- [Parte 3. Valores: números, unidades, cores e variáveis](#parte-3-valores-números-unidades-cores-e-variáveis)
- [Parte 4. O modelo de caixa](#parte-4-o-modelo-de-caixa)
- [Parte 5. Texto e letras](#parte-5-texto-e-letras)
- [Parte 6. Organizar na tela (layout)](#parte-6-organizar-na-tela-layout)
- [Parte 7. Posição fixa e rolagem](#parte-7-posição-fixa-e-rolagem)
- [Parte 8. Celular e impressão (`@media`)](#parte-8-celular-e-impressão-media)
- [Parte 9. O `estilo.css` deste site, parte por parte](#parte-9-o-estilocss-deste-site-parte-por-parte)
- [Parte 10. Resumo para consulta rápida](#parte-10-resumo-para-consulta-rápida)

---

## Parte 1. O básico do CSS

### 1.1 O que é CSS

CSS (*Cascading Style Sheets*, "folhas de estilo em cascata") é a linguagem que define a **aparência** de uma página: cores, tipos e tamanhos de letra, espaços, bordas, a posição dos elementos e como a página se ajusta a telas pequenas.

O HTML diz **o que** cada coisa é ("isto é um título", "isto é uma lista"); o CSS diz **como** ela aparece ("títulos são verdes e grandes"). Separar as duas coisas tem uma vantagem: para mudar a cor de todos os links do site, basta mudar **uma linha** do CSS, sem mexer no HTML.

### 1.2 Como o HTML encontra o CSS

O CSS fica num arquivo separado, o `estilo.css`. O `index.html` o liga com esta linha, dentro do `<head>`:

```html
<link rel="stylesheet" href="estilo.css">
```

O navegador lê o HTML, encontra essa linha, baixa o `estilo.css` e aplica as regras dele à página.

### 1.3 Anatomia de uma regra

Um arquivo CSS é uma lista de **regras**. Cada regra tem duas partes:

```css
.nota { background: var(--verde-claro); border-radius: 6px; padding: .75rem 1rem; }
```

```
.nota                  {  background: var(--verde-claro);  border-radius: 6px;  ...  }
└─ seletor ─┘             └─ propriedade ┘ └──── valor ───┘
                          └──────────── declaração ───────┘
```

- O **seletor** (`.nota`) diz **quais elementos** a regra afeta. Aqui: todos os elementos com `class="nota"`.
- Entre chaves `{ }` vêm as **declarações**. Cada declaração é `propriedade: valor;`.
- A **propriedade** (`background`) é **o que** mudar; o **valor** (`var(--verde-claro)`) é **como** fica.
- Cada declaração termina com **ponto e vírgula** `;`. Esquecer o `;` estraga a declaração seguinte.

Espaços e quebras de linha não importam. A mesma regra pode ser escrita assim, uma declaração por linha:

```css
.nota {
  background: var(--verde-claro);
  border-radius: 6px;
  padding: .75rem 1rem;
}
```

O projeto usa as duas formas: uma linha só para regras curtas, várias linhas para as longas.

### 1.4 Comentários

Como no HTML, um comentário é um texto que o navegador ignora. No CSS, ele fica entre `/*` e `*/`:

```css
/* Caixa verde-clara com uma nota ou dica. */
```

O `estilo.css` tem um comentário antes de cada regra ou grupo de regras.

### 1.5 Estilos padrão do navegador

Mesmo sem nenhum CSS, a página já tem alguma aparência: títulos grandes e em negrito, parágrafos com espaço entre eles, listas com bolinhas, links azuis e sublinhados, `<th>` em negrito. Isso vem do **estilo padrão do navegador**. O `estilo.css` muda alguns desses padrões; o que ele não muda continua como o navegador decide. Por exemplo, o projeto não define o espaço entre parágrafos: ele vem do padrão do navegador.

### 1.6 Quando várias regras valem para o mesmo elemento

É comum duas ou mais regras escolherem o mesmo elemento. O navegador decide o resultado com três ideias. Elas explicam o "em cascata" do nome CSS.

**1. Propriedades diferentes se somam.** Se uma regra dá a cor e outra dá o tamanho, o elemento fica com as duas.

```css
.etiqueta { font-weight: 700; border-radius: 999px; }   /* formato */
.seguro   { color: var(--seguro); }                        /* cor */
```

Um `<span class="etiqueta seguro">` recebe as duas regras: o formato de pílula **e** a cor verde.

**2. Na mesma propriedade, a regra mais específica vence.** Uma regra que aponta para o elemento com mais precisão ganha de uma mais geral. Em ordem crescente de força: **tag** (`h2`) < **classe** (`.sumario`) < **classe + tag** (`.sumario h2`). No projeto:

```css
section h2  { font-size: 2.3rem; }   /* títulos h2 dentro de qualquer section */
.sumario h2 { font-size: 1.4rem; }   /* o título h2 do sumário */
```

O título "Sumário" fica com `1.4rem`, porque `.sumario h2` (classe + tag) é mais específico. Aqui ele nem está numa `section`, mas mesmo que estivesse, ganharia.

**3. Com a mesma força, a regra que vem depois no arquivo vence.** É por isso que as regras para celular (Parte 8) ficam **no fim** do arquivo: elas repetem seletores usados antes e, por virem depois, substituem os valores quando a tela é pequena.

**Herança.** Algumas propriedades passam do elemento pai para os filhos. As principais são as de texto: `color`, `font-family`, `font-size`, `line-height`. Por isso basta definir a letra e a cor no `body` para elas valerem na página toda. Propriedades de caixa (`margin`, `padding`, `border`, `background`) **não** são herdadas.

> **Dica:** no navegador, clique com o botão direito em qualquer parte da página e escolha **Inspecionar**. O painel mostra o HTML do elemento e, ao lado, todas as regras de CSS que valem para ele, com as substituídas riscadas. É o melhor jeito de entender por que algo aparece de um jeito.

---

## Parte 2. Seletores: como escolher os elementos

O seletor é a parte da regra que escolhe os elementos. O projeto usa estes tipos:

### 2.1 Seletor de tag

O nome da tag, sem `<>`. Escolhe **todos** os elementos daquele tipo.

```css
a { color: var(--verde); }        /* todos os links */
```

Usados no projeto: `html`, `body`, `main`, `section`, `a`, `h1`, `h2`, `h3`, `h4`, `kbd`.

### 2.2 Seletor de classe

Um ponto `.` seguido do nome da classe. Escolhe todos os elementos que têm aquela classe no atributo `class`.

```css
.nota { ... }         /* escolhe <p class="nota"> */
```

Um elemento com várias classes (`class="etiqueta seguro"`) é escolhido tanto por `.etiqueta` quanto por `.seguro`. É o tipo de seletor mais usado no projeto.

### 2.3 Grupo de seletores

Vários seletores separados por **vírgula** recebem as mesmas declarações. Evita repetir a regra.

```css
h1, h2, h3 { font-family: var(--letra-titulo); font-weight: 400; line-height: 1.2; }
```

Quer dizer: "`h1`, `h2` **e** `h3` ficam com essas três declarações".

### 2.4 Seletor de descendente

Dois seletores separados por **espaço**. Escolhe o segundo **somente quando ele está dentro do primeiro** (em qualquer nível).

```css
.cabecalho h1 { margin: 0; font-size: 2rem; }
```

Quer dizer: "os `h1` que estão dentro de um elemento com a classe `cabecalho`". Um `h1` fora do cabeçalho não seria afetado. Outros exemplos do projeto: `.aviso .responsabilidade`, `section h2`, `.cartoes li`, `.tabela th`.

Cuidado com a diferença entre vírgula e espaço: `h1, p` são **dois** grupos de elementos; `.cabecalho p` é **um**: os `p` dentro do cabeçalho.

### 2.5 Pseudo-classes

Uma pseudo-classe começa com **dois-pontos** `:` e escolhe um elemento por um **estado** ou uma **posição**, que não está escrito no HTML. O projeto usa quatro:

| Pseudo-classe | Escolhe o elemento quando… | Uso no projeto |
|---|---|---|
| `:hover` | o mouse está em cima dele | `.citacao:hover`: sublinha o link da fonte ao passar o mouse |
| `:target` | o `id` dele é o que está no fim do endereço (`#…`) | `.referencias li:target`: destaca a fonte aberta por um link |
| `:first-child` | ele é o **primeiro filho** do seu pai | `.alimentos tr:first-child`: a primeira linha da tabela (a dos títulos) |
| `:root` | ele é a "raiz" do documento, ou seja, o `<html>` | `:root`: lugar onde as variáveis de cor são definidas |

O `:target` merece um exemplo. Ao clicar em `[7, p. 22]`, o endereço da página passa a terminar em `#fonte-7`. Nesse momento, o `<li id="fonte-7">` passa a ser o "alvo" (*target*), e a regra `.referencias li:target` pinta o fundo dele. Clicando em outra fonte, o destaque muda sozinho. Tudo isso sem JavaScript.

### 2.6 Combinando seletores

Os tipos acima podem ser juntados. Leia da direita para a esquerda:

- `.referencias li:target` → um `li` que é o alvo do endereço, dentro de `.referencias`;
- `.alimentos tr:first-child` → um `tr` que é o primeiro filho, dentro de `.alimentos`.

---

## Parte 3. Valores: números, unidades, cores e variáveis

### 3.1 Números e unidades de tamanho

| Unidade | O que é | Exemplo no projeto |
|---|---|---|
| `px` | Pixel: um tamanho fixo, que não muda com as configurações da pessoa | `border: 1px solid …` (bordas finas), `border-radius: 14px` |
| `rem` | Múltiplo do tamanho de letra **padrão da página**. No padrão dos navegadores, `1rem` = 16px, então `2rem` = 32px e `.5rem` = 8px | `padding: 1.25rem 1rem;`, `font-size: 2rem;` |
| `em` | Múltiplo do tamanho de letra **do próprio elemento** (ou do pai) | `kbd { font-size: .9em; }`: 90% do texto em volta |
| `fr` | Uma "fração" do espaço livre. Só existe no grid (Parte 6) | `minmax(200px, 1fr)` |
| sem unidade | Alguns valores são só um número | `line-height: 1.6`, `font-weight: 700`, `z-index: 10` |

Notas:

- **`.5rem` é o mesmo que `0.5rem`**: o zero antes do ponto pode ser omitido, e o projeto faz isso com frequência.
- **O número usa ponto, não vírgula**: `1.6`, nunca `1,6`.
- **O zero não precisa de unidade**: `margin: 0` é o mesmo que `margin: 0px`.
- **Por que `rem` na maior parte do projeto?** Se a pessoa aumentar o tamanho da letra nas configurações do navegador (comum para quem enxerga pouco), tudo o que está em `rem` cresce junto, mantendo as proporções. Os `px` ficaram só em detalhes que não devem crescer, como a espessura das bordas.

### 3.2 Cores

O projeto escreve as cores no formato **hexadecimal**: `#` + seis caracteres.

```
#2F6B5F
 ││││└┴─ azul      (2 caracteres)
 ││└┴─── verde     (2 caracteres)
 └┴───── vermelho  (2 caracteres)
```

Cada par vai de `00` (nada daquela cor) a `FF` (o máximo), usando os "algarismos" 0–9 e A–F. `#000000` é preto, `#FFFFFF` é branco, `#FF0000` é vermelho puro. Não é preciso fazer a conta de cabeça: editores como o Visual Studio Code mostram um quadradinho com a cor ao lado do código e abrem um seletor de cores ao clicar nele.

### 3.3 Palavras-chave

Muitas propriedades aceitam palavras em vez de números. As usadas no projeto aparecem junto com cada propriedade nas próximas partes; o resumo está na [Parte 10](#parte-10-resumo-para-consulta-rápida). Uma delas vale para quase qualquer propriedade:

- **`inherit`** ("herdar"): usa o mesmo valor do elemento pai. No projeto, `kbd { font-family: inherit; }` faz as teclas usarem a mesma letra do texto em volta, e não a letra de "máquina de escrever" que o navegador usa por padrão no `<kbd>`.

### 3.4 Valores abreviados (um, dois, três ou quatro valores)

Algumas propriedades aceitam vários valores de uma vez. As de espaço (`margin` e `padding`) seguem esta regra:

| Escrito assim | Quer dizer |
|---|---|
| `padding: 1rem;` | 1rem nos **quatro** lados |
| `padding: .5rem 1rem;` | .5rem **em cima e embaixo**; 1rem **dos lados** |
| `padding: .5rem 1.5rem 1rem;` | .5rem **em cima**; 1.5rem **dos lados**; 1rem **embaixo** |
| `padding: 1px 2px 3px 4px;` | em cima, direita, embaixo, esquerda (sentido do relógio, começando no topo) |

A propriedade `border` junta três valores numa só, em qualquer ordem: espessura, estilo e cor.

```css
border: 1px solid var(--linha);    /* 1px, linha contínua, cor --linha */
```

### 3.5 Variáveis

Uma variável guarda um valor com um nome, para ser usado em vários lugares. No CSS, o nome começa com **dois hífens** `--`. Elas são criadas dentro de `:root` (o `<html>`), e por isso valem para a página toda:

```css
:root {
  --verde:       #2F6B5F;  /* links */
}
```

Para **usar** a variável, escreve-se `var(--nome)`:

```css
a { color: var(--verde); }
```

A vantagem: a cor `#2F6B5F` aparece **uma vez só** no arquivo. Para trocar a cor dos links, basta mudar essa linha. As variáveis do projeto estão na [Parte 9.1](#91-cores-e-letras-root).

### 3.6 Funções

Uma função é um nome seguido de parênteses, que calcula um valor a partir do que está dentro deles. O projeto usa três:

| Função | O que faz | Exemplo |
|---|---|---|
| `var()` | Pega o valor de uma variável | `var(--verde)` |
| `repeat()` | Repete um modelo de coluna várias vezes | `repeat(auto-fit, minmax(200px, 1fr))` |
| `minmax()` | Um tamanho com mínimo e máximo | `minmax(200px, 1fr)`: no mínimo 200px, no máximo uma fração do espaço |

As duas últimas são explicadas com calma na [seção 6.2](#62-grid-colunas-que-se-ajustam).

---

## Parte 4. O modelo de caixa

### 4.1 Todo elemento é uma caixa

Para o CSS, todo elemento é um **retângulo**, formado por quatro camadas, de dentro para fora:

```
┌──────────────────────────────── margin (margem: espaço FORA da borda) ──┐
│  ┌──────────────────────────── border (borda) ───────────────────────┐  │
│  │  ┌──────────────────────── padding (espaço DENTRO da borda) ───┐  │  │
│  │  │                                                             │  │  │
│  │  │                  conteúdo (texto, imagens)                  │  │  │
│  │  │                                                             │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

| Camada | Propriedade | No projeto |
|---|---|---|
| Conteúdo | `width`, `max-width` | A largura do conteúdo |
| Espaço interno | `padding` | O espaço entre o texto e a borda de uma caixa. Fica com a **cor de fundo** da caixa |
| Borda | `border` | A linha em volta |
| Espaço externo | `margin` | A distância até os outros elementos. É sempre **transparente** |

Um jeito de lembrar: numa caixa de papelão com um objeto dentro, o `padding` é o plástico-bolha entre o objeto e a caixa; o `margin` é o espaço entre essa caixa e as outras na prateleira.

### 4.2 Espaços: `margin` e `padding`

- `margin`: espaço **fora** da borda. Também existe para um lado só: `margin-top` (em cima) e `margin-bottom` (embaixo).
- `padding`: espaço **dentro** da borda. Também `padding-top` e `padding-bottom`.

Os valores podem ser abreviados (ver [seção 3.4](#34-valores-abreviados-um-dois-três-ou-quatro-valores)).

```css
.nota { background: var(--verde-claro); border-radius: 6px; padding: .75rem 1rem; }
```

Sem o `padding`, o texto da nota encostaria nas bordas do fundo verde.

Um valor especial: **`margin: 0 auto`** (0 em cima e embaixo, `auto` dos lados). Com `auto`, o navegador divide o espaço que sobra **igualmente** entre a esquerda e a direita, e a caixa fica **centralizada**. Ver [seção 6.1](#61-centralizar-o-conteúdo).

### 4.3 Bordas e cantos

- `border`: borda nos quatro lados.
- `border-top`, `border-bottom`, `border-left`: borda só em cima, embaixo ou à esquerda.

O **estilo** da borda usado no projeto é `solid` (linha contínua) ou `dashed` (tracejada, na etiqueta "a conferir").

```css
.alerta { ... border-left: 4px solid var(--evitar); ... }    /* faixa vermelha à esquerda */
```

**`border-radius`** arredonda os cantos. O valor é o tamanho da curva: `6px` deixa os cantos levemente arredondados; um valor muito grande como `999px` deixa as pontas totalmente redondas, em formato de **pílula** (usado nas etiquetas Seguro, Limitar…).

### 4.4 Fundo: `background`

`background` define a cor de fundo da caixa (que inclui a área do `padding`).

```css
.aviso { ... background: var(--limitar-fundo); ... }    /* amarelo-claro */
```

### 4.5 Largura: `width` e `max-width`

- `width`: a largura. `width: 100%` faz a caixa ocupar toda a largura do pai (usado na tabela de alimentos).
- `max-width`: a largura **máxima**. A caixa pode ficar mais estreita (numa tela pequena), mas nunca mais larga que isso. É a base do layout do projeto: `main { max-width: 960px; … }`.

### 4.6 Tipo de caixa: `display`

A propriedade `display` muda o comportamento do elemento (lembre-se dos elementos de bloco e de linha, no [guia de HTML](html.md#31-elementos-de-bloco-e-elementos-de-linha)).

| Valor | Comportamento | Uso no projeto |
|---|---|---|
| `block` | Bloco: começa em linha nova e ocupa a largura toda | Faz os `<span>` dos cartões ficarem um embaixo do outro; no celular, transforma a tabela de alimentos em blocos |
| `inline-block` | Fica na linha, como uma palavra, mas aceita `padding` e cantos como uma caixa | As etiquetas Seguro / Limitar… |
| `grid` | A caixa vira uma grade de colunas (Parte 6) | Cartões do bebê, "Prefira" / "Evite" |
| `none` | O elemento **some** da tela | No celular: a linha de títulos da tabela; na impressão: o sumário e os "Voltar ao início" |

---

## Parte 5. Texto e letras

### 5.1 Tipo de letra: `font-family`

Define o tipo de letra (a "fonte"). O valor é uma **lista de alternativas**, separadas por vírgula: o navegador usa a primeira que conseguir.

```css
--letra-texto:  "Atkinson Hyperlegible", system-ui, sans-serif;
```

1. `"Atkinson Hyperlegible"`: a fonte baixada do Google Fonts, desenhada para ser fácil de ler por quem enxerga pouco. Nomes com espaço ficam entre aspas.
2. `system-ui`: se ela não carregar, a fonte padrão do sistema do aparelho (a mesma dos menus do celular ou do computador).
3. `sans-serif`: se nada disso existir, qualquer fonte **sem serifa**.

Para os títulos, `"Young Serif", Georgia, serif`: a fonte do Google, senão a Georgia (presente na maioria dos computadores), senão qualquer fonte **com serifa**.

*Serifas* são os pequenos "pés" nas pontas das letras (como na letra de jornal). `serif` e `sans-serif` são nomes **genéricos**: não são uma fonte específica, mas um tipo, que todo navegador conhece.

### 5.2 Tamanho, peso e altura da linha

| Propriedade | O que faz | Exemplos do projeto |
|---|---|---|
| `font-size` | Tamanho da letra | `body { font-size: 1.0625rem; }` (cerca de 17px); `.citacao { font-size: .8rem; }` |
| `font-weight` | "Peso" (espessura) da letra. `400` é normal; `700` é negrito | `h1, h2, h3 { font-weight: 400; }` tira o negrito padrão dos títulos; `.etiqueta { font-weight: 700; }` |
| `line-height` | Altura de cada linha, como múltiplo do tamanho da letra | `body { line-height: 1.6; }`: linhas espaçadas, mais confortáveis para ler |

### 5.3 Cor do texto: `color`

`color` é a cor **do texto** (para o fundo, usa-se `background`).

```css
.abertura { font-size: 1.15rem; color: var(--tinta-suave); }
```

### 5.4 Alinhamento: `text-align` e `vertical-align`

- `text-align` alinha o texto **na horizontal**: `left` (esquerda), `center` (centro) ou `right` (direita). O cabeçalho é centralizado; o "Voltar ao início" fica à direita; as células das tabelas, à esquerda.
- `vertical-align: top` alinha o conteúdo das **células de tabela** pelo topo. Sem isso, numa linha em que uma célula tem muito texto, as outras ficariam centralizadas na vertical, difíceis de acompanhar.

### 5.5 Sublinhado: `text-decoration`

Os links vêm sublinhados por padrão. `text-decoration: none` tira o sublinhado; `text-decoration: underline` coloca. O projeto tira o sublinhado das citações e o devolve quando o mouse passa por cima:

```css
.citacao { font-size: .8rem; text-decoration: none; white-space: nowrap; }
.citacao:hover { text-decoration: underline; }
```

### 5.6 Quebra de linha: `white-space`

`white-space: nowrap` (*no wrap*, "sem quebra") impede que o texto seja dividido em duas linhas. Usado nas citações (para "[7, p. 24]" não ficar com "[7," numa linha e "p. 24]" na outra) e nas etiquetas ("Sem fonte confiável" sempre numa linha só).

### 5.7 Marcadores das listas: `list-style`

`list-style: none` tira as bolinhas (ou números) dos itens de uma lista. Usado nas listas que não parecem listas: os cartões do bebê, a legenda e a Bibliografia. Junto com ele, `padding: 0` tira o recuo à esquerda que o navegador coloca nas listas.

---

## Parte 6. Organizar na tela (layout)

### 6.1 Centralizar o conteúdo

```css
main { max-width: 960px; margin: 0 auto; padding: 0 1rem 4rem; }
```

Três ideias juntas:

1. `max-width: 960px`: o conteúdo nunca fica mais largo que 960px. Linhas de texto muito longas, numa tela grande, cansam a leitura.
2. `margin: 0 auto`: o espaço que sobra dos lados é dividido igualmente, e o conteúdo fica no centro da tela.
3. `padding: 0 1rem 4rem`: em telas estreitas (onde a largura é menor que 960px), o texto não encosta nas laterais (1rem de cada lado); embaixo, 4rem de espaço no fim da página.

### 6.2 Grid: colunas que se ajustam

`display: grid` transforma uma caixa numa **grade**: os filhos dela são organizados em colunas. O projeto usa grid em dois lugares: os cartões do bebê e as colunas "Prefira" / "Evite".

```css
.cartoes {
  list-style: none; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: .75rem;
}
```

A propriedade que define as colunas é `grid-template-columns`. O valor `repeat(auto-fit, minmax(200px, 1fr))` parece complicado, mas lido por partes é simples:

- `minmax(200px, 1fr)`: cada coluna tem **no mínimo 200px** e **no máximo 1fr** (uma parte igual do espaço livre);
- `repeat(auto-fit, …)`: repete essa coluna **quantas vezes couber** (*auto-fit*, "encaixar automaticamente").

Na prática, para os três cartões do segundo trimestre:

| Largura disponível | Resultado |
|---|---|
| 900px | Cabem 3 colunas de 200px ou mais: os 3 cartões lado a lado, dividindo a largura |
| 500px | Cabem só 2: dois cartões numa linha, o terceiro embaixo |
| 350px | Cabe só 1: um cartão embaixo do outro |

Tudo isso **sem nenhuma regra para celular**: o grid se ajusta sozinho.

`gap` é o espaço **entre** as colunas e as linhas da grade. Com dois valores (`gap: 0 2rem`, nas duas colunas), o primeiro é o espaço entre linhas e o segundo, entre colunas.

### 6.3 Colunas de texto: `columns`

```css
.alerta ul { columns: 2 260px; }
```

Divide uma lista (ou um texto) em colunas, **como num jornal**: o texto desce na primeira coluna e continua no topo da segunda. O valor quer dizer "**no máximo 2 colunas**, cada uma com **pelo menos 260px**". Numa tela estreita, onde não cabem duas colunas de 260px, a lista fica numa coluna só. Usado na lista de sinais de alerta.

A diferença para o grid: no grid, cada filho fica na sua própria "célula"; em `columns`, o conteúdo **flui** de uma coluna para a outra.

### 6.4 Tabelas: `border-collapse`

Por padrão, cada célula de uma tabela tem a sua própria borda, e aparecem linhas duplas entre as células. `border-collapse: collapse` ("juntar") faz as bordas vizinhas virarem **uma linha só**. Usado nas tabelas `.tabela` e `.alimentos`.

---

## Parte 7. Posição fixa e rolagem

### 7.1 Elemento que fica preso no topo: `position: sticky`

O aviso amarelo continua visível o tempo todo, mesmo quando a pessoa rola a página:

```css
.aviso {
  position: sticky; top: 0; z-index: 10;
  ...
}
```

- `position: sticky` ("grudento"): o elemento fica no seu lugar normal **até** chegar à posição indicada por `top`; a partir daí, ele "gruda" ali enquanto o resto da página rola por baixo.
- `top: 0`: a posição onde ele gruda: a **0** da borda de cima da tela.
- `z-index: 10`: quando dois elementos se sobrepõem, o de `z-index` **maior** fica na frente. Sem isso, partes da página poderiam passar **por cima** do aviso ao rolar. É como a ordem de folhas empilhadas numa mesa.

O valor normal de `position` é `static` (o elemento segue o fluxo da página, sem grudar). Ele aparece na regra de impressão, para "desgrudar" o aviso (ver [seção 8.2](#82-impressão-media-print)).

### 7.2 Rolagem: `scroll-behavior` e `scroll-padding-top`

```css
html { scroll-behavior: smooth; scroll-padding-top: 8rem; }
```

- `scroll-behavior: smooth`: ao clicar num link interno (do sumário, por exemplo), a página **desliza** até o destino, em vez de pular de uma vez. Ajuda a pessoa a perceber para onde foi.
- `scroll-padding-top: 8rem`: ao pular para um destino, deixa **8rem de folga** no topo da tela. Sem isso, o título da seção ficaria escondido **atrás do aviso amarelo**, que está grudado ali. No celular, o aviso é mais alto (o texto quebra em mais linhas), e a folga aumenta para `15rem` (ver Parte 8). Se o texto do aviso mudar de tamanho, ajuste esses valores.

As duas ficam no seletor `html` porque quem rola é a página inteira.

---

## Parte 8. Celular e impressão (`@media`)

### 8.1 Telas pequenas: `@media (max-width: 680px)`

Uma regra `@media` é um "se": as regras **dentro** das chaves dela só valem quando a condição é verdadeira.

```css
@media (max-width: 680px) {
  .cabecalho h1 { font-size: 1.6rem; }
  ...
}
```

`(max-width: 680px)` quer dizer: "se a largura da tela for de **até 680px**". Isso inclui praticamente todos os celulares em pé. Num computador, a condição é falsa e essas regras são ignoradas.

Esse bloco fica **no fim** do arquivo de propósito: as regras dele repetem seletores usados antes (como `.cabecalho h1`) e, por virem depois, substituem os valores no celular (ver [seção 1.6](#16-quando-várias-regras-valem-para-o-mesmo-elemento)).

A técnica de adaptar a página ao tamanho da tela se chama **design responsivo**. Para testar, use o modo de dispositivo do navegador: no Chrome, F12 e depois o ícone de celular.

### 8.2 Impressão: `@media print`

```css
@media print {
  .aviso { position: static; }
  .sumario, .voltar { display: none; }
}
```

As regras dentro de `@media print` só valem **ao imprimir** (ou salvar como PDF). Aqui: o aviso deixa de grudar no topo (senão apareceria sobre o texto de cada página) e o sumário e os links "Voltar ao início" são escondidos, porque não servem no papel.

---

## Parte 9. O `estilo.css` deste site, parte por parte

Esta parte percorre o arquivo na ordem em que ele está escrito. Os trechos de código são cópias do arquivo; os comentários foram tirados para economizar espaço.

### 9.1 Cores e letras (`:root`)

```css
:root {
  --papel:       #F3F6F1;
  --branco:      #FFFFFF;
  --tinta:       #1D2B28;
  --tinta-suave: #4E5F5A;
  --linha:       #D6E1DA;
  --verde:       #2F6B5F;
  --verde-claro: #E3EEE8;
  --seguro:  #276E45;  --seguro-fundo:  #E2F1E7;
  --limitar: #8A5F00;  --limitar-fundo: #FBF0D2;
  --evitar:  #A62D42;  --evitar-fundo:  #F8E3E6;
  --letra-titulo: "Young Serif", Georgia, serif;
  --letra-texto:  "Atkinson Hyperlegible", system-ui, sans-serif;
}
```

Todas as variáveis do projeto (ver [seção 3.5](#35-variáveis)):

| Variável | Cor / valor | Uso |
|---|---|---|
| `--papel` | branco esverdeado | Fundo da página |
| `--branco` | branco | Fundo de caixas, cartões e tabelas |
| `--tinta` | verde quase preto | Texto principal |
| `--tinta-suave` | cinza esverdeado | Texto secundário: abertura, legendas, outros nomes |
| `--linha` | verde bem claro | Bordas e linhas separadoras |
| `--verde` | verde-escuro | Links |
| `--verde-claro` | verde-claro | Fundo das notas e da fonte destacada |
| `--seguro`, `--seguro-fundo` | verde / verde-claro | Etiqueta Seguro (texto / fundo) |
| `--limitar`, `--limitar-fundo` | amarelo-escuro / amarelo-claro | Etiqueta Limitar; o fundo também é usado no aviso |
| `--evitar`, `--evitar-fundo` | vermelho / rosado | Etiqueta Evitar; também a caixa de alerta |
| `--letra-titulo` | Young Serif | Títulos |
| `--letra-texto` | Atkinson Hyperlegible | Todo o resto do texto |

Na mesma linha podem ficar duas declarações (`--seguro: …;  --seguro-fundo: …;`): o que separa uma da outra é o `;`, não a quebra de linha.

### 9.2 Regras gerais

```css
html { scroll-behavior: smooth; scroll-padding-top: 8rem; }

body {
  margin: 0;
  background: var(--papel);
  color: var(--tinta);
  font-family: var(--letra-texto);
  font-size: 1.0625rem;
  line-height: 1.6;
}

h1, h2, h3 { font-family: var(--letra-titulo); font-weight: 400; line-height: 1.2; }
h4 { font-size: 1.02rem; margin: 1.4rem 0 .4rem; }
a { color: var(--verde); }

main { max-width: 960px; margin: 0 auto; padding: 0 1rem 4rem; }
```

- `html`: rolagem suave e folga no topo (ver [seção 7.2](#72-rolagem-scroll-behavior-e-scroll-padding-top)).
- `body`: `margin: 0` tira a margem de 8px que o navegador coloca em volta da página. As outras declarações definem o fundo, a cor, a letra e o tamanho do texto. Como são herdadas, valem para a página inteira.
- `h1, h2, h3`: títulos com a letra serifada, **sem** negrito (`400`) e com linhas mais juntas (`1.2`, porque títulos grandes com linhas espaçadas ficam "soltos").
- `h4`: os títulos menores continuam com a letra do texto e em negrito (padrão do navegador); a regra só ajusta o tamanho e os espaços.
- `a`: todos os links verdes.
- `main`: conteúdo centralizado, com largura máxima (ver [seção 6.1](#61-centralizar-o-conteúdo)).

### 9.3 Cabeçalho

```css
.cabecalho {
  background: var(--branco);
  border-bottom: 1px solid var(--linha);
  padding: 1.25rem 1rem;
  text-align: center;
}
.cabecalho h1 { margin: 0; font-size: 2rem; }
.cabecalho p  { margin: .25rem 0 0; color: var(--tinta-suave); }
```

Uma faixa branca, com uma linha embaixo e o texto centralizado. `margin: 0` no `h1` tira o espaço padrão do título; `margin: .25rem 0 0` no parágrafo deixa só um espaço pequeno em cima (ver os três valores na [seção 3.4](#34-valores-abreviados-um-dois-três-ou-quatro-valores)).

### 9.4 Aviso amarelo

```css
.aviso {
  position: sticky; top: 0; z-index: 10;
  background: var(--limitar-fundo);
  border-bottom: 1px solid #EBD9A6;
  padding: .5rem 1rem;
  font-size: .9rem; line-height: 1.4;
}
.aviso p { max-width: 960px; margin: 0 auto; }
.aviso .responsabilidade { margin-top: .2rem; font-size: .84rem; color: var(--tinta-suave); }
```

- A primeira linha prende o aviso no topo (ver [seção 7.1](#71-elemento-que-fica-preso-no-topo-position-sticky)).
- O fundo amarelo-claro reaproveita a variável da etiqueta Limitar. A cor da borda (`#EBD9A6`) está escrita direto, sem variável, porque só é usada aqui.
- `.aviso p` alinha os parágrafos com o conteúdo da página: a mesma largura máxima (960px) e centralizados. O fundo amarelo continua ocupando a tela toda, porque é da `<div>`, não dos parágrafos.
- `.aviso .responsabilidade`: a segunda linha, menor e mais clara.

### 9.5 Sumário e seções

```css
.sumario {
  background: var(--branco); border: 1px solid var(--linha); border-radius: 14px;
  padding: .5rem 1.5rem 1rem; margin-top: 2rem;
}
.sumario h2 { font-size: 1.4rem; margin: .75rem 0 .5rem; }
.sumario li { margin: .3rem 0; }

section { border-top: 1px solid var(--linha); margin-top: 3rem; padding-top: 1rem; }
section h2 { font-size: 2.3rem; margin: .25rem 0 .5rem; }
section h3 { font-size: 1.35rem; margin: 2rem 0 .6rem; }

.semanas { color: var(--tinta-suave); font-size: .9rem; margin-bottom: 0; }
.abertura { font-size: 1.15rem; color: var(--tinta-suave); }
.nota { background: var(--verde-claro); border-radius: 6px; padding: .75rem 1rem; }
.linha-citacao { font-size: .9rem; color: var(--tinta-suave); }

.citacao { font-size: .8rem; text-decoration: none; white-space: nowrap; }
.citacao:hover { text-decoration: underline; }

.voltar { text-align: right; font-size: .9rem; margin-top: 2rem; }
```

- `.sumario`: uma caixa branca com borda e cantos arredondados. `.sumario li` afasta um pouco os itens da lista.
- `section`: cada seção começa com uma **linha separadora** (`border-top`), um espaço grande acima (`margin-top: 3rem`) e um pequeno entre a linha e o título (`padding-top: 1rem`). Isso separa visualmente os assuntos na página longa.
- `section h2` / `section h3`: os tamanhos dos títulos dentro das seções.
- `.semanas`: "Semanas 1–13", pequeno e cinza; `margin-bottom: 0` deixa a linha colada ao título que vem embaixo.
- `.abertura`, `.nota`, `.linha-citacao`: o texto de abertura maior, a caixa verde de nota e a linha só com fontes.
- `.citacao`: links das fontes pequenos, sem sublinhado e sem quebra (ver [seções 5.5 e 5.6](#55-sublinhado-text-decoration)).
- `.voltar`: o "↑ Voltar ao início" alinhado à direita.

### 9.6 Trimestres e "Cuidados na gestação"

```css
.cartoes {
  list-style: none; padding: 0;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: .75rem;
}
.cartoes li {
  background: var(--branco); border: 1px solid var(--linha); border-radius: 14px;
  padding: .9rem 1rem; font-size: .92rem; color: var(--tinta-suave);
}
.cartoes .semana { display: block; font-size: .85rem; }
.cartoes .fruta  { display: block; font-family: var(--letra-titulo); font-size: 1.35rem; color: var(--tinta); }
```

**Cartões do bebê.** A lista perde as bolinhas e o recuo e vira uma grade que se ajusta à tela (ver [seção 6.2](#62-grid-colunas-que-se-ajustam)). Cada item (`li`) vira um cartão branco com borda. Os dois `<span>` de dentro são de linha por padrão; `display: block` faz cada um ocupar sua própria linha: o período em cima, a fruta (com a letra dos títulos, maior e mais escura) no meio, e a frase embaixo.

```css
.duas-colunas { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0 2rem; }
```

**"Prefira" / "Evite".** A mesma técnica dos cartões, com colunas de no mínimo 240px. Lado a lado no computador; uma embaixo da outra no celular.

```css
.fatos dt { font-weight: 700; margin-top: 1rem; }
.fatos dd { margin: 0; }
```

**"Alimentação no pré-natal".** O termo (`dt`) fica em negrito, com espaço acima. O navegador recua as explicações (`dd`) para a direita por padrão; `margin: 0` tira esse recuo.

```css
.tabela { border-collapse: collapse; background: var(--branco); margin: .75rem 0; font-size: .95rem; }
.tabela caption { text-align: left; font-size: .85rem; color: var(--tinta-suave); padding-bottom: .3rem; }
.tabela th, .tabela td { text-align: left; vertical-align: top; padding: .5rem .8rem; border: 1px solid var(--linha); }
.tabela th { color: var(--tinta-suave); font-size: .85rem; }
```

**Tabelas pequenas** (ganho de peso, linha do tempo, vacinas). Bordas juntas (ver [seção 6.4](#64-tabelas-border-collapse)), fundo branco, uma borda fina em cada célula, texto alinhado à esquerda e pelo topo. O título da tabela (`caption`) fica à esquerda, pequeno. As células de título (`th`) ficam menores e mais claras, para não chamarem mais atenção que os dados.

```css
.alerta {
  background: var(--evitar-fundo); border-left: 4px solid var(--evitar); border-radius: 6px;
  padding: .5rem 1.25rem; margin: 1.5rem 0;
}
.alerta h3 { margin-top: .75rem; }
.alerta ul { columns: 2 260px; }
```

**Sinais de alerta.** Fundo rosado com uma faixa vermelha grossa só do lado esquerdo (`border-left`). A lista é dividida em duas colunas quando há espaço (ver [seção 6.3](#63-colunas-de-texto-columns)).

### 9.7 Consulta de alimentos

```css
kbd { border: 1px solid var(--tinta-suave); border-radius: 4px; padding: 0 .3rem; font-family: inherit; font-size: .9em; background: var(--branco); }
```

**Teclas** (Ctrl, F): cada `<kbd>` vira um "botãozinho" com borda e cantos arredondados. `font-family: inherit` usa a mesma letra do texto (ver [seção 3.3](#33-palavras-chave)); `.9em` deixa a letra 10% menor que a do parágrafo.

```css
.legenda { list-style: none; padding: 0; }
.legenda li { margin: .6rem 0; }
```

**"Como ler a tabela".** Lista sem bolinhas e sem recuo, com os itens afastados.

```css
.alimentos { width: 100%; border-collapse: collapse; background: var(--branco); font-size: .97rem; }
.alimentos th, .alimentos td { text-align: left; vertical-align: top; padding: .75rem 1rem; border-bottom: 1px solid var(--linha); }
.alimentos th { color: var(--tinta-suave); font-size: .85rem; background: #F8FAF8; }
.alimentos small { color: var(--tinta-suave); font-size: .85rem; }
```

**Tabela de alimentos.** Ocupa toda a largura. Diferente das tabelas pequenas, só tem linhas **horizontais** entre os alimentos (`border-bottom`), o que deixa a tabela longa mais leve de ler. A linha de títulos tem um fundo cinza bem claro, escrito direto (`#F8FAF8`). Os outros nomes de cada alimento (`small`) ficam mais claros.

```css
.etiqueta {
  display: inline-block; padding: .1rem .6rem; border-radius: 999px;
  font-size: .85rem; font-weight: 700; white-space: nowrap;
}
.seguro    { color: var(--seguro);  background: var(--seguro-fundo); }
.limitar   { color: var(--limitar); background: var(--limitar-fundo); }
.evitar    { color: var(--evitar);  background: var(--evitar-fundo); }
.sem-fonte { color: var(--tinta);   background: #ECEEF0; }
```

**Etiquetas.** Este é o melhor exemplo de **duas classes trabalhando juntas** (ver [seção 1.6](#16-quando-várias-regras-valem-para-o-mesmo-elemento)):

- `.etiqueta` dá o **formato**, igual para todas: pílula (`border-radius: 999px`), negrito, letra pequena, numa linha só. `inline-block` deixa a etiqueta no meio do texto, mas com o `padding` funcionando como numa caixa.
- `.seguro`, `.limitar`, `.evitar` e `.sem-fonte` dão só a **cor**: texto e fundo.

Assim, `class="etiqueta evitar"` = formato de etiqueta + cores de "evitar". Para criar uma situação nova, bastaria uma nova regra de cor.

### 9.8 Bibliografia

```css
.referencias { list-style: none; padding: 0; }
.referencias li { padding: .75rem .5rem; border-top: 1px solid var(--linha); color: var(--tinta-suave); font-size: .95rem; }
.referencias strong { color: var(--tinta); }
.referencias li:target { background: var(--verde-claro); }

.pendente { font-size: .78rem; border: 1px dashed var(--tinta-suave); border-radius: 999px; padding: 0 .5rem; }
```

- A lista perde as bolinhas; cada fonte é separada da anterior por uma linha (`border-top`).
- O texto da fonte é cinza, mas o título (`strong`) fica com a cor principal, para se destacar.
- `li:target`: a fonte aberta por um link `[N]` ganha fundo verde-claro (ver [seção 2.5](#25-pseudo-classes)).
- `.pendente`: a etiqueta "a conferir", em formato de pílula com borda **tracejada** (`dashed`). O tracejado passa a ideia de "provisório".

### 9.9 Celular

```css
@media (max-width: 680px) {
  html { scroll-padding-top: 15rem; }
  .cabecalho h1 { font-size: 1.6rem; }
  section h2 { font-size: 1.9rem; }

  .alimentos, .alimentos tbody, .alimentos tr, .alimentos td { display: block; }
  .alimentos tr:first-child { display: none; }
  .alimentos td { border: 0; padding: .2rem 1rem; }
  .alimentos tr { border-bottom: 1px solid var(--linha); padding: .6rem 0; }
}
```

Só vale em telas de até 680px (ver [seção 8.1](#81-telas-pequenas-media-max-width-680px)).

- Mais folga no topo ao pular para uma seção, porque o aviso fica mais alto.
- Títulos um pouco menores.
- **A tabela de alimentos deixa de ser tabela.** Numa tela estreita, três colunas lado a lado ficariam apertadas demais. `display: block` em todas as partes da tabela faz cada linha virar um bloco, e cada célula ocupar uma linha: o nome em cima, a etiqueta no meio e as observações embaixo.
  - `tbody` aparece na lista porque o navegador o cria sozinho em volta das linhas (ver o [guia de HTML](html.md#37-tabelas)).
  - `tr:first-child` é a linha de títulos ("Alimento", "Situação", "Observações"). Como no celular as colunas não existem mais, ela é escondida com `display: none`.
  - As bordas passam das células para a linha inteira (`tr`), e cada alimento fica separado do próximo por uma linha.

### 9.10 Impressão

Explicada na [seção 8.2](#82-impressão-media-print).

---

## Parte 10. Resumo para consulta rápida

### Todos os tipos de seletor do projeto

| Seletor | Exemplo | Escolhe | Seção |
|---|---|---|---|
| Tag | `a` | Todos os elementos `<a>` | [2.1](#21-seletor-de-tag) |
| Classe | `.nota` | Elementos com `class="nota"` | [2.2](#22-seletor-de-classe) |
| Grupo | `h1, h2, h3` | Todos os `h1`, `h2` e `h3` | [2.3](#23-grupo-de-seletores) |
| Descendente | `.cabecalho h1` | `h1` dentro de `.cabecalho` | [2.4](#24-seletor-de-descendente) |
| `:hover` | `.citacao:hover` | Com o mouse em cima | [2.5](#25-pseudo-classes) |
| `:target` | `.referencias li:target` | O alvo do endereço (`#…`) | [2.5](#25-pseudo-classes) |
| `:first-child` | `.alimentos tr:first-child` | O primeiro filho | [2.5](#25-pseudo-classes) |
| `:root` | `:root` | O elemento `<html>` | [2.5](#25-pseudo-classes) |

### Todas as propriedades do projeto

| Propriedade | O que faz | Valores usados | Seção |
|---|---|---|---|
| `background` | Cor de fundo | cores | [4.4](#44-fundo-background) |
| `border` | Borda nos quatro lados | espessura, `solid` / `dashed`, cor | [4.3](#43-bordas-e-cantos) |
| `border-top`, `border-bottom`, `border-left` | Borda de um lado só | idem | [4.3](#43-bordas-e-cantos) |
| `border-radius` | Arredonda os cantos | `4px`, `6px`, `14px`, `999px` | [4.3](#43-bordas-e-cantos) |
| `border-collapse` | Junta as bordas das células | `collapse` | [6.4](#64-tabelas-border-collapse) |
| `color` | Cor do texto | cores | [5.3](#53-cor-do-texto-color) |
| `columns` | Divide em colunas de jornal | `2 260px` | [6.3](#63-colunas-de-texto-columns) |
| `display` | Tipo de caixa | `block`, `inline-block`, `grid`, `none` | [4.6](#46-tipo-de-caixa-display) |
| `font-family` | Tipo de letra | lista de fontes, `inherit` | [5.1](#51-tipo-de-letra-font-family) |
| `font-size` | Tamanho da letra | `rem`, `em` | [5.2](#52-tamanho-peso-e-altura-da-linha) |
| `font-weight` | Peso (negrito) | `400`, `700` | [5.2](#52-tamanho-peso-e-altura-da-linha) |
| `gap` | Espaço entre as partes do grid | `rem` | [6.2](#62-grid-colunas-que-se-ajustam) |
| `grid-template-columns` | Colunas do grid | `repeat(auto-fit, minmax(…))` | [6.2](#62-grid-colunas-que-se-ajustam) |
| `line-height` | Altura da linha | `1.2`, `1.4`, `1.6` | [5.2](#52-tamanho-peso-e-altura-da-linha) |
| `list-style` | Bolinhas/números das listas | `none` | [5.7](#57-marcadores-das-listas-list-style) |
| `margin`, `margin-top`, `margin-bottom` | Espaço fora da borda | `rem`, `0`, `auto` | [4.2](#42-espaços-margin-e-padding) |
| `max-width` | Largura máxima | `960px` | [4.5](#45-largura-width-e-max-width) |
| `padding`, `padding-top`, `padding-bottom` | Espaço dentro da borda | `rem`, `0` | [4.2](#42-espaços-margin-e-padding) |
| `position` | Modo de posicionamento | `sticky`, `static` | [7.1](#71-elemento-que-fica-preso-no-topo-position-sticky) |
| `scroll-behavior` | Rolagem suave | `smooth` | [7.2](#72-rolagem-scroll-behavior-e-scroll-padding-top) |
| `scroll-padding-top` | Folga no topo ao pular para um link | `8rem`, `15rem` | [7.2](#72-rolagem-scroll-behavior-e-scroll-padding-top) |
| `text-align` | Alinhamento horizontal | `left`, `center`, `right` | [5.4](#54-alinhamento-text-align-e-vertical-align) |
| `text-decoration` | Sublinhado | `none`, `underline` | [5.5](#55-sublinhado-text-decoration) |
| `top` | Onde o elemento `sticky` gruda | `0` | [7.1](#71-elemento-que-fica-preso-no-topo-position-sticky) |
| `vertical-align` | Alinhamento vertical nas células | `top` | [5.4](#54-alinhamento-text-align-e-vertical-align) |
| `white-space` | Quebra de linha | `nowrap` | [5.6](#56-quebra-de-linha-white-space) |
| `width` | Largura | `100%` | [4.5](#45-largura-width-e-max-width) |
| `z-index` | Quem fica na frente | `10` | [7.1](#71-elemento-que-fica-preso-no-topo-position-sticky) |

### Regras especiais (`@`)

| Regra | Quando vale | Seção |
|---|---|---|
| `@media (max-width: 680px)` | Telas de até 680px de largura | [8.1](#81-telas-pequenas-media-max-width-680px) |
| `@media print` | Ao imprimir | [8.2](#82-impressão-media-print) |

### Contraste das cores

As cores de texto foram escolhidas para serem lidas com facilidade por todas as pessoas, inclusive quem enxerga pouco. A referência é a WCAG (as regras internacionais de acessibilidade na web), que pede um **contraste mínimo de 4,5 para 1** entre o texto e o fundo (nível AA). Todas as etiquetas passam: Seguro 5,3:1, Limitar 5,0:1, Evitar 5,6:1.

Além disso, a cor **nunca é a única informação**: toda etiqueta também tem a palavra escrita (Seguro, Limitar, Evitar), para quem não distingue bem as cores. Ao trocar uma cor, confira o contraste num verificador on-line, como o *WebAIM Contrast Checker*.
