# Glossário

[← Voltar ao índice](../README.md)

## Termos técnicos

| Termo | Significado |
|---|---|
| **Site estático** | Site formado só por arquivos, entregues como estão, sem programa rodando no servidor |
| **Build** | Etapa que transforma o código antes de publicar (compilar, juntar, minificar). Este projeto não tem |
| **DOM** | Representação da página na memória do navegador; o JavaScript altera o DOM para mudar o que aparece |
| **Âncora / hash** | Parte do endereço depois de `#`; aqui define a seção visível (`#bibliografia`) |
| **Landmark** | Elemento que marca uma região da página (`header`, `nav`, `main`), usado por leitores de tela para navegar |
| **ARIA** | Atributos `aria-*` e `role` que dão informações extras a tecnologias assistivas |
| **Leitor de tela** | Software que lê a página em voz alta (VoiceOver, TalkBack, NVDA) |
| **Variável CSS** | Propriedade personalizada (`--verde`) lida com `var(--verde)` |
| **Sticky** | `position: sticky`: o elemento rola com a página até chegar ao topo e então fica preso |
| **Ponto de quebra** | Largura de tela em que o layout muda (`@media (max-width: 880px)`) |
| **Script clássico** | `<script src>` sem `type="module"`; as constantes do nível superior ficam visíveis para os scripts seguintes |
| **Normalização (NFD)** | Separar letra e acento (`á` → `a` + acento) para poder remover os acentos |
| **Escape de HTML** | Trocar `<`, `>`, `&` e aspas por entidades, para que um texto não vire código |
| **WCAG** | Diretrizes internacionais de acessibilidade para a web; AA é o nível de referência |
| **GitHub Pages** | Serviço do GitHub que publica sites estáticos a partir de um repositório |

## Termos do conteúdo

| Termo | Significado |
|---|---|
| **Situação** | Resposta para um alimento: Seguro, Limitar, Evitar ou Sem fonte confiável |
| **Sem fonte confiável** | Nenhuma fonte brasileira confiável foi encontrada; é uma resposta válida, não um erro |
| **Chave** | Grupo de alimentos que receberam a mesma resposta na pesquisa (`frutas-frescas`); não aparece na tela |
| **Fonte** | Documento brasileiro que sustenta uma informação, numerado na Bibliografia |
| **Citação** | Link `[7, p. 24]`: fonte 7, página 24 |
| **Caderneta** | *Caderneta Brasileira da Gestante 2026*, do Ministério da Saúde; fonte 7, a principal |

## Nomes usados no código

### Constantes e funções (`pagina.js`)

| Nome | O que é |
|---|---|
| `FONTES`, `ALIMENTOS` | Listas de dados (arquivos em `recursos/dados/`) |
| `ROTULO_SITUACAO` | Código de situação → texto da etiqueta |
| `SINAIS_DE_ALERTA` | Itens da caixa "Sinais de alerta" |
| `TOTAL_SEMANAS` | 40, a escala das barrinhas |
| `FONTE_POR_NUMERO` | Índice das fontes pelo número |
| `alimentosOrdenados` | `ALIMENTOS` em ordem alfabética, com campos normalizados |
| `desenharTabela`, `mostrarSecao`, `notaDaBusca`, `citar`, `destacar`, `celulaQuando`, `linksDasFontes`, `limparBusca`, `medirPartesFixas`, `normalizar`, `escaparHtml` | Ver [JavaScript](javascript.md) |

### Ids (`index.html`)

| Id | Elemento |
|---|---|
| `conteudo` | `main` (destino do link "Pular para o conteúdo") |
| `menu-lateral`, `menu`, `menu-atual` | menu de temas, sua lista e o texto do botão "Temas" |
| `primeiro-trimestre` … `bibliografia` | seções (ver [HTML](html.md)) |
| `busca-alimentos`, `contagem-resultados` | campo de busca e contador |
| `linhas-alimentos` | corpo da tabela de alimentos |
| `sem-resultados`, `termo-buscado`, `limpar-busca-vazia` | mensagem de busca sem resultado |
| `rotulo-total-legenda` | rótulo da linha de total da legenda |
| `referencias` | lista da Bibliografia; os itens são `fonte-N` |
| `paginacao` | botões Anterior / Próximo |

### Classes CSS

Ver a tabela de componentes em [CSS](css.md).
