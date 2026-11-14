# Do computador ao site: o ciclo de vida de uma alteração

[← Voltar ao README](../README.md)

Este guia explica o caminho que uma alteração percorre: desde o momento em que alguém muda o `index.html` no próprio computador até a mudança aparecer no site publicado, em `https://savioslf-stack.github.io/aliementacao_gestante/`.

Não é preciso saber nada de Git nem de GitHub para acompanhar. O guia vai do geral para o específico:

- a **Parte 1** apresenta as ideias principais (Git, GitHub, commit, branch, pull request, merge, GitHub Pages) e como elas se ligam;
- a **Parte 2** mostra o que preparar no computador, uma vez só;
- a **Parte 3** percorre o ciclo completo de uma alteração, passo a passo, com os comandos;
- a **Parte 4** explica o que o GitHub faz, por dentro, para publicar o site;
- a **Parte 5** é um resumo para consulta rápida.

> **Este repositório não usa o Jekyll, de propósito.** O GitHub Pages pode passar os arquivos de um site por um programa chamado Jekyll, que monta páginas a partir de modelos. Este site não precisa disso: ele já está pronto (`index.html` e `estilo.css`). Por isso, o repositório tem na raiz um arquivo **vazio** chamado `.nojekyll`, que desliga o Jekyll. Com ele, o GitHub publica os arquivos **exatamente como estão** no repositório. Não apague esse arquivo.

## Sumário

