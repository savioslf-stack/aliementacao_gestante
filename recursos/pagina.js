/* ==========================================================================
   pagina.js — o "comportamento" da página
   ==========================================================================

   O QUE ESTE ARQUIVO FAZ
   O HTML (index.html) só tem a estrutura e os textos fixos. Este arquivo de
   JavaScript faz a página "funcionar":
     1. Monta a lista da Bibliografia a partir dos dados de FONTES.
     2. Coloca a caixa "Sinais de alerta" na seção Cuidados na gestação.
     3. Monta a tabela da Consulta de alimentos a partir dos dados de ALIMENTOS
        e faz a busca funcionar enquanto a pessoa digita.
     4. Mostra uma seção de cada vez (Primeiro trimestre, Segundo...) e cuida
        dos botões "Anterior" e "Próximo".
     5. Ajusta as partes que ficam "grudadas" no topo da tela ao rolar.

   DE ONDE VÊM OS DADOS
   Antes deste arquivo, o index.html carrega dois arquivos de dados:
     - recursos/dados/fontes.js     → cria a lista FONTES (bibliografia)
     - recursos/dados/alimentos.js  → cria a lista ALIMENTOS (a tabela)
   Esses dois arquivos guardam o resultado final da pesquisa do projeto (dados fixos).
   O site foi publicado para não ser alterado; se um dia for preciso corrigir algo,
   veja documentacao/manutencao.md.

   SEM "BUILD"
   Este arquivo é usado exatamente como está. Não existe etapa de compilação:
   o GitHub Pages entrega o arquivo para o navegador, e o navegador executa.

   PEQUENO GLOSSÁRIO
   - const        : cria um nome para um valor que não vai mudar.
   - function     : um bloco de código com nome, que pode ser chamado várias vezes.
   - =>           : jeito curto de escrever uma função. "x => x + 1" é uma função
                    que recebe x e devolve x + 1.
   - `texto ${x}` : "template string". O que está dentro de ${ } é trocado pelo valor.
   - document     : representa a página. document.getElementById("abc") pega o
                    elemento do HTML que tem id="abc".
   - innerHTML    : o HTML que fica dentro de um elemento. Trocar o innerHTML
                    troca o que aparece na tela.
   Os nomes em inglês que aparecem no código (document, addEventListener, map,
   filter, textContent...) são do próprio JavaScript e não podem ser traduzidos.
   Os nomes criados por nós estão todos em português.
   ========================================================================== */


/* --------------------------------------------------------------------------
   CONFIGURAÇÕES GERAIS
   -------------------------------------------------------------------------- */

// Texto que aparece na etiqueta colorida de cada situação.
// À esquerda: o código usado nos dados (ALIMENTOS). À direita: o texto mostrado ao leitor.
// O código também é usado como classe CSS (ex.: class="etiqueta seguro").
const ROTULO_SITUACAO = {
  "seguro": "Seguro",
  "limitar": "Limitar",
  "evitar": "Evitar",
  "sem-fonte": "Sem fonte confiável",
  "a-pesquisar": "A pesquisar",
};

// Uma gestação tem 40 semanas. Usado para desenhar a barrinha de semanas da tabela.
const TOTAL_SEMANAS = 40;


/* --------------------------------------------------------------------------
   1. BIBLIOGRAFIA
   Para cada fonte da lista FONTES, cria um item <li> dentro de <ol id="referencias">.
   Cada item recebe id="fonte-N" (N = número da fonte). É por isso que os links
   [7, p. 24] da página, que apontam para "#fonte-7", levam até a fonte certa.
   Cada fonte tem: numero, conferida (verdadeiro/falso), titulo, detalhes, endereco.
   -------------------------------------------------------------------------- */
document.getElementById("referencias").innerHTML = FONTES.map(fonte => `
  <li id="fonte-${fonte.numero}">
    <span class="numero">[${fonte.numero}]</span>
    <span>
      <span class="titulo">${fonte.titulo}</span>${fonte.conferida ? "" : ' <span class="pendente">a conferir</span>'}
      <span class="detalhes">${fonte.detalhes} <a href="${fonte.endereco}" rel="noopener">${new URL(fonte.endereco).hostname.replace(/^www\./, "")}</a></span>
    </span>
  </li>`).join("");
