# 💰 Saffia Fomento Mercantil

Sistema completo de gestão de orçamentos para operações de fomento mercantil, desenvolvido com React, TypeScript e Supabase.

## 📋 Sobre o Projeto

O **Saffia Fomento Mercantil** é uma aplicação web moderna que permite calcular, gerenciar e exportar orçamentos de operações de factoring. O sistema oferece:

- ✅ Cálculo automático de deságios, impostos e taxas
- ✅ Gestão completa de histórico de orçamentos
- ✅ Exportação de resultados em PDF
- ✅ Sistema de autenticação e perfil de usuário
- ✅ Filtros e busca avançada
- ✅ Status personalizáveis (Cancelado, Em Análise, Concluído)
- ✅ Armazenamento permanente na nuvem

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e dev server de alta performance
- **React Router DOM 7.11.0** - Roteamento para aplicações React
- **Styled Components 6.1.19** - CSS-in-JS para estilização
- **React Icons 5.5.0** - Biblioteca de ícones

### Backend & Banco de Dados
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL - Banco de dados relacional
  - Supabase Auth - Autenticação de usuários
  - Row Level Security (RLS) - Segurança de dados
  - API REST automática

### Bibliotecas Adicionais
- **jsPDF 3.0.4** - Geração de PDFs no cliente
- **@supabase/supabase-js 2.39.0** - Cliente JavaScript do Supabase

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **TypeScript ESLint** - Regras específicas para TypeScript

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- Conta no **Supabase** (gratuita)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/sophiacontesini/saffia.git
cd saffia
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-key
```

**Onde encontrar essas informações:**
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 4. Configure o banco de dados

Execute o SQL no Supabase para criar a tabela de orçamentos:

1. Acesse o **SQL Editor** no Supabase Dashboard
2. Execute o seguinte SQL:

```sql
CREATE TABLE IF NOT EXISTS orcamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'Em Análise' CHECK (status IN ('Cancelado', 'Em Análise', 'Concluído')),
  
  valor DECIMAL(15, 2) NOT NULL,
  dias INTEGER NOT NULL,
  desagio_percent DECIMAL(5, 2) NOT NULL,
  
  cedente TEXT,
  tipo_documento_cedente TEXT CHECK (tipo_documento_cedente IN ('CPF', 'CNPJ')),
  documento_cedente TEXT,
  
  sacado TEXT,
  tipo_documento_sacado TEXT CHECK (tipo_documento_sacado IN ('CPF', 'CNPJ')),
  documento_sacado TEXT,
  
  resultado JSONB NOT NULL,
  taxas JSONB NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orcamentos_user_id ON orcamentos(user_id);
CREATE INDEX IF NOT EXISTS idx_orcamentos_data ON orcamentos(data DESC);

ALTER TABLE orcamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orcamentos"
  ON orcamentos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orcamentos"
  ON orcamentos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orcamentos"
  ON orcamentos FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own orcamentos"
  ON orcamentos FOR DELETE
  USING (auth.uid() = user_id);
```

### 5. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
saffia/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── card/           # Componentes de card
│   │   ├── form/           # Formulários
│   │   └── header/         # Cabeçalho da aplicação
│   ├── contexts/           # Context API (Autenticação)
│   ├── lib/                # Configurações (Supabase)
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Orcamentos.tsx
│   │   ├── Historico.tsx
│   │   ├── Login.tsx
│   │   ├── Cadastro.tsx
│   │   └── Perfil.tsx
│   ├── services/           # Serviços de API
│   │   ├── authService.ts
│   │   └── orcamentoService.ts
│   ├── utils/              # Funções utilitárias
│   │   ├── calculations.ts
│   │   ├── history.ts
│   │   ├── masks.ts
│   │   └── pdfExport.ts
│   ├── styles/             # Estilos globais
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── .env                    # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Funcionalidades

### Autenticação
- Cadastro de novos usuários
- Login com email e senha
- Gerenciamento de perfil
- Logout seguro

### Orçamentos
- Cálculo automático de:
  - Deságio mensal
  - TAC (Taxa de Abertura de Crédito)
  - IOF Fixo e Diário
  - Impostos (IRPJ, ISS, CSLL, PIS, COFINS)
  - Valores líquidos para cliente e empresa
- Campos para cedente e sacado
- Suporte a CPF e CNPJ
- Formatação automática de valores

### Histórico
- Visualização de todos os orçamentos salvos
- Filtro por múltiplos campos
- Status personalizáveis (Cancelado, Em Análise, Concluído)
- Expandir/colapsar detalhes
- Exportar para PDF
- Excluir orçamentos

### Exportação
- Geração de PDF com todos os detalhes
- Formatação profissional
- Cálculos completos incluídos

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Visualiza build de produção localmente

# Lint
npm run lint         # Verifica erros de código
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Vercel](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy automático!

Para mais detalhes, consulte o arquivo `GITHUB_VERCEL_SETUP.md`

## 🔒 Segurança

- **Row Level Security (RLS)** habilitado no Supabase
- Cada usuário acessa apenas seus próprios dados
- Autenticação obrigatória para operações sensíveis
- Variáveis de ambiente para credenciais
- Validação de dados no frontend e backend

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase | Sim |
| `VITE_SUPABASE_ANON_KEY` | Chave pública anônima do Supabase | Sim |

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**Sophia Contesini**

- GitHub: [@sophiacontesini](https://github.com/sophiacontesini)
- LinkedIn: [Sophia Contesini](https://www.linkedin.com/in/sophia-contesini/)

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [Vercel](https://vercel.com) - Hospedagem e deploy
- [React](https://react.dev) - Biblioteca JavaScript
- [Vite](https://vitejs.dev) - Build tool

## 📚 Documentação Adicional

- [Guia de Deploy](DEPLOY_GUIDE.md) - Instruções detalhadas de deploy
- [Setup GitHub + Vercel](GITHUB_VERCEL_SETUP.md) - Configuração inicial

---

Desenvolvido com ❤️ usando React, TypeScript e Supabase