- [O ciclo em uma imagem](#o-ciclo-em-uma-imagem)
- [Parte 1. As ideias principais](#parte-1-as-ideias-principais)
- [Parte 2. Preparação (uma vez só)](#parte-2-preparação-uma-vez-só)
- [Parte 3. O ciclo de uma alteração, passo a passo](#parte-3-o-ciclo-de-uma-alteração-passo-a-passo)
- [Parte 4. Como o GitHub publica o site, por dentro](#parte-4-como-o-github-publica-o-site-por-dentro)
- [Parte 5. Resumo para consulta rápida](#parte-5-resumo-para-consulta-rápida)

---

## O ciclo em uma imagem

```
  NO SEU COMPUTADOR                     NO GITHUB (site github.com)              NA INTERNET
 ───────────────────                   ─────────────────────────────            ─────────────

 1. criar uma branch
        │
 2. editar os arquivos
        │
 3. commit (salvar uma "foto")
        │
 4. push (enviar) ───────────────────▶ 5. abrir um pull request
                                               │
                                        6. revisão e aprovação
                                               │
                                        7. merge na branch main
                                               │
                                        8. GitHub Pages publica o site ───────▶ 9. site atualizado
```

Os passos 1 a 4 acontecem no seu computador, com comandos no terminal. Os passos 5 a 7 acontecem no site do GitHub, clicando em botões. Os passos 8 e 9 acontecem **sozinhos**: ninguém precisa fazer nada.

---

## Parte 1. As ideias principais

### 1.1 O que é Git

Git é um programa de **controle de versões**: ele guarda o **histórico** de um projeto. Cada vez que você decide "esta versão está boa", o Git tira uma "foto" de todos os arquivos e guarda junto com uma explicação do que mudou.

Sem Git, é comum ver pastas assim:

```
index.html
index-versao2.html
index-versao2-corrigido.html
index-FINAL.html
index-FINAL-agora-vai.html
```

Com Git, existe **um** `index.html`, e o histórico fica guardado à parte. Dá para ver o que mudou em cada versão, quem mudou, quando, e voltar a qualquer versão antiga.

O Git funciona **no seu computador**, mesmo sem internet.

### 1.2 O que é GitHub

GitHub é um **site** (github.com) que guarda projetos que usam Git, na internet. Ele acrescenta ao Git:

- uma **cópia on-line** do projeto, que serve de "ponto de encontro" para várias pessoas trabalharem juntas;
- uma página para **revisar** as alterações antes de aceitá-las (os *pull requests*);
- o **GitHub Pages**, um serviço que publica sites a partir dos arquivos do projeto.

Resumindo: **Git** é a ferramenta que guarda o histórico; **GitHub** é o lugar on-line onde o projeto fica e onde as pessoas colaboram. Um é como o programa de edição de texto; o outro, como uma pasta compartilhada na nuvem.

### 1.3 Repositório

**Repositório** (ou *repo*) é o nome que o Git dá a um projeto: a pasta com os arquivos **mais** todo o histórico. O repositório deste site se chama `aliementacao_gestante` e fica em `https://github.com/savioslf-stack/aliementacao_gestante`.

Existem duas cópias do mesmo repositório:

| Cópia | Onde fica | Nome usado pelo Git |
|---|---|---|
| **Local** | No seu computador. É onde você edita | – |
| **Remota** | No GitHub. É a cópia "oficial", que todos usam | `origin` |

As duas não se atualizam sozinhas. Você **envia** as suas mudanças para o GitHub (*push*) e **busca** as mudanças dos outros (*pull*).

O histórico fica numa pasta escondida chamada `.git`, dentro da pasta do projeto. Não mexa nela.

### 1.4 Commit: uma "foto" do projeto

Um **commit** é uma versão salva do projeto. Cada commit guarda:

- **o que mudou** em cada arquivo, em relação ao commit anterior;
- uma **mensagem** escrita por você, explicando a mudança ("Corrige texto sobre enjoo");
- **quem** fez e **quando**;
- um **código único**, como `3f9a2c1`, que identifica aquele commit.

Pense nos commits como os pontos de salvamento de um jogo: se algo der errado, dá para voltar ao último ponto bom. Os commits formam uma fila, do mais antigo para o mais novo:

```
commit A ──▶ commit B ──▶ commit C          (cada um é uma versão do projeto)
"Primeira     "Adiciona     "Corrige
 versão"       vacinas"      texto"
```

### 1.5 Branch: uma linha de trabalho separada

Uma **branch** ("ramo") é uma **linha de trabalho paralela**. Ela começa igual à versão principal, mas as mudanças feitas nela não afetam a versão principal até você decidir juntá-las.

A branch principal se chama **`main`**. Neste projeto, ela tem um papel especial: **o que está na `main` é o que está publicado no site**. Por isso, ninguém edita a `main` diretamente. Cada alteração é feita numa branch própria:

```
main:            A ──▶ B ──────────────────────▶ D   (D = merge: a alteração entrou)
                        \                       ▲
corrige-texto:           └──▶ C1 ──▶ C2 ────────┘    (o trabalho é feito aqui)
```

Enquanto você trabalha em `corrige-texto`, o site continua mostrando a versão B, sem riscos. Se a ideia não der certo, basta abandonar a branch.

### 1.6 Pull request: um pedido para juntar as mudanças

Um **pull request** (ou **PR**) é um **pedido**, feito no site do GitHub, para juntar as mudanças de uma branch na `main`. Ele é uma página que mostra:

- **o que mudou**, linha por linha: o que foi apagado aparece em vermelho e o que foi incluído, em verde;
- uma **descrição** escrita por quem pediu (o que mudou e por quê);
- uma **conversa**, onde outras pessoas podem comentar, fazer perguntas e sugerir correções.

O nome em inglês quer dizer "pedido para puxar": você está pedindo que a `main` "puxe" as suas mudanças.

### 1.7 Revisão e aprovação

**Revisar** é outra pessoa ler as mudanças do PR antes de elas entrarem no site. Ao terminar, a pessoa escolhe uma de três respostas:

| Resposta | Quer dizer |
|---|---|
| **Comment** (comentar) | "Tenho comentários, mas não estou aprovando nem recusando." |
| **Approve** (aprovar) | "Está bom, pode juntar." |
| **Request changes** (pedir mudanças) | "Precisa corrigir algo antes de juntar." |

Duas regras do GitHub:

- **Quem abriu o PR não pode aprovar o próprio PR.** A aprovação precisa vir de outra pessoa (por exemplo, um colega ou o professor).
- A aprovação só é **obrigatória** se o repositório estiver configurado assim (ver [seção 2.6](#26-opcional-exigir-aprovação-antes-do-merge)). Sem essa configuração, o dono do repositório consegue juntar o PR mesmo sem aprovação. Revisar continua sendo uma boa prática: outra pessoa vê erros que quem escreveu não percebe.

### 1.8 Merge: juntar as mudanças

**Merge** ("mesclar") é o momento em que as mudanças da branch **entram de fato** na `main`. No GitHub, é um botão no PR: **Merge pull request**. Depois do merge, a `main` tem a alteração, e o PR aparece como **Merged** (roxo).

### 1.9 GitHub Pages: o site publicado

**GitHub Pages** é o serviço do GitHub que transforma os arquivos de um repositório num **site público**. Neste projeto, ele foi configurado para publicar a branch `main`. Assim, toda vez que a `main` muda (por exemplo, depois de um merge), o GitHub **publica o site de novo, sozinho**. Como isso funciona por dentro está na [Parte 4](#parte-4-como-o-github-publica-o-site-por-dentro).

### 1.10 Como tudo se liga

| Ideia | Em uma frase | Onde acontece |
|---|---|---|
| Repositório | O projeto com todo o histórico | No computador e no GitHub |
| Branch | Uma linha de trabalho separada da `main` | No computador (e depois no GitHub) |
| Commit | Uma "foto" salva das mudanças, com mensagem | No computador |
| Push | Enviar os commits para o GitHub | Do computador para o GitHub |
| Pull request | Pedido para juntar a branch na `main` | No GitHub |
| Revisão | Outra pessoa confere e aprova | No GitHub |
| Merge | As mudanças entram na `main` | No GitHub |
| GitHub Pages | Publica a `main` como site | No GitHub, sozinho |

---

## Parte 2. Preparação (uma vez só)

Estes passos só precisam ser feitos **uma vez** em cada computador.

### 2.1 O terminal

O **terminal** é uma janela onde você conversa com o computador escrevendo **comandos**, em vez de clicar. Você escreve um comando, aperta **Enter**, e o computador responde com texto.

| Sistema | Como abrir |
|---|---|
| Windows | Depois de instalar o Git (próximo passo): menu Iniciar → **Git Bash** |
| Mac | Spotlight (Cmd + Espaço) → digite **Terminal** |
| Linux | Procure **Terminal** nos aplicativos |

O Visual Studio Code também tem um terminal: menu **Terminal → New Terminal**. Ele já abre na pasta do projeto, o que facilita.

Dois comandos básicos, que não são do Git mas são usados o tempo todo:

| Comando | O que faz |
|---|---|
| `cd nome-da-pasta` | Entra numa pasta (*change directory*, "mudar de pasta") |
| `cd ..` | Volta para a pasta de cima |

Nos exemplos deste guia, o texto depois de `#` é um comentário: explica o comando e não precisa ser digitado.

### 2.2 Instalar o Git

- **Windows:** baixe o instalador em `https://git-scm.com` e instale com as opções padrão. Ele instala também o **Git Bash** (o terminal) e o **Git Credential Manager** (que cuida do login no GitHub).
- **Mac:** no Terminal, digite `git --version`. Se o Git não estiver instalado, o Mac oferece instalar (as "ferramentas de linha de comando"). Aceite.
- **Linux:** instale pelo gerenciador de pacotes (por exemplo, `sudo apt install git`).

Para conferir se deu certo:

```
git --version            # deve responder algo como: git version 2.47.0
```

### 2.3 Dizer ao Git quem é você

Todo commit leva o nome e o e-mail de quem o fez. Configure os seus (use o **mesmo e-mail da sua conta do GitHub**):

```
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

`--global` quer dizer "para todos os projetos deste computador".

### 2.4 Ter permissão no repositório

Para enviar branches para o repositório, a sua conta do GitHub precisa ser **colaboradora** dele. O dono do repositório adiciona em **Settings → Collaborators → Add people**. Você recebe um convite por e-mail e precisa aceitá-lo.

### 2.5 Baixar o repositório (clone)

**Clonar** é baixar uma cópia completa do repositório (arquivos + histórico) para o seu computador. Entre, no terminal, na pasta onde quer guardar o projeto e digite:

```
git clone https://github.com/savioslf-stack/aliementacao_gestante.git
cd aliementacao_gestante
```

O primeiro comando cria a pasta `aliementacao_gestante` com tudo dentro; o segundo entra nela. **Todos os comandos `git` da Parte 3 são digitados dentro dessa pasta.**

Atenção: baixar o projeto pelo botão **Code → Download ZIP** do GitHub **não** serve para este ciclo. O ZIP traz só os arquivos, sem o histórico e sem a ligação com o GitHub, e nele os comandos `git` não funcionam.

**Login no GitHub:** na primeira vez que você enviar algo (Passo 7 da Parte 3), o Git pede para entrar na sua conta. No Windows, abre uma janela do navegador para você fazer login. No Mac e no Linux, o terminal pode pedir usuário e senha. **A senha normal da conta não funciona aqui**: o GitHub exige um *token*, uma senha especial criada em **Settings (da sua conta) → Developer settings → Personal access tokens**. Ao criar o token, guarde-o num lugar seguro: ele só aparece uma vez.

### 2.6 (Opcional) Exigir aprovação antes do merge

Para que **nenhuma** alteração entre na `main` sem a aprovação de outra pessoa, o dono do repositório pode criar uma regra:

1. **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.
2. Dar um nome (por exemplo, "Proteger main"), mudar **Enforcement status** para **Active** e, em **Target branches**, incluir a branch padrão (`main`).
3. Marcar **Require a pull request before merging** e escolher **1** em **Required approvals**.
4. Salvar.

Com essa regra, o botão de merge fica bloqueado até alguém aprovar o PR. Sem ela, a aprovação é só uma recomendação.

---

## Parte 3. O ciclo de uma alteração, passo a passo

Para tornar tudo concreto, esta parte segue um **exemplo**: corrigir um texto da seção "Para o enjoo", no primeiro trimestre.

### Passo 1. Atualizar a sua cópia da `main`

Antes de começar, traga para o seu computador as mudanças que outras pessoas já juntaram na `main`:

```
git switch main          # vai para a branch main
git pull                 # busca no GitHub as novidades da main
```

- `git switch` troca de branch (*switch*, "trocar"). Os arquivos da pasta passam a ser os daquela branch.
- `git pull` (*puxar*) baixa os commits novos do GitHub e atualiza os arquivos.

Assim, você começa a partir da versão mais recente do site.

### Passo 2. Criar uma branch para a alteração

```
git switch -c corrige-texto-enjoo
```

`-c` quer dizer "criar" (*create*): cria a branch `corrige-texto-enjoo`, a partir de onde você está (a `main` atualizada), e já entra nela.

Dicas para o nome da branch:

- descreva a alteração: `corrige-texto-enjoo`, `inclui-alimento-cupuacu`, `atualiza-vacinas`;
- use só letras minúsculas, números e hífens: **sem espaços e sem acentos**.

Para conferir em qual branch você está: `git branch`. A branch atual aparece com um `*` na frente.

### Passo 3. Editar e testar

Edite os arquivos normalmente, no seu editor (por exemplo, o Visual Studio Code), e salve. No exemplo, o texto do enjoo, dentro do `index.html`.

Depois, **teste**: abra o `index.html` no navegador (dois cliques no arquivo) e confira se tudo aparece como esperado. Teste também na largura de celular (no Chrome: F12 e o ícone de celular).

Nada foi enviado para lugar nenhum ainda: as mudanças estão só no seu computador.

### Passo 4. Conferir o que mudou

```
git status
```

Mostra a branch atual e a lista de arquivos alterados. Arquivos alterados aparecem em vermelho, com a palavra `modified` ("modificado"). Por exemplo:

```
On branch corrige-texto-enjoo
Changes not staged for commit:
        modified:   index.html
```

Para ver **exatamente** o que mudou, linha por linha:

```
git diff
```

Linhas começando com `-` (vermelho) foram apagadas; com `+` (verde), incluídas. Se a lista for longa, use as setas para rolar e a tecla **q** para sair.

### Passo 5. Escolher o que vai no commit (`git add`)

Antes de tirar a "foto", você diz ao Git **quais** mudanças entram nela:

```
git add index.html
```

Pense numa caixa de mudança: `git add` coloca as coisas **dentro da caixa**; o commit (próximo passo) **fecha e etiqueta** a caixa. Essa "caixa aberta" se chama **área de preparação** (*staging area*).

- Para incluir vários arquivos: `git add index.html estilo.css`.
- Para incluir **todos** os arquivos alterados: `git add .` (o ponto quer dizer "tudo nesta pasta"). Use com cuidado: confira antes com `git status` se não há arquivos que não deveriam entrar.

Rodando `git status` de novo, os arquivos preparados aparecem em verde, em `Changes to be committed`.

### Passo 6. Salvar a versão (`git commit`)

```
git commit -m "Corrige texto sobre enjoo no primeiro trimestre"
```

`-m` vem de *message* ("mensagem"). A mensagem fica para sempre no histórico, então ela deve dizer **o que** a mudança faz:

| Mensagem boa | Mensagem ruim |
|---|---|
| `Corrige texto sobre enjoo no primeiro trimestre` | `alterações` |
| `Inclui cupuaçu na consulta de alimentos` | `ajustes` |
| `Atualiza tabela de vacinas (fonte 7, p. 39)` | `asdf` |

Uma boa regra: complete a frase "Este commit…" ("Este commit **corrige o texto sobre enjoo**").

Você pode fazer **vários commits** na mesma branch, um para cada parte do trabalho. Basta repetir os passos 3 a 6.

### Passo 7. Enviar para o GitHub (`git push`)

Até aqui, os commits só existem no seu computador. Para enviá-los:

```
git push -u origin corrige-texto-enjoo
```

- `push` ("empurrar"): envia os commits.
- `origin`: o nome da cópia remota, no GitHub (ver [seção 1.3](#13-repositório)).
- `corrige-texto-enjoo`: a branch a enviar.
- `-u`: "lembre esta ligação". Só é preciso na **primeira** vez de cada branch. Dali em diante, dentro dela, basta `git push`.

Se for a sua primeira vez, é aqui que o Git pede o login (ver [seção 2.5](#25-baixar-o-repositório-clone)).

**O site não muda com isso.** A branch foi para o GitHub, mas o site publica só a `main`.

### Passo 8. Abrir o pull request

1. Abra `https://github.com/savioslf-stack/aliementacao_gestante` no navegador.
2. Logo depois de um push, aparece uma faixa amarela com o nome da sua branch e o botão **Compare & pull request**. Clique nele.
   (Se a faixa não aparecer: aba **Pull requests → New pull request**, e escolha a sua branch.)
3. Confira, no topo, a direção do pedido: **base: `main`** ← **compare: `corrige-texto-enjoo`**. Quer dizer: "juntar `corrige-texto-enjoo` **na** `main`".
4. Escreva um **título** (pode ser igual à mensagem do commit) e uma **descrição**: o que mudou, por quê e, se for informação de saúde, qual fonte foi usada.
5. Na coluna da direita, em **Reviewers**, escolha quem vai revisar.
6. Clique em **Create pull request**.

O PR fica com a etiqueta **Open** (verde). Ele tem quatro abas:

| Aba | O que mostra |
|---|---|
| **Conversation** | A descrição, os comentários e o resultado das revisões |
| **Commits** | A lista de commits da branch |
| **Checks** | Verificações automáticas, quando existem |
| **Files changed** | As mudanças, linha por linha: vermelho = apagado, verde = incluído |

### Passo 9. Revisão e aprovação

**Para quem revisa:**

1. Abra o PR e vá na aba **Files changed**.
2. Leia as mudanças. Para comentar uma linha específica, passe o mouse sobre ela e clique no **+** azul que aparece à esquerda.
3. Clique em **Review changes** (no topo, à direita).
4. Escreva um resumo, escolha **Comment**, **Approve** ou **Request changes** (ver [seção 1.7](#17-revisão-e-aprovação)) e clique em **Submit review**.

**Para quem abriu o PR, se pedirem correções:** não é preciso abrir outro PR. Continue **na mesma branch**: edite, faça `git add`, `git commit` e `git push` (passos 3 a 7, agora só com `git push`). Os commits novos **aparecem sozinhos** no mesmo PR, e quem revisa pode olhar de novo.

### Passo 10. Merge

Com o PR aprovado:

1. No fim da aba **Conversation**, clique em **Merge pull request** e depois em **Confirm merge**.
2. O PR muda para **Merged** (roxo). A alteração agora está na `main`.
3. O GitHub oferece o botão **Delete branch**. Pode clicar: a branch já cumpriu o seu papel, e o histórico das mudanças continua guardado na `main`.

O botão de merge tem uma setinha com três opções. A padrão, **Create a merge commit**, junta os commits da branch como estão, e é a recomendada aqui. (**Squash and merge** junta todos os commits da branch em um só; **Rebase and merge** os copia um a um para a `main`.)

**É neste momento que a publicação começa.** O merge muda a `main`, e o GitHub Pages percebe isso sozinho (Parte 4).

### Passo 11. Atualizar o seu computador

O merge aconteceu no GitHub; o seu computador ainda não sabe. Para terminar o ciclo:

```
git switch main                       # volta para a main
git pull                              # traz a main atualizada, já com o merge
git branch -d corrige-texto-enjoo     # apaga a branch local, que não é mais necessária
```

`-d` vem de *delete* ("apagar"). O Git só apaga uma branch cujas mudanças já estão na `main`: se não estiverem, ele avisa e não apaga.

Pronto: para a próxima alteração, comece de novo pelo Passo 1.

---

## Parte 4. Como o GitHub publica o site, por dentro

Depois do merge, ninguém precisa fazer mais nada: o site se atualiza sozinho em alguns minutos. Esta parte explica o que acontece nesse meio-tempo.

### 4.1 O que é um site estático

Existem dois tipos de site:

| Tipo | Como funciona | Exemplos |
|---|---|---|
| **Dinâmico** | A cada visita, um programa no servidor **monta** a página na hora (consulta um banco de dados, verifica o login…) | Lojas, redes sociais, bancos |
| **Estático** | O servidor só **entrega arquivos prontos**, iguais para todos os visitantes. Nada é calculado na hora | Este site |

O GitHub Pages só hospeda sites **estáticos**. Ele não roda programas no servidor, não tem banco de dados e não processa formulários. Este site cabe perfeitamente nisso: são só dois arquivos prontos, `index.html` e `estilo.css`.

### 4.2 A configuração (feita uma vez)

A publicação foi ligada no repositório em **Settings → Pages**, na parte **Build and deployment**:

| Opção | Valor escolhido | Quer dizer |
|---|---|---|
| **Source** | Deploy from a branch | Publicar a partir de uma branch |
| **Branch** | `main` | Qual branch publicar |
| **Folder** | `/ (root)` | Qual pasta: a raiz, onde está o `index.html` |

Essa configuração diz ao GitHub: "sempre que a `main` mudar, publique o que estiver na raiz dela". Ela não precisa ser feita de novo.

Por que a branch `main` e a pasta raiz? Porque o navegador, ao abrir o endereço do site, procura um arquivo chamado `index.html` **na raiz**. É o "arquivo de entrada" de qualquer site. Por isso o nome do arquivo não pode mudar.

### 4.3 A publicação: o que o GitHub faz, passo a passo

Cada vez que a `main` recebe commits novos (um merge conta como um commit novo), o GitHub inicia um **processo automático**. Ele usa o **GitHub Actions**, um serviço do GitHub que executa tarefas sozinho: ele liga um computador temporário nos servidores do GitHub, segue uma "receita" de passos e, no fim, desliga esse computador. Essa receita se chama **workflow**, e a que publica o site aparece com o nome **pages build and deployment** (é o nome padrão, o mesmo em todos os sites do GitHub Pages).

O workflow tem três etapas:

```
 main mudou
     │
     ▼
 1. COPIAR       o computador temporário baixa os arquivos da main
     │
     ▼
 2. EMPACOTAR    os arquivos viram um pacote (o "artefato")
     │
     ▼
 3. PUBLICAR     o pacote é copiado para os servidores do GitHub Pages
     │
     ▼
 site atualizado
```

**1. Copiar** (*checkout*). O computador temporário baixa os arquivos da `main`, exatamente como estão depois do merge.

**2. Empacotar** (*upload artifact*). Os arquivos copiados são compactados num único arquivo, chamado **artefato**. É como fechar uma caixa com tudo o que vai ser publicado. Nada é alterado: o `index.html` e o `estilo.css` que vão para o site são os mesmos do repositório.

**3. Publicar** (*deploy*). O artefato é copiado para os **servidores do GitHub Pages**, que passam a entregar a versão nova, no lugar da anterior, para quem visitar o site.

Os outros arquivos do repositório também vão para o servidor, como estão. Por exemplo, este guia pode ser aberto em `.../aliementacao_gestante/documentacao/ciclo-de-vida.md` (como texto simples). Isso não atrapalha o site: quem visita o endereço principal recebe o `index.html`.

### 4.4 Acompanhar a publicação

No repositório, aba **Actions**, cada publicação aparece como uma linha **pages build and deployment**, com um símbolo:

| Símbolo | Quer dizer |
|---|---|
| Círculo amarelo (girando) | Em andamento |
| ✓ verde | Publicado com sucesso |
| ✗ vermelho | Falhou. Clique na linha para ver o passo que falhou e a mensagem de erro |

Em **Settings → Pages** também aparece a frase **"Your site is live at …"** ("seu site está no ar em…"), com o endereço e a data da última publicação.

Se uma publicação falhar por um problema passageiro do GitHub, é possível tentar de novo: abra a linha com ✗ e clique em **Re-run jobs** ("executar de novo").

### 4.5 O endereço do site

O endereço segue sempre o mesmo modelo:

```
https://  savioslf-stack  .github.io  /aliementacao_gestante/
          └─ dono do ─┘   └─ domínio   └──── nome do ──────┘
             repositório    do GitHub         repositório
```

O `https` (o "cadeado" na barra do navegador) vem incluído: a conexão com o site é protegida, sem nenhuma configuração.

### 4.6 Quanto tempo leva

- O workflow costuma levar **um ou dois minutos**. Segundo o GitHub, pode levar **até 10 minutos** para uma mudança aparecer.
- Mesmo depois de publicado, o navegador (e os servidores do caminho) podem continuar mostrando a versão antiga **por alguns minutos**, porque guardam uma cópia para abrir mais rápido. Isso se chama **cache**.
- Para forçar o navegador a buscar a versão nova: **Ctrl + F5** (no Mac, **Cmd + Shift + R**).

### 4.7 Se o site publicado ficou errado

Como cada versão está guardada no histórico, desfazer é simples. Abra o PR que causou o problema (aba **Pull requests → Closed**) e clique em **Revert**. O GitHub cria um **novo PR** que desfaz exatamente aquelas mudanças. Faça o merge dele, e o site volta a ser como era, pelo mesmo caminho da Parte 4.

### 4.8 Regras e limites do GitHub Pages

- No plano gratuito do GitHub, o repositório precisa ser **público** para usar o GitHub Pages. Mesmo quando o repositório é privado (em planos pagos), o **site** é sempre público: qualquer pessoa na internet pode abri-lo.
- O site publicado pode ter até **1 GB** (este tem cerca de 300 KB).
- Cada publicação pode levar no máximo **10 minutos**; depois disso, ela é cancelada.
- Limites "flexíveis" (o GitHub avisa antes de bloquear): cerca de **100 GB de visitas por mês** e **10 publicações por hora**.
- O GitHub Pages não pode ser usado como site comercial (loja, venda de serviços) nem para enviar dados sensíveis, como senhas e cartões de crédito.

---

## Parte 5. Resumo para consulta rápida

### O ciclo completo

| Passo | Onde | Comando ou ação |
|---|---|---|
| 1. Atualizar a `main` | Terminal | `git switch main` e `git pull` |
| 2. Criar a branch | Terminal | `git switch -c nome-da-branch` |
| 3. Editar e testar | Editor e navegador | Salvar e abrir o `index.html` |
| 4. Conferir | Terminal | `git status` e `git diff` |
| 5. Preparar | Terminal | `git add arquivo` |
| 6. Commit | Terminal | `git commit -m "mensagem"` |
| 7. Enviar | Terminal | `git push -u origin nome-da-branch` (depois, só `git push`) |
| 8. Abrir o PR | GitHub | **Compare & pull request** → **Create pull request** |
| 9. Revisão | GitHub | **Files changed** → **Review changes** → **Approve** |
| 10. Merge | GitHub | **Merge pull request** → **Confirm merge** → **Delete branch** |
| 11. Limpar | Terminal | `git switch main`, `git pull`, `git branch -d nome-da-branch` |
| Publicação | GitHub, sozinho | Acompanhar na aba **Actions** |

### Todos os comandos

| Comando | O que faz |
|---|---|
| `git --version` | Mostra a versão do Git (para conferir a instalação) |
| `git config --global user.name "…"` | Define o seu nome nos commits |
| `git config --global user.email "…"` | Define o seu e-mail nos commits |
| `git clone endereço` | Baixa o repositório para o computador |
| `git switch nome` | Troca de branch |
| `git switch -c nome` | Cria uma branch e troca para ela |
| `git branch` | Lista as branches; a atual tem `*` |
| `git branch -d nome` | Apaga uma branch local já juntada na `main` |
| `git pull` | Traz as novidades do GitHub |
| `git status` | Mostra a branch atual e os arquivos alterados |
| `git diff` | Mostra as mudanças, linha por linha |
| `git add arquivo` | Coloca um arquivo no próximo commit |
| `git commit -m "mensagem"` | Salva uma versão, com mensagem |
| `git push` | Envia os commits para o GitHub |
| `git log --oneline` | Mostra o histórico de commits, um por linha (tecla **q** para sair) |

### Glossário

| Termo | Significado |
|---|---|
| **Artefato** | O pacote com os arquivos do site, criado durante a publicação |
| **Branch** | Uma linha de trabalho separada; a principal é a `main` |
| **Cache** | Cópia guardada pelo navegador para abrir a página mais rápido |
| **Clone** | Uma cópia completa do repositório no seu computador |
| **Commit** | Uma versão salva do projeto, com mensagem, autor e data |
| **Deploy** | Publicar: colocar a versão nova no ar |
| **Git** | Programa que guarda o histórico do projeto |
| **GitHub** | Site que guarda repositórios on-line e permite colaborar |
| **GitHub Actions** | Serviço do GitHub que executa tarefas automáticas (workflows) |
| **GitHub Pages** | Serviço do GitHub que publica sites estáticos |
| **`main`** | A branch principal; neste projeto, é a versão publicada |
| **Merge** | Juntar as mudanças de uma branch em outra |
| **`origin`** | O nome da cópia do repositório que fica no GitHub |
| **Pull** | Trazer as mudanças do GitHub para o computador |
| **Pull request (PR)** | Pedido, no GitHub, para juntar uma branch na `main` |
| **Push** | Enviar os commits do computador para o GitHub |
| **Repositório** | O projeto: os arquivos mais todo o histórico |
| **Review** | Revisão das mudanças de um PR por outra pessoa |
| **Site estático** | Site feito só de arquivos prontos, iguais para todos |
| **Staging area** | "Área de preparação": o que vai entrar no próximo commit |
| **Token** | Senha especial usada pelo Git para entrar no GitHub |
| **Workflow** | Receita de passos automáticos executada pelo GitHub Actions |