// Notas:
// - "conferida" falso mostra a etiqueta "a conferir": fonte encontrada, mas o conteúdo não foi lido.
// - new URL(...).hostname pega só o domínio do link (ex.: "gov.br") para mostrar ao leitor.
// - .map(...) transforma cada fonte em um pedaço de HTML; .join("") junta tudo num texto só.


/* --------------------------------------------------------------------------
   2. SINAIS DE ALERTA (Caderneta da Gestante 2026, p. 28)
   A lista abaixo é o conteúdo da caixa vermelha "Sinais de alerta".
   No HTML existe um espaço vazio <div class="espaco-alerta"></div>; este código
   preenche esse espaço. Se um dia houver mais de um espaço, todos são preenchidos.
   Para mudar o texto da caixa, edite esta lista.
   -------------------------------------------------------------------------- */
const SINAIS_DE_ALERTA = [
  "Pressão mais alta que o habitual ou acima de 140 x 90 mmHg",
  "Sangramento vaginal",
  "Dor abdominal forte ou que não passa",
  "Febre (37,8 °C ou mais)",
  "Dor de cabeça intensa ou que não melhora",
  "Alterações na visão: visão turva, sensibilidade à luz, flashes, pontos cegos",
  "Dor forte no estômago, logo abaixo da linha entre as mamas",
  "Dor ou ardência ao urinar",
  "Inchaço repentino no rosto, nas mãos ou nas pernas",
  "Bebê se mexendo menos ou parado por mais de 4 horas, depois de 20 semanas",
  "Manchas vermelhas na pele ou olhos vermelhos",
  "Mal-estar intenso ou sensação de que algo não está bem",
  "Dor forte no peito ou falta de ar",
  "Convulsão ou desmaio",
];
document.querySelectorAll(".espaco-alerta").forEach(espaco => {
  espaco.innerHTML = `<aside class="caixa-alerta" aria-label="Sinais de alerta">
      <h3>Sinais de alerta</h3>
      <p>Procure atendimento imediatamente se tiver:</p>
      <ul>${SINAIS_DE_ALERTA.map(sinal => `<li>${sinal}</li>`).join("")}</ul>
      <p class="chamada">Vá à Unidade Básica de Saúde, à sua maternidade de referência ou ao serviço de urgência mais próximo, ou ligue para o Samu 192.
        <span class="citacao"><a href="#fonte-7" aria-label="Fonte 7, página 28">[7, p. 28]</a></span></p>
    </aside>`;
});


/* --------------------------------------------------------------------------
   3. TABELA DE ALIMENTOS E BUSCA
   A tabela não está escrita no HTML: ela é montada aqui, a partir de ALIMENTOS.
   Cada alimento tem estes campos:
     nome         : nome mostrado (ex.: "Queijo canastra")
     termos       : outros nomes e termos de busca (ex.: "queijo da canastra")
     categoria    : categoria (ex.: "Queijos - de leite cru e artesanais")
     chave        : "chave de pesquisa"; alimentos com a mesma chave têm a mesma resposta
     situacao     : "seguro", "limitar", "evitar", "sem-fonte" ou "a-pesquisar"
     semanaInicio : primeira semana em que a orientação vale (1 a 40)
     semanaFim    : última semana em que a orientação vale (1 a 40)
     observacoes  : texto da coluna Observações
     fontes       : fontes, ex.: [7, "7:24"] = fonte 7, e fonte 7 na página 24
   -------------------------------------------------------------------------- */

// Atalhos para os elementos do HTML que vamos usar muitas vezes.
const elLinhas    = document.getElementById("linhas-alimentos");      // corpo da tabela (<tbody>)
const elBusca     = document.getElementById("busca-alimentos");       // campo de busca
const elLimpar    = document.querySelector(".busca .limpar");         // botão "×" que limpa a busca
const elContagem  = document.getElementById("contagem-resultados");   // texto "33 de 559 alimentos"
const elSemResult = document.getElementById("sem-resultados");        // mensagem "Nenhum alimento corresponde..."

