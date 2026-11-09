# Dados (`recursos/dados/`)

[← Voltar ao índice](../README.md)

Os dados ficam em dois arquivos JavaScript que declaram uma constante cada. Cada item ocupa uma linha, no formato de um objeto JSON.

| Arquivo | Constante | Itens | Tamanho |
|---|---|---|---|
| `alimentos.js` | `ALIMENTOS` | 559 | ~214 KB |
| `fontes.js` | `FONTES` | 81 | ~23 KB |

## `ALIMENTOS`

```js
{"nome": "Ovo cru", "termos": "gemada, ovo cru batido, shake com ovo cru", "categoria": "Ovos",
 "chave": "ovos-crus-malcozidos", "situacao": "evitar", "semanaInicio": 1, "semanaFim": 40,
 "observacoes": "Evite alimentos crus ou malcozidos.", "fontes": ["7:24"]}
```

| Campo | Tipo | Exibido | Descrição |
|---|---|---|---|
| `nome` | texto | sim | Nome do alimento; é a chave de ordenação e o alvo principal da busca |
| `termos` | texto | sim (abaixo do nome) | Sinônimos, variedades e termos de busca, separados por vírgula; pode ser `""` |
| `categoria` | texto | não | Uma das 29 categorias do catálogo (ex.: "Frutas", "Chás e infusões de ervas") |
| `chave` | texto | não | Grupo de pesquisa: alimentos com a mesma chave receberam a mesma resposta (220 chaves) |
| `situacao` | texto (valor fixo, abaixo) | sim (etiqueta) | Resposta para a gestação |
| `semanaInicio`, `semanaFim` | número 1–40 | sim (coluna Quando) | Período em que a orientação vale; hoje todos os itens usam 1–40 |
| `observacoes` | texto | sim | Orientação em linguagem simples (até cerca de 30 palavras) |
| `fontes` | lista | sim (links) | Citações: número da fonte (`7` ou `"7"`) ou texto `"número:página"` (`"7:24"`, `"7:88–91"`) |

### Valores de `situacao`

| Valor | Etiqueta | Significado | Itens |
|---|---|---|---|
| `seguro` | Seguro | Uma fonte brasileira recomenda ou permite o consumo | 227 |
| `limitar` | Limitar | Consumir pouco, com moderação ou só com preparo adequado | 185 |
| `evitar` | Evitar | Não consumir na gestação (ou no período indicado) | 96 |
| `sem-fonte` | Sem fonte confiável | Nenhuma fonte brasileira confiável encontrada | 51 |
| `a-pesquisar` | A pesquisar | Reservado; não usado nos dados atuais | 0 |

O valor de `situacao` também é usado como classe CSS (`etiqueta seguro`, `preenchimento evitar`), por isso só valores desta tabela funcionam.

## `FONTES`

```js
{"numero": 7, "conferida": true, "titulo": "Caderneta Brasileira da Gestante",
 "detalhes": "BRASIL. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Brasília, DF, 2026.",
 "endereco": "https://www.gov.br/saude/..."}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `numero` | número | Identificador da fonte, usado em `#fonte-N` e nas citações. **Estável: nunca renumerar** |
| `conferida` | booleano | `false` mostra a etiqueta "a conferir" (fonte localizada, conteúdo não lido). Hoje: fontes 3, 4, 5 e 6 |
| `titulo` | texto | Título do documento (também usado como `title` dos links de citação) |
| `detalhes` | texto | Autor/órgão e ano |
| `endereco` | URL | Link do documento; o domínio é exibido ao lado |

A lista inclui as 7 fontes originais do projeto (1 a 7) e todas as fontes citadas por algum alimento. Os textos das seções citam as fontes 2 e 7; as fontes 4, 5 e 6 não são citadas em nenhum ponto e aparecem só na Bibliografia, com a etiqueta "a conferir".

## Regras de integridade

1. Todo número usado em `fontes` (de `ALIMENTOS`) e em `href="#fonte-N"` (no HTML) precisa existir em `FONTES`.
2. Os números de `FONTES` são fixos. Fontes novas recebem o próximo número livre.
3. `situacao` só aceita os valores da tabela acima.
4. Itens com `situacao: "sem-fonte"` têm `fontes: []`.
5. Os nomes (`nome`) são únicos.

## Origem dos dados

Os dados são o resultado final de uma pesquisa feita para o projeto (os arquivos de trabalho dessa pesquisa não fazem parte deste repositório):
- **Fontes aceitas:** apenas brasileiras, em ordem de preferência: órgãos de governo (Ministério da Saúde, ANVISA, BVS, secretarias de saúde), instituições brasileiras (Fiocruz, Embrapa, universidades e hospitais universitários), artigos científicos brasileiros (SciELO). Órgãos estrangeiros, portais comerciais e notícias foram excluídos.
- **Fonte principal:** *Caderneta Brasileira da Gestante*, Ministério da Saúde, 2026 (fonte 7), citada com o número da página impressa.
- **Agrupamento:** alimentos com a mesma resposta esperada foram pesquisados juntos, pela mesma `chave`. Nomes regionais do mesmo alimento (aipim e macaxeira, por exemplo) são itens separados, para a busca encontrar todos, mas com a mesma chave.
- **Sem resposta também é resposta:** quando nenhuma fonte brasileira confiável foi encontrada, o item recebeu `sem-fonte`, em vez de uma situação estimada.
