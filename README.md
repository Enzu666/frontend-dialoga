# Dialoga

Plataforma de acompanhamento entre **pacientes** e **profissionais** de saúde mental.
Este guia explica como rodar o projeto completo (banco + back-end + front-end) e como as pastas estão organizadas.

```
 Navegador (React)  ──►  API (Node/Express)  ──►  Banco (MySQL)
 localhost:5173          localhost:8080           localhost:3306
```

---

## 1. O que precisa ter instalado

| Programa | Para quê | Como conferir |
|---|---|---|
| [Node.js](https://nodejs.org) 18 ou mais novo | rodar back e front | `node -v` |
| npm (vem com o Node) | instalar dependências | `npm -v` |
| MySQL 8 (ou MariaDB) | banco de dados | `mysql --version` |

---

## 2. Como rodar (passo a passo)

São 3 partes. Rode **nesta ordem**: banco → back-end → front-end.
O back e o front rodam ao mesmo tempo, cada um no seu terminal.

### 2.1 Banco de dados

1. Abra o MySQL (Workbench ou terminal).
2. Rode o arquivo `script_dialoga.sql` inteiro. Ele **apaga e recria** o banco `db_dialoga`, com todas as tabelas e os 7 dias da semana.
3. (Opcional, recomendado) Rode o `inserts_teste_dialoga.sql` para ter usuários e dados de teste.

Pelo terminal:
```bash
mysql -u root -p < script_dialoga.sql
mysql -u root -p < inserts_teste_dialoga.sql
```

> Atenção: o `script_dialoga.sql` começa com `DROP DATABASE`. Se rodar de novo, todos os dados são perdidos.

### 2.2 Back-end (API)

```bash
cd backend-dialoga
npm install
npm run dev
```

Deve aparecer: `API rodando em http://localhost:8080`.

A conexão com o banco fica em `model/database_config_knex/knexFile.js`. **Ajuste `user` e `password` para os do seu MySQL**, que costumam ser diferentes em cada computador:

```js
connection: {
  host: 'localhost',
  user: 'root',
  password: 'SUA_SENHA_AQUI',
  database: 'db_dialoga',
  port: 3306,
}
```

### 2.3 Front-end

Em **outro terminal**:

```bash
cd frontend-dialoga/Dialoga     # atenção: o package.json fica dentro da pasta Dialoga
npm install
npm run dev
```

Abra **http://localhost:5173**. A tela de login deve aparecer.

Se o back estiver em outro endereço ou porta, crie um arquivo `.env` na raiz do front (ao lado do `package.json`):
```
VITE_API_URL=http://localhost:3000/v1/dialoga
```
Reinicie o `npm run dev` depois de criar ou mudar o `.env`.

---

## 3. Usuários de teste

Depois de rodar o `inserts_teste_dialoga.sql`. **Senha de todos: `123456`**

| Tipo | E-mail | Vai para |
|---|---|---|
| Paciente | `joao.paciente@email.com` | `/paciente/dashboard` |
| Paciente | `maria.paciente@email.com` | `/paciente/dashboard` |
| Profissional | `ana.psi@dialoga.com` | `/profissional/dashboard` |
| Profissional | `carlos.psi@dialoga.com` | `/profissional/dashboard` |
| Administrador | `admin@dialoga.com` | sem tela no front ainda (mostra aviso) |

O tipo de conta é definido pelo campo `nivel` da tabela `tbl_usuario`:

| nivel | Tipo |
|---|---|
| 0 | Administrador |
| 1 | Profissional |
| 2 | Paciente |

Para testar a API sem o front:
```bash
curl -X POST http://localhost:8080/v1/dialoga/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao.paciente@email.com","senha":"123456"}'
```
Resposta esperada: um JSON com `"status": true` e o `token`.

---

## 4. Estrutura do front-end

```
frontend-dialoga/Dialoga/
├── index.html              # página base (fonte Nunito e idioma pt-BR)
├── package.json            # dependências e comandos (npm run dev)
├── vite.config.js          # configuração do Vite
└── src/
    ├── main.jsx            # ponto de entrada: monta o <App /> na página
    ├── App.jsx             # liga o roteador, o contexto de login e as rotas
    ├── index.css           # estilos globais (reset, fonte, cores base)
    │
    ├── assets/             # imagens (logo, ilustrações, ícones)
    │   └── auth/           #   imagens da tela de login
    ├── styles/
    │   └── variebles.css   # TODAS as cores do sistema (variáveis CSS)
    │
    ├── config/
    │   └── api.js          # URL da API (muda por .env)
    ├── services/           # conversa com a API (só fetch, sem tela)
    │   └── authService.js  #   login
    ├── contexts/
    │   └── AuthContext.jsx # quem está logado (token, nivel, id, email)
    ├── hooks/
    │   └── useLoginForm.js # lógica do formulário de login
    ├── utils/              # funções pequenas e reutilizáveis
    │   ├── validators.js   #   validação de campos
    │   └── rotasPorNivel.js#   para qual tela cada tipo de usuário vai
    │
    ├── components/         # peças visuais reutilizáveis em várias telas
    │   ├── Button/         #   botão (primário e contorno)
    │   ├── TextField/      #   campo com label, ícone e erro
    │   ├── Divider/        #   linha com texto ("ou continue com")
    │   ├── GoogleButton/   #   botão "Continuar com Google"
    │   └── Logo/           #   logo do Dialoga
    │
    ├── layouts/            # "moldura" das áreas logadas (menu + conteúdo)
    │   ├── LayoutPaciente/
    │   └── LayoutProfissional/
    │
    ├── routes/
    │   ├── index.jsx       # lista de todas as rotas do site
    │   └── RequireAuth.jsx # protege rotas que exigem login
    │
    └── pages/              # uma pasta por tela
        ├── auth/
        │   ├── Login/      #   tela de login (veja abaixo)
        │   ├── Cadastro/
        │   └── PrimeiroAcesso/
        ├── paciente/       #   Dashboard, Agenda, Tarefas, Tratamentos, ...
        └── profissional/   #   Dashboard, Agenda, Pacientes, Tarefas, ...
```

### Regra de ouro: quem faz o quê

| Camada | Pasta | Responsabilidade | Não deve fazer |
|---|---|---|---|
| Tela | `pages/` | Montar a tela juntando componentes | Chamar a API direto |
| Componente | `components/` | Visual reutilizável | Conhecer regra de negócio |
| Hook | `hooks/` | Lógica e estado de uma tela | Ter HTML/visual |
| Service | `services/` | Falar com a API | Mexer em tela ou estado |
| Contexto | `contexts/` | Guardar dados globais (sessão) | Ter visual |
| Utils | `utils/` | Funções puras pequenas | Depender de React |

### Exemplo: como a tela de Login está dividida

```
pages/auth/Login/
├── index.jsx                    # junta os dois painéis (e redireciona se já logado)
├── Login.css                    # divide a tela em 2 colunas
└── components/
    ├── LoginHero/               # painel esquerdo: frase + ilustração de fundo
    └── LoginForm/               # painel direito: logo, campos, botões e links
```

Fluxo ao clicar em **Entrar**:

```
LoginForm  ──►  useLoginForm (valida)  ──►  AuthContext.login  ──►  authService (POST /auth/login)
                                                  │
                           salva a sessão no localStorage
                                                  │
                      rotaInicialPorNivel  ──►  /paciente/dashboard  ou  /profissional/dashboard
```

### Convenções do projeto

- **Uma pasta por componente/tela**, com `index.jsx` e o `.css` dentro.
- **Cores só em `styles/variebles.css`**, usando `var(--cor-primaria)` etc. Não escreva cor direto no CSS dos componentes.
- Componentes e pastas em `PascalCase` (`LoginForm`); hooks começam com `use` (`useLoginForm`); funções e variáveis em `camelCase`.
- Para trocar uma imagem (logo, ilustração), substitua o arquivo em `assets/` mantendo o mesmo nome.

### Como criar uma nova rota/tela

1. Crie `src/pages/<area>/<Nome>/index.jsx`.
2. Importe e registre em `src/routes/index.jsx`.
3. Se precisar de dados do back, crie a função em `services/` e use dentro de um hook.

---

## 5. Estrutura do back-end

```
backend-dialoga/
├── app.js                  # inicia o servidor, CORS e registra todas as rotas
├── package.json
├── routes/                 # define os endereços (GET/POST/PUT/DELETE) de cada recurso
├── controller/             # regras de negócio e validação (uma pasta por recurso)
│   └── module/             #   mensagens e status padrão (configMessages.js)
├── model/
│   ├── DAO/                # comandos SQL de cada tabela (uma pasta por tabela)
│   ├── database/           # scripts SQL
│   └── database_config_knex/
│       └── knexFile.js     # conexão com o MySQL
├── middleware/
│   └── middlewareJWT.js    # cria e valida o token de login (JWT)
├── services/
│   └── bcrypt.js           # criptografia de senha
└── docs/
    └── dialoga-openapi.yaml# documentação dos endpoints
```

Caminho de uma requisição:

```
routes/  ──►  middleware (JWT)  ──►  controller/  ──►  model/DAO/  ──►  MySQL
(endereço)    (tem token?)           (regras)           (SQL)
```

- Todas as rotas começam com **`/v1/dialoga`** e, exceto o login, exigem o token no cabeçalho `Authorization`.
- Exemplos: `/v1/dialoga/auth/login`, `/v1/dialoga/pacientes`, `/v1/dialoga/consultas`, `/v1/dialoga/disponibilidades`.

---

## 6. Banco de dados (resumo)

| Grupo | Tabelas |
|---|---|
| Contas | `tbl_usuario`, `tbl_administrador`, `tbl_profissional`, `tbl_paciente` |
| Profissional | `tbl_especialidade`, `tbl_profissional_especialidade`, `tbl_administrador_profissional` (aprovação de cadastro) |
| Relação paciente–profissional | `tbl_vinculo`, `tbl_anotacao`, `tbl_solicitacao_acesso`, `tbl_categoria_compartilhada` |
| Agenda | `tbl_consulta`, `tbl_disponibilidade`, `tbl_dias_da_semana`, `tbl_dias_da_semana_disponibilidade` |
| Notificações | `tbl_categoria`, `tbl_notificacao`, `tbl_preferencia_notificacao` |
| Tarefas | `tbl_tarefa`, `tbl_pergunta`, `tbl_opcao_pergunta`, `tbl_tarefa_destinatario`, `tbl_resposta` |
| Saúde | `tbl_registro_humor`, `tbl_tratamento`, `tbl_horario_tratamento`, `tbl_registro_dose` |

Os dias da disponibilidade ficam na tabela `tbl_dias_da_semana` (fixa, 7 linhas) e se ligam à disponibilidade pela tabela intermediária `tbl_dias_da_semana_disponibilidade`.

---

## 7. Problemas comuns

| Mensagem / sintoma | Causa e solução |
|---|---|
| `Could not read package.json` | Você está na pasta errada. No front, entre em `frontend-dialoga/Dialoga`. |
| `Failed to load url /src/main.jsx` ou `Failed to resolve import "./routes"` | A pasta `src` está incompleta (foi substituída em vez de mesclada). Restaure a `src` completa. |
| "Não foi possível conectar ao servidor" na tela de login | O back não está rodando, ou a porta/URL da API está diferente (confira o `.env` do front). |
| "E-mail ou senha incorretos." | Usuário não existe no banco ou a senha está errada. Rode o `inserts_teste_dialoga.sql`. |
| Back dá erro de conexão / `ER_ACCESS_DENIED` | Usuário ou senha do MySQL no `knexFile.js` não conferem com os do seu computador. |
| `ER_BAD_DB_ERROR: Unknown database` | O banco ainda não foi criado. Rode o `script_dialoga.sql`. |
| Erro de CORS no console do navegador (F12) | O back precisa liberar a origem `http://localhost:5173`. |
| Login funciona mas volta para o dashboard sem mostrar o login | A sessão está salva no navegador. Use o botão **Sair** ou rode `localStorage.removeItem('auth')` no console. |
| Mudei o `.env` e nada mudou | Reinicie o `npm run dev` do front. |

---

## 8. Pendências conhecidas

- Login com Google: o botão existe, mas ainda não está integrado (o back espera `POST /auth/login/google/:id_google`).
- Rota `/recuperar-senha` (link "Esqueceu sua senha?") ainda não existe no front. No back, as funções de recuperação de senha estão incompletas.
- Contas de administrador ainda não têm tela no front.
- Segurança do back: o login devolve o `senha_hash` na resposta, e o segredo do JWT está fixo em `middlewareJWT.js`. Ambos devem ir para variáveis de ambiente (`.env`) antes de publicar.
- As páginas de paciente e profissional (exceto o login) ainda são provisórias.