// normalizar: deixa o texto em minúsculas e sem acentos, para a busca não depender disso.
// Assim "acido" encontra "Ácido" e "figado" encontra "Fígado".
// (normalize("NFD") separa a letra do acento; o replace apaga os acentos.)
const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// escaparHtml: troca caracteres especiais (&, <, >, aspas) por versões seguras.
// Isso evita que um texto dos dados seja interpretado como código HTML.
const escaparHtml = texto => texto.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

// destacar: destaca (com <mark>, fundo amarelo) a parte do texto que bate com a busca.
// Funciona porque, em português, tirar o acento não muda o tamanho do texto:
// a posição encontrada no texto sem acento é a mesma no texto original.
function destacar(texto, termo) {
  if (!termo) return escaparHtml(texto);
  const posicao = normalizar(texto).indexOf(termo);
  if (posicao < 0) return escaparHtml(texto);
  return escaparHtml(texto.slice(0, posicao)) + "<mark>" + escaparHtml(texto.slice(posicao, posicao + termo.length)) + "</mark>" + escaparHtml(texto.slice(posicao + termo.length));
}

// celulaQuando: monta a coluna "Quando (semanas)".
// Mostra o texto ("Gestação inteira" ou "Semanas 36–40") e uma barrinha
// de 40 semanas com a parte pintada no período em que a orientação vale.
function celulaQuando(alimento) {
  // Sem fonte confiável: não há período para mostrar.
  if (alimento.situacao === "sem-fonte") {
    return `<div class="janela"><span class="periodo apagado">Não se aplica</span><span class="trilha" aria-hidden="true"></span></div>`;
  }
  // Ainda sem pesquisa: semanas desconhecidas.
  if (alimento.semanaInicio == null || alimento.semanaFim == null) {
    return `<div class="janela"><span class="periodo apagado">A definir</span><span class="trilha" aria-hidden="true"></span></div>`;
  }
  // Calcula onde a parte pintada começa (esquerda) e o tamanho dela (largura), em porcentagem.
  // Exemplo: semanas 36 a 40 → começa em 87,5% e ocupa 12,5% da barra.
  const esquerda = ((alimento.semanaInicio - 1) / TOTAL_SEMANAS) * 100;
  const largura  = ((alimento.semanaFim - alimento.semanaInicio + 1) / TOTAL_SEMANAS) * 100;
  const texto    = (alimento.semanaInicio === 1 && alimento.semanaFim === TOTAL_SEMANAS)
    ? "Gestação inteira"
    : `Semanas ${alimento.semanaInicio}–${alimento.semanaFim}`;
  return `<div class="janela">
            <span class="periodo">${texto}</span>
            <span class="trilha" aria-hidden="true"><span class="preenchimento ${alimento.situacao}" style="left:${esquerda}%;width:${largura}%"></span></span>
          </div>`;
}

// Índice para achar uma fonte pelo número: FONTE_POR_NUMERO["7"] → dados da fonte 7.
const FONTE_POR_NUMERO = Object.fromEntries(FONTES.map(fonte => [String(fonte.numero), fonte]));

// citar: transforma uma referência dos dados em link para a Bibliografia.
//   "7:24" → [7, p. 24]   (fonte 7, página 24)
//   1      → [1]          (fonte 1, sem página)
// O "title" faz aparecer o nome da fonte quando o mouse passa por cima do link.
function citar(referencia) {
  const [numero, pagina] = String(referencia).split(":");
  const rotulo   = pagina ? `${numero}, p. ${pagina}` : numero;
  const leitura  = pagina ? `Fonte ${numero}, página ${pagina}` : `Fonte ${numero}`;   // texto lido por leitores de tela
  const fonte    = FONTE_POR_NUMERO[numero];
  const dica     = fonte ? ` title="${escaparHtml(fonte.titulo)}"` : "";
  return `<a href="#fonte-${numero}" aria-label="${leitura}"${dica}>[${rotulo}]</a>`;
}

