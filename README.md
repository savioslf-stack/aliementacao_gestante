# Guia de alimentação na gestação

Página web estática, em português do Brasil, sobre alimentação na gestação. Ela orienta o que comer, o que limitar e o que evitar, trimestre a trimestre, e tem uma consulta de 559 alimentos com situação, período da gestação e fonte. Todas as informações vêm de fontes brasileiras (principalmente a *Caderneta Brasileira da Gestante 2026*, do Ministério da Saúde), citadas no texto.

Este repositório contém a página pronta e a sua documentação técnica. A página é publicada pelo **GitHub Pages** como está: sem servidor, sem dependências e sem etapa de build.

> **Aviso:** não é um site oficial. O conteúdo é informativo e não substitui a orientação profissional.

## Resumo técnico

| Item | Valor |
|---|---|
| Tipo | Site estático, página única com navegação por âncora (`#secao`) |
| Tecnologias | HTML5, CSS3 (variáveis, Grid, Flexbox, `position: sticky`), JavaScript (ES2019+) sem bibliotecas |
| Dependências externas | Apenas Google Fonts (*Young Serif* e *Atkinson Hyperlegible*); há fontes do sistema como alternativa |
| Build | Nenhum: os arquivos são servidos como estão |
| Hospedagem | GitHub Pages (também abre direto do disco, via `file://`) |
| Tamanho | 5 arquivos, cerca de 335 KB (dos quais 214 KB são dados) |
| Conteúdo | 6 seções · 559 alimentos em 29 categorias · 81 fontes |
| Idioma | Interface, conteúdo, nomes no código e comentários em português do Brasil |

## Estrutura de arquivos

```
index.html                    estrutura e textos de todas as seções
recursos/
  estilo.css                  aparência: variáveis de design, layout, componentes, responsividade, impressão
  pagina.js                   comportamento: bibliografia, tabela, busca, navegação, partes fixas
  dados/
    alimentos.js              constante ALIMENTOS (559 itens)
    fontes.js                 constante FONTES (81 itens)
documentacao/                 documentação técnica (abaixo)
```

## Documentação

| Documento | Conteúdo |
|---|---|
| [Arquitetura](documentacao/arquitetura.md) | Visão geral, ordem de carregamento, fluxo de dados, decisões de projeto e limites |
| [HTML](documentacao/html.md) | Estrutura do documento, seções, ids, atributos `data-*`, áreas preenchidas pelo JavaScript, citações |
| [CSS](documentacao/css.md) | Variáveis de design, layout, camadas fixas (*sticky*), componentes, pontos de quebra, impressão |
| [JavaScript](documentacao/javascript.md) | Partes do `pagina.js`, funções, algoritmo de busca, navegação por âncora, eventos |
| [Dados](documentacao/dados.md) | Modelo de `ALIMENTOS` e `FONTES`, valores de situação, formato das citações, regras de integridade e origem dos dados |
| [Acessibilidade e responsividade](documentacao/acessibilidade-e-responsividade.md) | Recursos de acessibilidade, contraste de cores, comportamento em celular, limitações conhecidas |
| [Publicação](documentacao/publicacao.md) | GitHub Pages: o que o serviço permite, passo a passo de publicação, teste local, cache |
| [Manutenção](documentacao/manutencao.md) | Como fazer correções pontuais no conteúdo e nos dados sem quebrar a página |
| [Glossário](documentacao/glossario.md) | Termos técnicos e nomes usados no código |


## Acessar site 

https://savioslf-stack.github.io/aliementacao_gestante/

## Executar localmente

Abra o `index.html` no navegador. Para reproduzir o ambiente do GitHub Pages (servidor HTTP), rode na pasta do projeto:

```
python3 -m http.server 8000
```

e acesse `http://localhost:8000`.

## Principais decisões

- **Sem build e sem bibliotecas:** cada arquivo pode ser lido e alterado diretamente.
- **Dados em arquivos `.js`, não `.json`:** são carregados com `<script>`, o que funciona também em `file://`, onde `fetch()` é bloqueado pelo navegador.
- **Uma página, várias seções:** a seção visível é escolhida pela âncora do endereço, o que dispensa rotas no servidor (o GitHub Pages não tem).
- **Toda informação de saúde tem fonte brasileira citada.** Quando nenhuma fonte confiável foi encontrada, o item mostra a situação **"Sem fonte confiável"** em vez de um palpite.
- **Nomes em português** em todo o código (classes, ids, variáveis, funções, campos de dados).
