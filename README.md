# Guia de alimentação na gestação

Página web em português do Brasil sobre alimentação na gestação. Ela orienta o que comer, o que limitar e o que evitar, trimestre a trimestre, e tem uma consulta de 559 alimentos com a situação de cada um e a fonte. Todas as informações vêm de fontes brasileiras (principalmente a *Caderneta Brasileira da Gestante 2026*, do Ministério da Saúde), citadas no texto.

> **Aviso:** não é um site oficial. O conteúdo é informativo e não substitui a orientação profissional.

## Acessar o site

https://savioslf-stack.github.io/aliementacao_gestante/

## Como o site é feito

O site é **uma única página HTML com rolagem**, mais um arquivo de estilo (CSS). Não usa JavaScript, bibliotecas nem etapa de build: o GitHub Pages entrega os arquivos exatamente como estão.

| Item | Valor |
|---|---|
| Tecnologias | HTML5 e CSS3 |
| Arquivos do site | `index.html` (conteúdo) e `estilo.css` (aparência) |
| Dependências externas | Apenas Google Fonts (*Young Serif* e *Atkinson Hyperlegible*); sem internet, o navegador usa as fontes do aparelho |
| Conteúdo | 6 seções · 559 alimentos · 81 fontes |
| Hospedagem | GitHub Pages (também abre direto do computador) |

## Arquivos

```
index.html        todo o conteúdo: textos, tabela de alimentos e bibliografia
estilo.css        aparência: cores, letras, espaços e ajustes para celular
documentacao/     explicação do código (abaixo)
.nojekyll         arquivo vazio: faz o GitHub Pages publicar os arquivos como estão (ver Ciclo de vida)
LICENSE           licença Apache 2.0
```

## Documentação

Os guias são escritos para quem está começando e podem ser lidos nesta ordem:

| Documento | Conteúdo |
|---|---|
| [HTML](documentacao/html.md) | O que é HTML, todas as tags e atributos usados e o `index.html` parte por parte |
| [CSS](documentacao/css.md) | O que é CSS, todas as propriedades usadas e o `estilo.css` parte por parte |
| [Ciclo de vida](documentacao/ciclo-de-vida.md) | Como uma alteração vai do computador para o site: branch, commit, push, pull request, aprovação, merge e publicação no GitHub Pages |

## Abrir no computador

Basta abrir o `index.html` com dois cliques: ele abre no navegador. Não é preciso instalar nada.

## Principais decisões

- **Sem JavaScript:** tudo o que aparece na tela está escrito no `index.html`. Assim, o código é só HTML e CSS.
- **Uma página só, com rolagem:** as seções aparecem uma depois da outra, e o sumário no topo tem links para cada uma.
- **Busca do navegador:** para achar um alimento, a pessoa usa a busca do próprio navegador (Ctrl+F). A tabela está em ordem alfabética.
- **Toda informação de saúde tem fonte brasileira citada.** Quando nenhuma fonte confiável foi encontrada, o alimento aparece como **"Sem fonte confiável"**, em vez de um palpite.
- **Nomes em português** nas classes e ids do código.
