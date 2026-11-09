# Acessibilidade e responsividade

[← Voltar ao índice](../README.md)

## Recursos de acessibilidade

| Recurso | Implementação |
|---|---|
| Idioma da página | `<html lang="pt-BR">` |
| Pular navegação | `a.pular-conteudo` para `#conteudo`, visível ao receber foco |
| Pontos de referência | `header`, `main`, três `nav` com `aria-label`, `aside` na caixa de alerta, `role="search"`, `role="note"` no aviso |
| Títulos | Um `h1` (site), um `h2` por seção (`aria-labelledby`), `h3`/`h4` para blocos |
| Foco ao navegar | Ao trocar de seção, o foco vai para o `h2` (`tabindex="-1"`) |
| Foco visível | `:focus-visible` com contorno de 3px na cor `--verde` |
| Estado do menu | `aria-current="page"` no item ativo; `aria-expanded` e `aria-controls` no botão "Temas" |
| Busca | `<label>` associado ao campo (escondido visualmente com `.oculto-visualmente`); resultado anunciado por `aria-live="polite"` em `#contagem-resultados` |
| Citações | `aria-label` por extenso ("Fonte 7, página 24") em vez de "[7, p. 24]" |
| Elementos decorativos | Ícones SVG e barrinhas com `aria-hidden="true"` |
| Cor com significado | A cor das situações sempre vem acompanhada da palavra (Seguro, Limitar, Evitar) |
| Movimento | `prefers-reduced-motion: reduce` desliga rolagem suave, transições e animações |
| Fonte legível | *Atkinson Hyperlegible*, desenhada para baixa visão; texto base de 17px |
| Tabela | `th scope="col"`; no celular, cada célula mostra o seu rótulo |

## Contraste de cores (WCAG 2.1)

Calculado com a fórmula de luminância relativa da WCAG. Referência: AA exige 4,5:1 para texto normal e 3:1 para texto grande.

| Texto / fundo | Contraste | AA texto normal |
|---|---|---|
| `--tinta` / `--papel` | 13,5:1 | ✓ |
| `--tinta-suave` / `--papel` | 6,2:1 | ✓ |
| `--verde` (links) / `--papel` | 5,7:1 | ✓ |
| `--tinta` / aviso (`--limitar-fundo`) | 12,9:1 | ✓ |
| Branco / `--tinta` (menu ativo) | 14,7:1 | ✓ |
| Etiqueta Evitar (`--evitar` / `--evitar-fundo`) | 5,6:1 | ✓ |
| Etiqueta Sem fonte (`--tinta` / `#ECEEF0`) | 12,6:1 | ✓ |
| Etiqueta Seguro (`--seguro` / `--seguro-fundo`) | 4,3:1 | ✗ (passa como texto grande) |
| Etiqueta Limitar (`--limitar` / `--limitar-fundo`) | 4,2:1 | ✗ (passa como texto grande) |

**Limitação conhecida:** as etiquetas Seguro e Limitar ficam um pouco abaixo de 4,5:1. O texto é negrito, mas pequeno (0,85rem), por isso não conta como texto grande. Para chegar a 4,5:1, basta escurecer levemente `--seguro` e `--limitar` na parte 1 do CSS. A palavra na etiqueta garante que a informação não depende só da cor.

## Responsividade

| Largura | Layout |
|---|---|
| > 880px | Menu lateral fixo à esquerda (248px) + conteúdo; faixa de semanas à direita do título |
| ≤ 880px | Uma coluna; menu vira o botão "Temas", que abre e fecha a lista; faixa de semanas abaixo do título |
| ≤ 680px | Tabela de alimentos e legenda em blocos empilhados com rótulos; listas de fatos e linha do tempo em uma coluna; paginação empilhada |

Outros comportamentos:
- `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Tamanhos fluidos com `clamp()` nos títulos e espaçamentos.
- Cartões e colunas refluem com `auto-fit` / `minmax`.
- O aviso, a busca e o cabeçalho da tabela continuam fixos no celular; as alturas são recalculadas quando o texto quebra em mais linhas.

## Impressão

Ao imprimir, a página mostra todas as seções em sequência, sem menu, busca nem paginação. O aviso aparece uma vez, no topo.

## Como verificar

Não há testes automatizados no repositório. Verificações sugeridas, sem instalar nada:
- **Lighthouse** (Chrome → DevTools → Lighthouse): acessibilidade, desempenho e boas práticas.
- **Validador W3C** (validator.w3.org): HTML válido.
- Navegação só com teclado (Tab, Shift+Tab, Enter, Esc na busca).
- Leitor de tela: VoiceOver (Mac/iPhone), TalkBack (Android) ou NVDA (Windows).
- Modo de dispositivo do DevTools nas larguras 375px, 680px e 880px.
