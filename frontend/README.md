# Link do Bem - Frontend

Frontend da plataforma de voluntariado digital Link do Bem, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- React
- React DOM

## Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/link-do-bem.git
cd link-do-bem/frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Executando o Projeto

Para desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Para build de produção:
```bash
npm run build
# ou
yarn build
```

Para executar em produção:
```bash
npm start
# ou
yarn start
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   └── styles/        # Estilos globais
├── public/            # Arquivos estáticos
├── package.json       # Dependências e scripts
├── tsconfig.json      # Configuração do TypeScript
├── tailwind.config.js # Configuração do Tailwind CSS
└── postcss.config.js  # Configuração do PostCSS
```

## Funcionalidades

- Página inicial com apresentação da plataforma
- Sistema de registro e login de usuários
- Listagem de oportunidades de voluntariado
- Filtros por categoria e busca por texto
- Interface responsiva e moderna
- Componentes reutilizáveis

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 