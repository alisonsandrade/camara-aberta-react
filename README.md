# 🏛️ Câmara Aberta React

![Badge de Status do Projeto](https://img.shields.io/badge/status-ativo-brightgreen)
![Badge de Licença](https://img.shields.io/badge/license-MIT-blue)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](LINK_PARA_SEU_CI_CD_BUILD)
[![Versão do Node.js](https://img.shields.io/badge/node->%3D15-green)](https://nodejs.org/)
[![Versão do React](https://img.shields.io/badge/react-necessario-blue)](https://react.dev/)

---

## 🚀 Sobre o Projeto

O **Câmara Aberta React** é um sistema web desenvolvido em JavaScript que visa democratizar o acesso à informação, oferecendo uma interface pública e gratuita para explorar os dados da API de Dados Abertos da Câmara. Nosso objetivo é promover a transparência e a acessibilidade das informações legislativas para todos os cidadãos.

Este projeto foi construído com as seguintes tecnologias principais:

* **Frontend:** React.js
* **Componentes UI:** Material-UI (Mui)
* **Linguagem:** JavaScript

---

## ✨ Funcionalidades

* **Acesso a Dados da Câmara:** Interface intuitiva para consultar informações provenientes da API de Dados Abertos da Câmara.
* **Transparência:** Facilita a visualização e compreensão de dados legislativos.
* **Acessibilidade:** Design responsivo para garantir que a informação seja acessível em diferentes dispositivos.
* **Tecnologia Moderna:** Construído com um stack tecnológico atual e robusto.

---

## 🛠️ Tecnologias Utilizadas

* **React.js** (Framework JavaScript para UI)
* **Material-UI (Mui)** (Biblioteca de componentes React)
* **Node.js** (Runtime JavaScript, versão 15 ou superior)
* **npm** (Gerenciador de pacotes)

---

## 📦 Como Instalar e Rodar o Projeto

Siga os passos abaixo para ter o projeto rodando em sua máquina local:

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 15 ou superior) instalado em seu ambiente. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/alisonsandrade/camara-aberta-react.git](https://github.com/alisonsandrade/camara-aberta-react.git)
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd camara-aberta-react
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

### Rodando o Projeto

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

---
### 📄 Estrutura do Projeto
Abaixo, uma visão geral da estrutura de diretórios e arquivos importantes do projeto:
.
```bash
├── public/                 # Contém arquivos estáticos e o template HTML principal (index.html).
├── src/                    # Diretório principal com o código-fonte da aplicação.
│   ├── assets/             # Armazena imagens, ícones, fontes e outros recursos estáticos.
│   ├── components/         # Componentes React reutilizáveis que compõem a UI.
│   ├── Hooks/              # Hooks do projeto todos centralizados.
│   ├── Pages/              # Define as diferentes "páginas" ou rotas da aplicação.
│   ├── Routes/             # Módulos para inclusão 
│   └── index.js            # Ponto de entrada da aplicação React.
├── Api.js                  # Componentização e centralização das requisições à API.
├── App.js                  # Componente raiz da aplicação, onde as rotas são definidas.
├── .gitignore              # Lista de arquivos e diretórios a serem ignorados pelo Git.
├── package.json            # Define as dependências do projeto e scripts npm.
├── package-lock.json       # Registra a versão exata das dependências.
├── README.md               # Este arquivo de documentação.
└── ...                     # Outros arquivos de configuração (ex: babel.config.js, webpack.config.js, se aplicável).
```

### ⚙️ Configuração (Variáveis de Ambiente)
Para configurar variáveis de ambiente, como URLs de API ou chaves de acesso, crie um arquivo chamado .env na raiz do projeto. Este arquivo deve seguir o formato do .env.example e não deve ser versionado no Git por questões de segurança.

Exemplo de .env:
```bash
# URL base para a API da Câmara
REACT_APP_API_URL=[https://dadosabertos.camara.leg.br/api/v2/](https://dadosabertos.camara.leg.br/api/v2/)
```
As variáveis devem ser prefixadas com REACT_APP_ para serem acessíveis dentro de um projeto React criado com Create React App (ou similar).

### 🤝 Contribuição
Contribuições são muito bem-vindas! Se você tiver ideias, sugestões de melhoria ou quiser reportar um bug, sinta-se à vontade para abrir uma issue ou um pull request.

Para contribuir:
1. Faça um fork do repositório.
2. Crie uma nova branch para sua feature ou correção:
```bash
git checkout -b feature/sua-nova-funcionalidade
# ou
git checkout -b fix/corrige-bug-xpto
```
3. Faça suas alterações e adicione os arquivos modificados:
```bash
git add .
```
4. Faça um commit com uma mensagem clara e descritiva:
```bash
git commit -m 'feat: Adiciona funcionalidade de busca por parlamentares'
# ou
git commit -m 'fix: Corrige erro de carregamento de dados na página inicial'
```
5. Envie suas alterações para a branch remota:
```bash
git push origin feature/sua-nova-funcionalidade
```
6. Abra um Pull Request no GitHub, descrevendo suas alterações.

### 📝 Licença
Este projeto está licenciado sob a Licença MIT. Isso significa que você é livre para usar, modificar e distribuir o código, desde que mantenha a atribuição original. Veja o arquivo LICENSE na raiz do repositório para mais detalhes.

### 📞 Contato
Para dúvidas ou contato profissional:
* **Alison Andrade**
    * [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alisonsandrade)
    * [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alisonsandrade)
    * [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alison.sandrade@hotmail.com)    
    * [![Instagram](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=internetexplorer&logoColor=white)](https://www.instagram.com/alison.andrade.juristec)