// linksDasFontes: monta todos os links de fonte de um alimento, no fim das Observações.
function linksDasFontes(alimento) {
  if (alimento.situacao === "a-pesquisar") return "";   // ainda sem pesquisa: nada a mostrar
  if (alimento.situacao === "sem-fonte") return "";     // sem fonte: a etiqueta já diz isso
  if (!alimento.fontes || alimento.fontes.length === 0) return ' <span class="pendente">fonte pendente</span>';
  return ' <span class="fontes">' + alimento.fontes.map(citar).join("") + "</span>";
}

// alimentosOrdenados: a lista de alimentos em ordem alfabética (regras do português).
// Também guarda, em cada alimento, o nome e os termos já "normalizados"
// (_nome e _termos), para a busca não precisar recalcular isso a cada letra digitada.
const alimentosOrdenados = [...ALIMENTOS]
  .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
  .map(alimento => ({ ...alimento, _nome: normalizar(alimento.nome), _termos: normalizar(alimento.termos || "") }));

// notaDaBusca: dá uma "nota" para cada alimento na busca. Nota menor aparece primeiro.
//   0 = o nome começa com o que foi digitado         (ex.: "sal" → "Sal", "Salsicha")
//   1 = uma palavra do nome começa com o termo       (ex.: "sal" → "Biscoito de água e sal")
//   2 = o termo aparece no meio de uma palavra       (ex.: "cha" → "Salsicha")
//   3 = uma palavra dos outros termos começa com ele
//   4 = o termo aparece no meio dos outros termos
//  -1 = não combina (o alimento some da tabela)
const palavras = texto => " " + texto.replace(/[^a-z0-9]+/g, " ");
function notaDaBusca(alimento, termo) {
  if (alimento._nome.startsWith(termo)) return 0;
  if (palavras(alimento._nome).includes(" " + termo)) return 1;
  if (alimento._nome.includes(termo)) return 2;
  if (palavras(alimento._termos).includes(" " + termo)) return 3;
  if (alimento._termos.includes(termo)) return 4;
  return -1;
}

// desenharTabela: (re)desenha a tabela. É chamada quando a página abre e a cada letra digitada.
function desenharTabela() {
  const digitado = elBusca.value.trim();   // o que a pessoa digitou, sem espaços nas pontas
  const termo    = normalizar(digitado);   // o mesmo texto, sem acento e em minúsculas

  // Se há busca: calcula a nota de cada alimento, tira os que não combinam
  // e ordena pela nota. Se não há busca: mostra todos, em ordem alfabética.
  const lista = termo
    ? alimentosOrdenados.map(alimento => [notaDaBusca(alimento, termo), alimento]).filter(([nota]) => nota >= 0)
        .sort((a, b) => a[0] - b[0]).map(([, alimento]) => alimento)
    : alimentosOrdenados;

  // Monta uma linha <tr> por alimento, com as 4 colunas:
  // Alimento | Situação | Quando (semanas) | Observações.
  // "data-rotulo" é usado no celular, onde cada linha vira um bloco com rótulos.
  elLinhas.innerHTML = lista.map(alimento => `
    <tr>
      <td class="nome">${destacar(alimento.nome, termo)}${alimento.termos ? `<span class="outros-nomes">${destacar(alimento.termos, termo)}</span>` : ""}</td>
      <td class="situacao"><span class="etiqueta ${alimento.situacao}">${ROTULO_SITUACAO[alimento.situacao]}</span></td>
      <td data-rotulo="Quando">${celulaQuando(alimento)}</td>
      <td class="observacoes" data-rotulo="Observações">${alimento.situacao === "a-pesquisar" ? '<span class="apagado">Pesquisa pendente.</span>' : escaparHtml(alimento.observacoes)}${linksDasFontes(alimento)}</td>
    </tr>`).join("");

  // Mostra o "×" só quando há texto; mostra a mensagem de "nenhum resultado" só quando a lista está vazia.
  elLimpar.hidden = digitado.length === 0;
  elSemResult.hidden = lista.length > 0;
  document.getElementById("termo-buscado").textContent = digitado;

  // Texto ao lado da busca: só aparece quando há uma busca.
  elContagem.textContent = termo ? `${lista.length} de ${alimentosOrdenados.length} alimentos` : "";

  // Contagem por situação, mostrada na coluna "Itens" da tabela "Como ler a tabela".
  // As células têm data-contagem="seguro", "limitar"... e recebem o número correspondente.
  const contagens = { "seguro": 0, "limitar": 0, "evitar": 0, "sem-fonte": 0, "total": lista.length };
  lista.forEach(alimento => { if (alimento.situacao in contagens) contagens[alimento.situacao]++; });
  document.querySelectorAll(".tabela-legenda [data-contagem]").forEach(celula => {
    celula.textContent = contagens[celula.dataset.contagem].toLocaleString("pt-BR");
  });
  document.getElementById("rotulo-total-legenda").textContent = termo ? "Total no resultado da busca" : "Total";
}

