# Publicação (GitHub Pages)

[← Voltar ao índice](../README.md)

## O que o GitHub Pages oferece

O GitHub Pages publica arquivos estáticos (HTML, CSS, JavaScript, imagens) diretamente de um repositório. A página foi construída dentro destes limites:

| Disponível | Não disponível |
|---|---|
| Arquivos estáticos servidos como estão | Código no servidor (PHP, Python, banco de dados) |
| HTTPS em `<usuario>.github.io`, com opção "Enforce HTTPS" | Cabeçalhos HTTP personalizados (ex.: Content-Security-Policy) |
| Domínio próprio (arquivo `CNAME` + DNS) | Redirecionamentos e reescrita de URL no servidor |
| `404.html` personalizado na raiz | Formulários com processamento no servidor |
| Compressão das respostas e cache curto (alguns minutos) | Uso principal comercial (loja, SaaS) ou transações sensíveis |

Limites de uso: repositório recomendado até 1 GB, site publicado até 1 GB, tráfego de cerca de 100 GB/mês (limite flexível), até 10 publicações por hora (limite flexível). Esta página tem cerca de 335 KB. No plano gratuito, o repositório precisa ser **público**.

## Publicar

1. Criar um repositório público no GitHub.
2. Enviar para a raiz do repositório: `index.html` e a pasta `recursos/` (opcionalmente `README.md` e `documentacao/`, que não fazem parte do site, mas aparecem no GitHub).
3. Em **Settings → Pages → Build and deployment → Source**, escolher **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salvar.
4. Após 1 ou 2 minutos, o endereço aparece na mesma tela: `https://<usuario>.github.io/<repositorio>/`.
5. Ativar **Enforce HTTPS**.

Arquivos obrigatórios para o site funcionar:

```
index.html
recursos/estilo.css
recursos/pagina.js
recursos/dados/alimentos.js
recursos/dados/fontes.js
```

Opcional: um arquivo vazio `.nojekyll` na raiz faz o GitHub Pages pular o processamento do Jekyll. Não é necessário para esta página (não há arquivos começando com `_`), mas deixa explícito que não há build.

## Testar localmente

- Abrir o `index.html` diretamente (`file://`): funciona, porque os dados são carregados com `<script>`.
- Servidor HTTP, mais próximo do GitHub Pages:
  ```
  python3 -m http.server 8000
  ```
  e acessar `http://localhost:8000`.

## Codificação (acentos)

Todos os arquivos estão em **UTF-8**, sem BOM. O `index.html` declara `<meta charset="utf-8">`. O GitHub Pages envia os arquivos de texto com `charset=utf-8`, e os navegadores usam a codificação do documento para os scripts sem charset declarado, então os acentos aparecem corretamente nas duas situações. Ao editar, salve sempre em UTF-8: outra codificação estraga os acentos de nomes, observações e títulos.

## Cache e atualizações

O GitHub Pages guarda as respostas em cache por alguns minutos. Depois de uma alteração, a versão nova pode demorar um pouco a aparecer; use **Ctrl+F5** (ou Cmd+Shift+R) para forçar o recarregamento. Os arquivos não têm versão no nome (como `estilo.v2.css`); se necessário, um parâmetro na referência (`estilo.css?v=2`) força o navegador a baixar de novo.
