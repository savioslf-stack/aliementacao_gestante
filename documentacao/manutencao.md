# Manutenção

[← Voltar ao índice](../README.md)

A página foi publicada como versão final e não está previsto mudá-la. Este documento descreve como fazer **correções pontuais** sem quebrar o funcionamento. Use um editor de texto simples (por exemplo, Visual Studio Code) e salve sempre em **UTF-8**.

## Onde está cada coisa

| Para mudar… | Arquivo | Onde |
|---|---|---|
| Textos das seções | `index.html` | dentro da `section.secao` correspondente |
| Aviso fixo | `index.html` | `div.aviso` (duas linhas: `<strong>…` e `p.responsabilidade`) |
| Sinais de alerta | `recursos/pagina.js` | constante `SINAIS_DE_ALERTA` (parte 2) |
| Texto das etiquetas de situação | `recursos/pagina.js` | constante `ROTULO_SITUACAO` |
| Um alimento | `recursos/dados/alimentos.js` | a linha com o `"nome"` do alimento |
| Uma fonte | `recursos/dados/fontes.js` | a linha com o `"numero"` da fonte |
| Cores, fontes, tamanhos | `recursos/estilo.css` | variáveis na parte 1 (`:root`) |

## Regras

1. **Toda informação de saúde precisa de fonte brasileira citada** (`<span class="citacao"><a href="#fonte-N" aria-label="Fonte N, página P">[N, p. P]</a></span>`).
2. **Não renumere fontes.** Fonte nova = próximo número livre.
3. `situacao` só aceita `seguro`, `limitar`, `evitar`, `sem-fonte` (ver [Dados](dados.md)).
4. Sem fonte confiável: `"situacao": "sem-fonte"`, `"fontes": []` e a observação "Não encontramos fonte brasileira confiável sobre este alimento na gestação."
5. **Nomes regionais** do mesmo alimento são itens separados com a mesma informação: corrija todos. Itens com a mesma `chave` receberam a mesma resposta na pesquisa; verifique se a correção vale para o grupo inteiro.
6. Mantenha os nomes do código em português e atualize o comentário correspondente quando mudar um comportamento.

## Alterações comuns

**Corrigir um alimento:** altere só os valores. Mantenha aspas, dois-pontos e a vírgula no fim da linha (um erro de sintaxe esvazia a tabela inteira). A ordem das linhas não importa, porque a tabela é ordenada por nome.

**Incluir uma fonte:** copie uma linha de `fontes.js`, use o próximo `numero` e `"conferida": true` se o conteúdo foi lido.

**Nova seção:**
1. Copie uma `section.secao` inteira no `index.html` e posicione-a na ordem desejada (a ordem define Anterior/Próximo).
2. Ajuste `id` (sem acentos nem espaços), `data-titulo`, `aria-labelledby` e o `id` do `h2` (`h-` + id). Inclua `hidden`.
3. Inclua um `li` com `href="#<id>"` no `nav.menu-lateral`.

**Barrinha de semanas no HTML:** `left = (semana inicial − 1) × 2,5%`; `width = número de semanas × 2,5%`.

## Verificação depois de uma alteração

1. Abrir o `index.html` e o Console do navegador (F12): não deve haver erros.
2. Percorrer todas as seções pelo menu e pelos botões Anterior/Próximo.
3. Abrir algumas citações `[N]`: devem levar à fonte certa, destacada na Bibliografia.
4. Na consulta, confirmar o total da legenda e fazer buscas com e sem acento (ex.: `figado`, `fígado`).
5. Testar a largura de celular no modo de dispositivo do DevTools.
6. Opcional: rodar o Lighthouse e o validador W3C (ver [Acessibilidade e responsividade](acessibilidade-e-responsividade.md)).
