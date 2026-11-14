# HTML: guia completo do `index.html`

[← Voltar ao README](../README.md)

Este guia explica, desde o começo, tudo o que foi usado no `index.html`. Não é preciso saber nada de programação para acompanhar. Ele vai do geral para o específico:

- a **Parte 1** explica o que é HTML e as regras básicas de escrita;
- a **Parte 2** mostra o "esqueleto" que toda página HTML tem;
- a **Parte 3** apresenta, uma por uma, as tags usadas no projeto;
- a **Parte 4** percorre a página deste site, parte por parte;
- a **Parte 5** é um resumo para consulta rápida.

A aparência (cores, tamanhos, espaços) não é assunto do HTML: ela está explicada no [guia de CSS](css.md).

## Sumário

- [Parte 1. O básico do HTML](#parte-1-o-básico-do-html)
- [Parte 2. O esqueleto de uma página](#parte-2-o-esqueleto-de-uma-página)
- [Parte 3. As tags usadas no projeto](#parte-3-as-tags-usadas-no-projeto)
- [Parte 4. A página deste site, parte por parte](#parte-4-a-página-deste-site-parte-por-parte)
- [Parte 5. Resumo para consulta rápida](#parte-5-resumo-para-consulta-rápida)

---

## Parte 1. O básico do HTML

### 1.1 O que é HTML

HTML (*HyperText Markup Language*, "linguagem de marcação de hipertexto") é a linguagem usada para escrever páginas da web. Um arquivo HTML é um **arquivo de texto comum**, que pode ser aberto em qualquer editor de texto. A diferença é que, além do texto que aparece na tela, ele tem **marcações** que dizem ao navegador o que cada pedaço é: um título, um parágrafo, uma lista, um link, uma tabela.

O navegador (Chrome, Firefox, Safari, Edge) lê essas marcações e desenha a página. O HTML diz **o que** cada coisa é; o CSS diz **como** ela aparece (cor, tamanho, posição).

HTML não é uma linguagem de programação: ele não faz contas nem toma decisões. Ele só descreve o conteúdo.

### 1.2 Tags e elementos

As marcações se chamam **tags**. Uma tag é um nome entre os sinais `<` e `>`. A maioria vem em par: uma tag de **abertura** e uma de **fechamento**, que tem uma barra `/` antes do nome.

```html
<p>Beba água potável ou filtrada ao longo do dia.</p>
```

- `<p>` é a tag de abertura ("aqui começa um parágrafo");
- `</p>` é a tag de fechamento ("aqui termina o parágrafo");
- o texto entre elas é o **conteúdo**.

O conjunto inteiro (abertura + conteúdo + fechamento) se chama **elemento**. No dia a dia, as palavras "tag" e "elemento" costumam ser usadas como sinônimos.

### 1.3 Elementos dentro de elementos

Um elemento pode ficar **dentro** de outro. Isso se chama **aninhamento**. Por exemplo, uma lista (`<ul>`) contém itens (`<li>`):

```html
<ul>
  <li>Refrigerantes e bebidas adoçadas.</li>
  <li>Salgadinhos de pacote, biscoito recheado, bolachas e doces.</li>
</ul>
```

Duas regras importantes:

1. **Feche na ordem inversa da abertura.** O último elemento aberto é o primeiro a ser fechado. `<p><strong>texto</strong></p>` está certo; `<p><strong>texto</p></strong>` está errado.
2. **Use recuo (espaços no início da linha) para mostrar quem está dentro de quem.** O navegador ignora esses espaços, mas eles deixam o código muito mais fácil de ler. Neste projeto, cada nível de aninhamento tem 2 espaços a mais.

Quando um elemento está dentro de outro, dizemos que o de fora é o **pai** e o de dentro é o **filho**. Esses nomes aparecem também no CSS.

### 1.4 Elementos sem fechamento

Algumas tags não têm conteúdo e, por isso, **não têm tag de fechamento**. Elas se chamam elementos **vazios**. No projeto aparecem três:

| Tag | O que faz |
|---|---|
| `<meta>` | Dá uma informação sobre a página (por exemplo, a codificação dos acentos) |
| `<link>` | Liga a página a outro arquivo (por exemplo, o `estilo.css`) |
| `<br>` | Quebra a linha (*break*, "quebra") |

### 1.5 Atributos

Uma tag de abertura pode ter **atributos**: informações extras escritas no formato `nome="valor"`, separadas por espaço.

```html
<a class="citacao" href="#fonte-7">[7, p. 22]</a>
```

Aqui a tag `<a>` (link) tem dois atributos:

- `class="citacao"`: dá um "apelido" ao elemento, usado pelo CSS para escolher a aparência;
- `href="#fonte-7"`: diz para onde o link leva.

O valor fica sempre entre aspas duplas `"…"`. Os atributos usados no projeto estão explicados na [seção 3.8](#38-atributos-usados-no-projeto).

### 1.6 Comentários

Um comentário é um texto que fica no código, mas **não aparece na tela**. Serve para explicar o código para quem for ler o arquivo.

```html
<!-- Aparência do site. -->
```

Tudo o que está entre `<!--` e `-->` é comentário. O `index.html` tem comentários antes de cada parte importante.

### 1.7 Espaços e quebras de linha

No conteúdo, o navegador **junta vários espaços e quebras de linha em um único espaço**. Escrever

```html
<p>Beba     água
   potável.</p>
```

mostra na tela "Beba água potável." numa linha só. Por isso o recuo do código não atrapalha a página. Para quebrar a linha de propósito, usa-se `<br>` (ou um novo parágrafo `<p>`).

### 1.8 Acentos e caracteres especiais

Os acentos (á, ç, õ) e símbolos como `–` (travessão curto), `“ ”` (aspas curvas), `↑` (seta) e `°` (grau) são escritos diretamente no texto. Isso funciona porque o arquivo está salvo em **UTF-8**, uma codificação que inclui praticamente todos os caracteres, e porque a página avisa isso ao navegador com `<meta charset="utf-8">` (ver [seção 2.4](#24-o-head-deste-projeto-linha-a-linha)).

Existe uma exceção: o caractere `&` tem um papel especial no HTML (ele começa um "código de caractere"). Quando o `&` precisa aparecer no texto, ele é escrito como `&amp;`. No projeto isso acontece duas vezes, na Bibliografia:

```html
Alexandre, Bagatini &amp; Simões (UFSC)
```

Na tela aparece "Alexandre, Bagatini & Simões (UFSC)". O mesmo vale para `<` e `>`, que seriam escritos `&lt;` e `&gt;`, mas eles não aparecem no texto deste site.

---

## Parte 2. O esqueleto de uma página

Toda página HTML tem a mesma estrutura básica:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  ... configurações (não aparecem na tela) ...
</head>
<body>
  ... conteúdo (aparece na tela) ...
</body>
</html>
```

### 2.1 `<!DOCTYPE html>`

É a primeira linha do arquivo. Não é uma tag de verdade: é um aviso ao navegador de que o documento usa o HTML atual (HTML5). Sem ela, o navegador entra num "modo de compatibilidade" antigo e pode desenhar a página de um jeito diferente.

No `index.html`, o comentário grande que explica o arquivo fica logo depois do `<meta charset="utf-8">`, dentro do `<head>` (o motivo está na [seção 2.4](#24-o-head-deste-projeto-linha-a-linha)).

### 2.2 `<html lang="pt-BR">`

É o elemento que envolve **todo** o resto. O atributo `lang="pt-BR"` informa o idioma: português do Brasil. Isso ajuda:

- os **leitores de tela** (programas que leem a página em voz alta para pessoas cegas) a pronunciar as palavras corretamente;
- o navegador a oferecer tradução e a escolher regras de hifenização;
- o Google a mostrar a página para quem busca em português.

### 2.3 `<head>` e `<body>`

O `<html>` tem dois filhos:

| Elemento | Conteúdo | Aparece na tela? |
|---|---|---|
| `<head>` ("cabeça") | Configurações: título da aba, codificação, arquivos ligados | Não |
| `<body>` ("corpo") | Todo o conteúdo visível: textos, listas, tabelas, links | Sim |

### 2.4 O `<head>` deste projeto, linha a linha

```html
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guia de alimentação na gestação</title>
<meta name="description" content="O que comer, o que limitar e o que evitar na gestação, trimestre a trimestre, com base em fontes brasileiras.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Young+Serif&display=swap" rel="stylesheet">
<link rel="stylesheet" href="estilo.css">
</head>
```

(No arquivo há comentários entre essas linhas; aqui eles foram tirados para facilitar a leitura.)

**`<meta charset="utf-8">`**
Diz ao navegador que o arquivo está em UTF-8. Sem isso, os acentos podem aparecer como símbolos estranhos (por exemplo, "gestaÃ§Ã£o" em vez de "gestação"). O navegador só procura essa linha no **começo** do arquivo (nos primeiros 1.024 caracteres, mais ou menos). Por isso ela é a primeira coisa dentro do `<head>`, antes até do comentário grande que explica o arquivo.

**`<meta name="viewport" content="width=device-width, initial-scale=1">`**
Essencial para celular. Sem ela, o celular finge ter uma tela larga (cerca de 980 pixels), desenha a página nesse tamanho e depois a encolhe, deixando o texto minúsculo. Com ela:

- `width=device-width`: a largura da página é a largura real da tela do aparelho;
- `initial-scale=1`: a página abre sem zoom (100%).

**`<title>`**
O texto que aparece na **aba** do navegador, nos favoritos e como título no resultado do Google.

**`<meta name="description" content="…">`**
Um resumo da página. Os buscadores podem mostrá-lo embaixo do título nos resultados da busca.

Nas tags `<meta>`, o atributo `name` diz **qual** informação é, e `content` dá o **valor** dela.

**`<link rel="preconnect" …>` (duas linhas)**
`<link>` liga a página a outro endereço, e `rel` (*relation*, "relação") diz que tipo de ligação é. `preconnect` quer dizer "comece já a se conectar a este servidor, porque logo vou precisar dele". Os tipos de letra vêm de dois endereços do Google (`fonts.googleapis.com` e `fonts.gstatic.com`), e adiantar a conexão faz a página carregar mais rápido.

O atributo `crossorigin` (sem valor) aparece só na segunda linha porque os arquivos de fonte são baixados num modo especial de segurança do navegador, usado para arquivos de outros sites. A conexão adiantada precisa estar no mesmo modo para poder ser reaproveitada. Atributos sem valor, como este, funcionam como um "sim": basta estarem presentes.

**`<link href="https://fonts.googleapis.com/css2?…" rel="stylesheet">`**
Carrega os tipos de letra *Atkinson Hyperlegible* (texto) e *Young Serif* (títulos), do Google Fonts. `rel="stylesheet"` quer dizer "isto é uma folha de estilo" (um arquivo de CSS). O endereço é longo porque informa quais fontes e quais variações (normal, negrito, itálico) baixar. Se não houver internet, a página continua funcionando com as fontes do próprio aparelho.

**`<link rel="stylesheet" href="estilo.css">`**
Liga o arquivo de aparência do site. `href` é o endereço do arquivo: como só tem o nome, o navegador procura o `estilo.css` **na mesma pasta** do `index.html`. Se o arquivo mudasse de lugar (por exemplo, para uma pasta `css/`), o `href` precisaria mudar junto (`href="css/estilo.css"`).

---

## Parte 3. As tags usadas no projeto

### 3.1 Elementos de bloco e elementos de linha

Antes de ver as tags, uma ideia que ajuda muito: os elementos se dividem, por padrão, em dois tipos.

| Tipo | Como se comporta | Exemplos no projeto |
|---|---|---|
| **De bloco** | Começa numa linha nova e ocupa toda a largura disponível, como um parágrafo | `<p>`, `<h1>`–`<h4>`, `<ul>`, `<li>`, `<table>`, `<section>`, `<div>` |
| **De linha** (*inline*) | Fica no meio do texto, ocupando só o espaço do seu conteúdo, como uma palavra | `<a>`, `<strong>`, `<small>`, `<kbd>`, `<span>` |

Um link no meio de uma frase continua na mesma linha; um novo parágrafo sempre começa embaixo do anterior. O CSS pode mudar esse comportamento (ver a propriedade `display` no [guia de CSS](css.md)).

### 3.2 Elementos de estrutura

Estes elementos dividem a página em grandes partes. Eles não mudam a aparência por si só, mas dizem **o papel** de cada parte. Isso se chama **HTML semântico** ("com significado"). Ele ajuda os leitores de tela (que permitem pular direto para o conteúdo principal ou para a navegação), os buscadores e quem lê o código.

| Tag | Significado | Onde aparece no projeto |
|---|---|---|
| `<header>` | Cabeçalho: a parte de apresentação | O título do site, no topo |
| `<main>` | O conteúdo principal da página (só pode haver um) | Envolve o sumário e as seis seções |
| `<nav>` | Um grupo de links de navegação | O sumário |
| `<section>` | Uma seção temática, normalmente com um título | Cada uma das seis seções |
| `<aside>` | Conteúdo de destaque, separado do texto principal | A caixa "Sinais de alerta" |
| `<div>` | Uma "caixa" genérica, **sem** significado especial | O aviso amarelo e as colunas "Prefira" / "Evite" |

Use `<div>` só quando nenhuma das outras tags fizer sentido. Ela serve para agrupar elementos, normalmente para aplicar um estilo ao grupo.

### 3.3 Títulos: `<h1>` a `<h4>`

As tags `<h1>` a `<h6>` são títulos (*heading*). O número indica o **nível**: `h1` é o mais importante, `h6` o menos. O projeto usa quatro níveis, sempre em ordem, como os capítulos de um livro:

```
h1  Guia de alimentação na gestação         (título do site: só um na página)
 h2  Primeiro trimestre                     (título de cada seção)
  h3  Alimentação no dia a dia              (blocos da seção)
   h4  Pequenas mudanças que já fazem diferença   (partes de um bloco)
```

Escolha o nível pela **posição no texto**, não pelo tamanho da letra (o tamanho é decidido no CSS). Não pule níveis (por exemplo, de `h2` direto para `h4`): leitores de tela usam os títulos como um índice da página.

### 3.4 Texto

| Tag | Nome | O que faz |
|---|---|---|
| `<p>` | Parágrafo (*paragraph*) | Um bloco de texto. Por padrão, tem um espaço acima e abaixo |
| `<strong>` | Importante | Marca um trecho como importante. Aparece em **negrito** |
| `<small>` | Pequeno | Texto secundário, em letra menor. No projeto: os outros nomes de cada alimento |
| `<kbd>` | Teclado (*keyboard*) | Uma tecla do teclado. No projeto: <kbd>Ctrl</kbd>, <kbd>Cmd</kbd> e <kbd>F</kbd> |
| `<br>` | Quebra de linha (*break*) | Faz o texto continuar na linha de baixo. Não tem fechamento |
| `<span>` | Trecho | Uma "caixa" genérica **de linha** (a versão de linha do `<div>`). Sem significado; serve para aplicar estilo a um pedaço de texto |

Exemplo do projeto, com várias delas juntas:

```html
<p class="nota"><strong>Para encontrar um alimento:</strong> use a busca do navegador. No computador, aperte <kbd>Ctrl</kbd> + <kbd>F</kbd> ...</p>
```

### 3.5 Listas

**Lista sem números: `<ul>`** (*unordered list*, "lista não ordenada"). Cada item é um `<li>` (*list item*). Por padrão, cada item ganha uma bolinha.

```html
<ul>
  <li>Beba água potável ou filtrada ao longo do dia.</li>
  <li>Lave as mãos com água e sabão antes de preparar ou comer.</li>
</ul>
```

**Lista numerada: `<ol>`** (*ordered list*, "lista ordenada"). Igual à anterior, mas os itens ganham números (1, 2, 3…) automaticamente. O projeto usa `<ol>` no sumário, porque a ordem das seções importa.

**Lista de definições: `<dl>`** (*description list*). Serve para pares "termo e explicação", como num dicionário:

- `<dt>` (*description term*): o termo;
- `<dd>` (*description details*): a explicação do termo.

```html
<dl class="fatos">
  <dt>Exames</dt>
  <dd>Hemograma e glicemia em jejum, e toxoplasmose de novo se você ainda não teve a doença. <a class="citacao" href="#fonte-7">[7, p. 37]</a></dd>
</dl>
```

O projeto usa `<dl>` nos blocos "Alimentação no pré-natal".

Listas podem ter outros elementos dentro dos itens (links, negrito, até tabelas: o `<dd>` "Peso" do primeiro trimestre tem uma tabela dentro).

### 3.6 Links: `<a>`

`<a>` (*anchor*, "âncora") cria um link. O atributo `href` (*hypertext reference*) diz para onde ele leva. O texto entre as tags é o que a pessoa clica.

O projeto usa dois tipos de link:

**Link externo**: leva para outro site. O `href` é um endereço completo, começando com `https://`.

```html
<a href="https://www.gov.br/saude/pt-br/composicao/saps/publicacoes/cadernetas-e-cartoes">gov.br</a>
```

**Link interno**: leva para outro ponto **da mesma página**. O `href` começa com `#`, seguido do `id` do elemento de destino.

```html
<a href="#bibliografia">Bibliografia</a>          <!-- o link -->
...
<section id="bibliografia">                      <!-- o destino -->
```

Ao clicar, a página rola até o elemento com `id="bibliografia"`, e o endereço na barra do navegador passa a terminar em `#bibliografia`. O botão "Voltar" do navegador volta para onde a pessoa estava.

### 3.7 Tabelas

Uma tabela é montada **linha por linha**:

| Tag | O que é |
|---|---|
| `<table>` | A tabela inteira |
| `<caption>` | O título da tabela, mostrado acima dela (opcional) |
| `<tr>` | Uma linha (*table row*) |
| `<th>` | Uma célula de **título** (*table header*). Por padrão, fica em negrito |
| `<td>` | Uma célula comum, de dados (*table data*) |

Exemplo do projeto (tabela de ganho de peso, um pouco resumida):

```html
<table class="tabela">
  <caption>Ganho de peso recomendado até 40 semanas</caption>
  <tr><th>IMC antes da gravidez</th><th>Ganho total</th></tr>
  <tr><td>Baixo peso (menos de 18,5)</td><td>9,7 a 12,2 kg</td></tr>
  <tr><td>Peso adequado (18,5 a 24,9)</td><td>8 a 12 kg</td></tr>
</table>
```

Resultado:

| IMC antes da gravidez | Ganho total |
|---|---|
| Baixo peso (menos de 18,5) | 9,7 a 12,2 kg |
| Peso adequado (18,5 a 24,9) | 8 a 12 kg |

Cada linha (`<tr>`) precisa ter o **mesmo número de células** que as outras, senão as colunas ficam desalinhadas.

Um detalhe: o navegador coloca, sozinho, um elemento `<tbody>` (*table body*, "corpo da tabela") em volta das linhas. Ele não está escrito no `index.html`, mas existe na página, e por isso o `estilo.css` pode usar o nome `tbody`.

### 3.8 Atributos usados no projeto

| Atributo | Em quais tags | Para que serve |
|---|---|---|
| `lang` | `<html>` | Idioma da página (`pt-BR`) |
| `charset` | `<meta>` | Codificação dos caracteres (`utf-8`) |
| `name` e `content` | `<meta>` | Qual informação é e qual o seu valor |
| `rel` | `<link>` | Tipo de ligação: `stylesheet` (arquivo de estilo) ou `preconnect` (adiantar conexão) |
| `href` | `<link>`, `<a>` | Endereço: de um arquivo, de outro site ou (com `#`) de um ponto da página |
| `crossorigin` | `<link>` | Modo de segurança para arquivos de outro site (ver [seção 2.4](#24-o-head-deste-projeto-linha-a-linha)) |
| `id` | `<header>`, `<section>`, `<li>` | Nome **único** de um elemento. É o destino dos links internos (`href="#…"`) |
| `class` | vários | Um ou mais "apelidos" usados pelo CSS para dar aparência |
| `aria-label` | `<nav>` | Um nome lido pelos leitores de tela |

Mais detalhes sobre os três últimos:

**`id`: um nome único.** Cada `id` só pode aparecer **uma vez** na página inteira, porque é um endereço: se dois elementos tivessem `id="bibliografia"`, o link não saberia para qual ir. Os `id`s do projeto não têm acentos nem espaços (as palavras são separadas por hífen), o que evita problemas nos endereços.

**`class`: um apelido que pode se repetir.** Ao contrário do `id`, a mesma classe pode estar em vários elementos: todas as mais de 1.200 citações da página têm `class="citacao"`, e todas ficam com a mesma aparência. Um elemento também pode ter **várias classes**, separadas por espaço:

```html
<span class="etiqueta seguro">Seguro</span>
```

Esse `<span>` tem duas classes: `etiqueta` (o formato de "pílula") e `seguro` (a cor verde). As classes não fazem nada sozinhas: elas só são "ganchos" para o CSS. O que cada uma faz está no [guia de CSS](css.md).

**`aria-label`: um nome para leitores de tela.** Os atributos que começam com `aria-` existem para a acessibilidade. No projeto, `<nav class="sumario" aria-label="Sumário">` dá o nome "Sumário" a esse bloco de navegação; um leitor de tela anuncia "navegação Sumário" e permite pular direto para ele.

---

## Parte 4. A página deste site, parte por parte

Agora que todas as peças foram apresentadas, esta parte mostra como elas se juntam no `index.html`.

### 4.1 Mapa da página

```
<body>
├── <header class="cabecalho" id="inicio">         título do site
├── <div class="aviso">                            aviso amarelo (fixo no topo)
└── <main>
    ├── <nav class="sumario">                      sumário
    ├── <section id="primeiro-trimestre">
    ├── <section id="segundo-trimestre">
    ├── <section id="terceiro-trimestre">
    ├── <section id="cuidados-na-gestacao">
    ├── <section id="consulta-de-alimentos">
    └── <section id="bibliografia">
```

O cabeçalho e o aviso ficam **fora** do `<main>` porque não são o conteúdo principal: são a apresentação e um aviso que vale para o site inteiro.

### 4.2 Cabeçalho

```html
<header class="cabecalho" id="inicio">
  <h1>Guia de alimentação na gestação</h1>
  <p>O que comer, o que limitar e o que evitar, trimestre a trimestre.</p>
</header>
```

Tem o único `<h1>` da página. O `id="inicio"` é o destino dos links "↑ Voltar ao início", que ficam no fim de cada seção e levam de volta ao topo.

### 4.3 Aviso amarelo

```html
<div class="aviso">
  <p><strong>Este não é um site oficial.</strong> As informações são gerais, ...</p>
  <p class="responsabilidade">Os responsáveis por este site não se responsabilizam ...</p>
</div>
```

Dois parágrafos dentro de uma `<div>`. A `<div>` agrupa os dois para que o CSS possa tratá-los como um bloco só: o fundo amarelo e a posição fixa no topo da tela são definidos no `estilo.css`, na regra `.aviso`. A classe `responsabilidade` deixa a segunda linha menor.

### 4.4 Sumário

```html
<nav class="sumario" aria-label="Sumário">
  <h2>Sumário</h2>
  <ol>
    <li><a href="#primeiro-trimestre">Primeiro trimestre</a> (semanas 1–13)</li>
    ...
    <li><a href="#bibliografia">Bibliografia</a></li>
  </ol>
</nav>
```

Uma lista numerada de links internos, um para cada seção, na mesma ordem em que elas aparecem na página. Cada `href` é `#` + o `id` de uma seção.

### 4.5 As seções

| `id` | Título (`<h2>`) | Conteúdo |
|---|---|---|
| `primeiro-trimestre` | Primeiro trimestre | O bebê nesta fase, alimentação no dia a dia (versão completa), enjoo, pré-natal (com a tabela de ganho de peso) |
| `segundo-trimestre` | Segundo trimestre | O bebê, resumo do dia a dia, diabetes gestacional, dentes, pré-natal |
| `terceiro-trimestre` | Terceiro trimestre | O bebê, resumo do dia a dia, trabalho de parto, amamentação, pós-parto, pré-natal |
| `cuidados-na-gestacao` | Cuidados na gestação | Sinais de alerta, linha do tempo do pré-natal, consultas, vacinas, parto, emoções |
| `consulta-de-alimentos` | Consulta de alimentos | Como procurar, legenda das situações e a tabela de 559 alimentos |
| `bibliografia` | Bibliografia | As 81 fontes |

As páginas dos trimestres falam só de alimentação. O que não é sobre alimentação (consultas, vacinas, sinais de alerta) fica em "Cuidados na gestação".

Toda seção termina com o mesmo link:

```html
<p class="voltar"><a href="#inicio">↑ Voltar ao início</a></p>
```

### 4.6 As seções dos trimestres

Os três trimestres seguem **o mesmo modelo**, na mesma ordem. Quem entende um entende os três.

**1. Semanas, título e abertura**

```html
<section id="primeiro-trimestre">
  <p class="semanas">Semanas 1–13</p>
  <h2>Primeiro trimestre</h2>
  <p class="abertura">No começo da gestação, você pode sentir enjoo, ... <a class="citacao" href="#fonte-7">[7, p. 22]</a></p>
```

Três parágrafos/títulos simples. As classes `semanas` e `abertura` só mudam a aparência (letra menor e cinza; letra maior).

**2. "O bebê nesta fase": os cartões**

```html
<h3>O bebê nesta fase</h3>
<ul class="cartoes">
  <li>
    <span class="semana">Até 4 semanas</span>
    <span class="fruta">Grão de arroz</span>
    Começam a se formar braços, pernas, órgãos e o rosto.
  </li>
  ...
</ul>
```

É uma lista comum (`<ul>`). Cada item é um período da gestação, com três partes: o período (`<span class="semana">`), o tamanho do bebê comparado a uma fruta (`<span class="fruta">`) e uma frase. Os `<span>` existem só para que o CSS possa dar a cada parte uma aparência diferente. É o CSS da classe `cartoes` que transforma essa lista em cartões lado a lado.

**3. "Alimentação no dia a dia"**

No primeiro trimestre, é a versão completa: um parágrafo, as duas colunas "Prefira" e "Evite" e duas listas com `<h4>`. As duas colunas são assim:

```html
<div class="duas-colunas">
  <div>
    <h4>Prefira</h4>
    <ul> ... </ul>
  </div>
  <div>
    <h4>Evite</h4>
    <ul> ... </ul>
  </div>
</div>
```

Uma `<div>` de fora (que o CSS divide em colunas) com duas `<div>` dentro, uma por coluna.

No segundo e no terceiro trimestres, o bloco é só uma lista curta (`<ul>`) e uma nota (`<p class="nota">`) com links para a versão completa e para a consulta de alimentos.

**4. "Alimentação nesta fase"**: títulos `<h4>` e parágrafos, com os assuntos de cada trimestre.

**5. "Alimentação no pré-natal"**: uma lista de definições (`<dl class="fatos">`, ver [seção 3.5](#35-listas)). No primeiro trimestre, o item "Peso" tem a tabela de ganho de peso dentro do `<dd>`.

**6. Nota final e "Voltar ao início"**

```html
<p class="nota">Consultas, vacinas, sinais de alerta e outros cuidados ... estão em <a href="#cuidados-na-gestacao">Cuidados na gestação</a>.</p>
<p class="voltar"><a href="#inicio">↑ Voltar ao início</a></p>
```

### 4.7 Cuidados na gestação

**A caixa "Sinais de alerta"**

```html
<aside class="alerta">
  <h3>Sinais de alerta</h3>
  <p>Procure atendimento imediatamente se tiver:</p>
  <ul>
    <li>Pressão mais alta que o habitual ou acima de 140 x 90 mmHg</li>
    ...
  </ul>
  <p><strong>Vá à Unidade Básica de Saúde, ... ou ligue para o Samu 192.</strong> <a class="citacao" href="#fonte-7">[7, p. 28]</a></p>
</aside>
```

Usa `<aside>` porque é um destaque separado do texto. O fundo rosado e a borda vermelha vêm da classe `alerta`.

**A linha do tempo do pré-natal e as vacinas**

São duas tabelas simples de duas colunas, com a classe `tabela`:

```html
<table class="tabela">
  <tr><th>Quando</th><th>O que acontece</th></tr>
  <tr><td>O quanto antes, até 12 semanas</td><td>Começar o pré-natal. <a class="citacao" href="#fonte-7">[7, p. 33]</a></td></tr>
  ...
</table>
```

O resto da seção são títulos `<h3>` e parágrafos.

### 4.8 Consulta de alimentos

**1. Como procurar**: uma nota (`<p class="nota">`) que explica como usar a busca do navegador, com as teclas em `<kbd>`.

**2. "Como ler a tabela"**: uma lista com uma linha por situação.

```html
<ul class="legenda">
  <li><span class="etiqueta seguro">Seguro</span> <strong>227 itens.</strong> Uma fonte brasileira recomenda ... </li>
  ...
</ul>
<p>Total: 559 alimentos. ...</p>
```

Os números (227 itens, 559 alimentos) foram **escritos à mão**. Se um alimento mudar de situação, ou se um alimento for incluído ou apagado, eles precisam ser atualizados também.

**3. A tabela de alimentos**

```html
<table class="alimentos">
  <tr><th>Alimento</th><th>Situação</th><th>Observações</th></tr>
  <tr>
    <td><strong>Ácido fólico</strong><br><small>ácido fólico, folato, metilfolato, vitamina B9</small></td>
    <td><span class="etiqueta seguro">Seguro</span></td>
    <td>400 µg por dia, desde antes de engravidar até o fim da gestação. <a class="citacao" href="#fonte-2">[2]</a></td>
  </tr>
  ... (559 alimentos, em ordem alfabética)
</table>
```

A primeira linha tem os títulos das colunas (`<th>`). Depois, cada alimento é uma linha (`<tr>`) com três células (`<td>`):

| Coluna | O que tem | Tags usadas |
|---|---|---|
| Alimento | O nome em negrito e, na linha de baixo, outros nomes e variedades em letra menor. Quando não há outros nomes, só o nome aparece | `<strong>`, `<br>`, `<small>` |
| Situação | Uma etiqueta colorida | `<span class="etiqueta …">` |
| Observações | A orientação e as citações das fontes | texto e `<a class="citacao">` |

A etiqueta usa sempre **duas classes**: `etiqueta` e uma das quatro situações. A palavra dentro dela precisa combinar com a classe:

| Código na etiqueta | Aparece como | Significado |
|---|---|---|
| `<span class="etiqueta seguro">Seguro</span>` | Seguro (verde) | Uma fonte brasileira recomenda ou permite o consumo |
| `<span class="etiqueta limitar">Limitar</span>` | Limitar (amarelo) | Consumir pouco, com moderação ou só com preparo adequado |
| `<span class="etiqueta evitar">Evitar</span>` | Evitar (vermelho) | Não consumir na gestação |
| `<span class="etiqueta sem-fonte">Sem fonte confiável</span>` | Sem fonte confiável (cinza) | Nenhuma fonte brasileira confiável encontrada; o alimento fica sem citação |

Os outros nomes em `<small>` são importantes para a busca: quem procura "macaxeira" com Ctrl+F também encontra o texto que está ali.

### 4.9 Bibliografia

```html
<ul class="referencias">
  <li id="fonte-3">[3] <strong>Programa Nacional de Suplementação de Ferro: manual de condutas gerais</strong> <span class="pendente">a conferir</span><br>BRASIL. Ministério da Saúde. Brasília, 2013. <a href="https://bvsms.saude.gov.br/...">bvsms.saude.gov.br</a></li>
  ...
</ul>
```

Cada fonte é um item da lista, com:

1. `id="fonte-3"`: o destino das citações `[3]`;
2. o número escrito, `[3]`;
3. o título, em `<strong>`;
4. só nas fontes 3, 4, 5 e 6: a etiqueta `<span class="pendente">a conferir</span>` (a fonte foi localizada, mas o conteúdo ainda não foi lido);
5. `<br>` e os detalhes (autor ou órgão, ano);
6. um link externo para o documento, mostrando só o nome do site.

A lista é `<ul>` (sem números automáticos) e o número de cada fonte é escrito à mão, para que ele nunca mude sozinho se um item for apagado ou trocado de lugar.

### 4.10 Como as citações funcionam, do começo ao fim

Juntando o que foi visto:

1. No texto, uma informação termina com uma citação: `<a class="citacao" href="#fonte-7">[7, p. 22]</a>`. Na tela aparece "[7, p. 22]": fonte 7, página 22. Quando a fonte não tem página, só o número aparece: `[2]`.
2. O `href="#fonte-7"` é um link interno para o elemento com `id="fonte-7"`.
3. Na Bibliografia, o item `<li id="fonte-7">` é a Caderneta Brasileira da Gestante.
4. Ao clicar, a página rola até a fonte 7, e o CSS a destaca com fundo verde-claro (ver `:target` no [guia de CSS](css.md)).

---

## Parte 5. Resumo para consulta rápida

### Todas as tags do projeto

| Tag | Tipo | Para que serve | Seção |
|---|---|---|---|
| `<!DOCTYPE html>` | declaração | Avisa que o documento é HTML5 | [2.1](#21-doctype-html) |
| `<html>` | estrutura | Envolve a página toda | [2.2](#22-html-langpt-br) |
| `<head>` | estrutura | Configurações (não aparecem) | [2.3](#23-head-e-body) |
| `<meta>` | vazia | Informações sobre a página | [2.4](#24-o-head-deste-projeto-linha-a-linha) |
| `<title>` | – | Título da aba | [2.4](#24-o-head-deste-projeto-linha-a-linha) |
| `<link>` | vazia | Liga a outro arquivo ou servidor | [2.4](#24-o-head-deste-projeto-linha-a-linha) |
| `<body>` | estrutura | Conteúdo visível | [2.3](#23-head-e-body) |
| `<header>` | bloco, semântica | Cabeçalho | [3.2](#32-elementos-de-estrutura) |
| `<main>` | bloco, semântica | Conteúdo principal | [3.2](#32-elementos-de-estrutura) |
| `<nav>` | bloco, semântica | Navegação | [3.2](#32-elementos-de-estrutura) |
| `<section>` | bloco, semântica | Seção temática | [3.2](#32-elementos-de-estrutura) |
| `<aside>` | bloco, semântica | Destaque separado | [3.2](#32-elementos-de-estrutura) |
| `<div>` | bloco, genérica | Caixa sem significado | [3.2](#32-elementos-de-estrutura) |
| `<h1>`–`<h4>` | bloco | Títulos, por nível | [3.3](#33-títulos-h1-a-h4) |
| `<p>` | bloco | Parágrafo | [3.4](#34-texto) |
| `<strong>` | linha | Importante (negrito) | [3.4](#34-texto) |
| `<small>` | linha | Texto secundário (menor) | [3.4](#34-texto) |
| `<kbd>` | linha | Tecla do teclado | [3.4](#34-texto) |
| `<br>` | vazia | Quebra de linha | [3.4](#34-texto) |
| `<span>` | linha, genérica | Trecho sem significado | [3.4](#34-texto) |
| `<ul>`, `<ol>`, `<li>` | bloco | Listas e seus itens | [3.5](#35-listas) |
| `<dl>`, `<dt>`, `<dd>` | bloco | Lista de definições | [3.5](#35-listas) |
| `<a>` | linha | Link | [3.6](#36-links-a) |
| `<table>`, `<caption>`, `<tr>`, `<th>`, `<td>` | tabela | Tabela e suas partes | [3.7](#37-tabelas) |

### Todas as classes do projeto

As classes só têm efeito através do CSS. A tabela diz onde cada uma é usada; a aparência está explicada no [guia de CSS](css.md).

| Classe | Onde é usada |
|---|---|
| `cabecalho` | `<header>` do topo |
| `aviso`, `responsabilidade` | Aviso amarelo e sua segunda linha |
| `sumario` | `<nav>` do sumário |
| `semanas` | "Semanas 1–13", acima do título dos trimestres |
| `abertura` | Texto de abertura de cada seção |
| `cartoes`, `semana`, `fruta` | "O bebê nesta fase" |
| `duas-colunas` | "Prefira" / "Evite" |
| `fatos` | Listas de definições do pré-natal |
| `tabela` | Tabelas de ganho de peso, linha do tempo e vacinas |
| `nota` | Caixas de nota |
| `linha-citacao` | Parágrafos que têm só citações |
| `citacao` | Cada link de fonte, como [7, p. 24] |
| `voltar` | "↑ Voltar ao início" |
| `alerta` | Caixa "Sinais de alerta" |
| `legenda` | Lista "Como ler a tabela" |
| `alimentos` | Tabela de alimentos |
| `etiqueta` + `seguro` / `limitar` / `evitar` / `sem-fonte` | Etiquetas de situação |
| `referencias` | Lista da Bibliografia |
| `pendente` | Etiqueta "a conferir" |

### Todos os `id`s do projeto

| `id` | Elemento |
|---|---|
| `inicio` | `<header>` (destino de "Voltar ao início") |
| `primeiro-trimestre`, `segundo-trimestre`, `terceiro-trimestre`, `cuidados-na-gestacao`, `consulta-de-alimentos`, `bibliografia` | As seis `<section>` |
| `fonte-1` a `fonte-81` | Os itens da Bibliografia |