// Limpa a busca, redesenha a tabela e devolve o cursor para o campo de busca.
function limparBusca() { elBusca.value = ""; desenharTabela(); elBusca.focus(); }

// "Escutadores de eventos": dizem o que fazer quando algo acontece.
elBusca.addEventListener("input", desenharTabela);                                            // a cada letra digitada
elBusca.addEventListener("keydown", evento => { if (evento.key === "Escape") limparBusca(); }); // tecla Esc limpa
elLimpar.addEventListener("click", limparBusca);                                               // clique no "×"
document.getElementById("limpar-busca-vazia").addEventListener("click", limparBusca);          // botão "Limpar busca"
desenharTabela();   // desenha a tabela pela primeira vez, assim que a página abre


/* --------------------------------------------------------------------------
   4. NAVEGAÇÃO ENTRE SEÇÕES
   A página tem várias <section class="secao"> (trimestres, cuidados, consulta,
   bibliografia), mas só uma aparece por vez. A seção visível é escolhida pelo
   "hash" do endereço: a parte depois do #.
     .../index.html#segundo-trimestre  → mostra a seção id="segundo-trimestre"
   Vantagens: funciona em qualquer hospedagem estática (como o GitHub Pages),
   o botão "voltar" do navegador funciona, e cada seção tem um link próprio
   que pode ser compartilhado.
   -------------------------------------------------------------------------- */
const secoes       = [...document.querySelectorAll(".secao")];        // todas as seções, na ordem do HTML
const idsDasSecoes = secoes.map(secao => secao.id);                    // os ids delas
const elPaginacao  = document.getElementById("paginacao");             // área dos botões Anterior / Próximo
const menuLateral  = document.getElementById("menu-lateral");          // menu lateral
const botaoMenu    = menuLateral.querySelector(".botao-menu");         // botão "Temas" (só aparece no celular)

// mostrarSecao: mostra a seção com o id pedido e esconde as outras.
//   focar   : se verdadeiro, volta ao topo e coloca o foco no título (ajuda quem usa teclado).
//   idFonte : usado quando o link é para uma fonte ("#fonte-7").
function mostrarSecao(id, { focar = true, idFonte = null } = {}) {
  // Links "#fonte-N" abrem a Bibliografia e rolam até a fonte N.
  if (id.startsWith("fonte-")) { idFonte = id; id = "bibliografia"; }
  // Endereço desconhecido ou vazio: mostra a primeira seção.
  if (!idsDasSecoes.includes(id)) id = idsDasSecoes[0];
  const posicao = idsDasSecoes.indexOf(id);   // posição da seção na lista (0 = primeira)

  // Mostra só a seção escolhida (hidden = escondida).
  secoes.forEach(secao => { secao.hidden = secao.id !== id; });

  // Marca no menu lateral qual item está ativo (aria-current="page").
  // O CSS usa isso para pintar o item de escuro.
  document.querySelectorAll(".menu-lateral .menu a").forEach(link => {
    if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  // Marca na faixa de 40 semanas do cabeçalho qual trimestre está aberto.
  document.querySelectorAll(".faixa-semanas a").forEach(link => {
    link.setAttribute("aria-current", link.dataset.alvo === id ? "true" : "false");
  });

  // Atualiza o título da aba do navegador e o texto do botão "Temas" (celular).
  const titulo = secoes[posicao].dataset.titulo;
  document.title = `${titulo} | Guia de alimentação na gestação`;
  document.getElementById("menu-atual").textContent = titulo;

  // Monta os botões "Anterior" e "Próximo" com a seção de antes e a de depois.
  // Na primeira seção não há "Anterior"; na última não há "Próximo".
  const anterior = secoes[posicao - 1], proxima = secoes[posicao + 1];
  elPaginacao.innerHTML =
    (anterior ? `<a class="anterior" href="#${anterior.id}"><span class="direcao">Anterior</span><span class="titulo">${anterior.dataset.titulo}</span></a>` : "") +
    (proxima  ? `<a class="proximo" href="#${proxima.id}"><span class="direcao">Próximo</span><span class="titulo">${proxima.dataset.titulo}</span></a>` : "");

  // No celular, fecha o menu depois de escolher uma seção.
  menuLateral.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");

  if (idFonte) {
    // Rola até a fonte pedida, deixando-a no meio da tela.
    const elFonte = document.getElementById(idFonte);
    if (elFonte) elFonte.scrollIntoView({ block: "center" });
  } else if (focar) {
    // Volta para o topo e põe o foco no título da seção.
    window.scrollTo({ top: 0 });
    secoes[posicao].querySelector("h2").focus({ preventScroll: true });
  }
}

// Sempre que o hash do endereço muda (clique em um link "#..."), mostra a seção correspondente.
// decodeURIComponent desfaz códigos como "%C3%A7" (que representam letras acentuadas).
window.addEventListener("hashchange", () => mostrarSecao(decodeURIComponent(location.hash.slice(1))));

// Botão "Temas" (celular): abre e fecha o menu.
// aria-expanded informa aos leitores de tela se o menu está aberto.
botaoMenu.addEventListener("click", () => {
  const aberto = menuLateral.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});


/* --------------------------------------------------------------------------
   5. PARTES "GRUDADAS" NO TOPO (sticky)
   O aviso amarelo, a barra de busca e o cabeçalho da tabela ficam fixos no topo
   ao rolar a página. Para um não cobrir o outro, o CSS precisa saber a altura
   de cada um. Esta função mede essas alturas e guarda em duas "variáveis CSS":
     --altura-aviso : altura do aviso amarelo
     --altura-busca : altura da barra de busca
   O ResizeObserver mede de novo sempre que a altura muda (por exemplo, quando
   o texto quebra em mais linhas numa tela estreita). Navegadores antigos sem
   ResizeObserver medem de novo quando a janela muda de tamanho.
   -------------------------------------------------------------------------- */
const elFerramentasBusca = document.querySelector(".ferramentas-busca");
const elAviso = document.querySelector(".aviso");
function medirPartesFixas() {
  document.documentElement.style.setProperty("--altura-aviso", elAviso.offsetHeight + "px");
  document.documentElement.style.setProperty("--altura-busca", elFerramentasBusca.offsetHeight + "px");
}
medirPartesFixas();
if ("ResizeObserver" in window) {
  const observador = new ResizeObserver(medirPartesFixas);
  observador.observe(elFerramentasBusca); observador.observe(elAviso);
} else {
  window.addEventListener("resize", medirPartesFixas);
}

// Quando a página abre, mostra a seção indicada no endereço (ou a primeira, se não houver).
// focar: false porque, ao abrir a página, não queremos rolar nem mudar o foco.
mostrarSecao(decodeURIComponent(location.hash.slice(1)), { focar: false });
