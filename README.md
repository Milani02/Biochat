# 🤖 Biochat - Chatbot Interno Biodinâmica

Este repositório contém o código-fonte do **Biochat**, um assistente inteligente desenvolvido para otimizar a disseminação de informações e a interação interna na empresa Biodinâmica. O principal objetivo do Biochat é fornecer respostas rápidas a perguntas frequentes, abrangendo desde informações sobre sistemas e ramais de contato até diretrizes e documentos internos.

Desenvolvido com **Python** utilizando o framework **Flask** para o backend, o Biochat se integra à **API do OpenRouter** para capacidades avançadas de processamento de linguagem natural (LLM), permitindo interações dinâmicas e contextuais.

## 🚀 Funcionalidades Chave

* **Acesso Rápido ao Conhecimento:** Provisão de respostas instantâneas sobre sites corporativos, sistemas internos (Geosales, WebChamado, Totvs, Dropdesk, Trello), missão, visão e valores da empresa.
* **Consulta de Contatos:** Facilitação do acesso a ramais e e-mails de funcionários, com tratamento seguro de dados confidenciais.
* **Orientação para Documentos:** Direcionamento para a localização de documentos e pastas importantes na intranet.
* **Interação Inteligente:** Utilização de modelo de linguagem avançado para compreender e responder a consultas complexas, mantendo o contexto da conversa.
* **Gerenciamento de Sessão:** Manutenção do histórico de conversas por sessão para uma experiência de usuário fluida e contínua.
* **Interface Web Intuitiva:** Frontend desenvolvido em HTML, CSS e JavaScript, proporcionando uma experiência de usuário amigável.
* **Segurança da Informação:** Implementação de rigorosas práticas de segurança para proteger informações sensíveis da empresa, garantindo que não sejam expostas publicamente.

## 🛠️ Tecnologias Utilizadas

* **Python 3.x:** Linguagem de programação principal.
* **Flask:** Microframework web para a construção da API e do servidor backend.
* **`python-dotenv`:** Biblioteca para o carregamento seguro de variáveis de ambiente.
* **`requests`:** Módulo HTTP para comunicação com APIs externas.
* **OpenRouter API:** Plataforma para acesso a modelos de linguagem, utilizando `openai/gpt-3.5-turbo`.
* **HTML, CSS, JavaScript:** Para a construção da interface do usuário no navegador.

## ⚙️ Configuração do Ambiente de Desenvolvimento

Siga as instruções abaixo para configurar e executar o Biochat em seu ambiente local.

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

* **Python 3.8** ou versão superior.
* **pip** (gerenciador de pacotes do Python), que geralmente é instalado com o Python.

### 1. Clonagem do Repositório

Primeiramente, clone este repositório para o seu ambiente local e navegue até o diretório do projeto:


git clone [https://github.com/milani02/Biochat.git](https://github.com/milani02/Biochat.git)
cd Biochat
Aqui está o README.md completo, pronto para você copiar e colar diretamente no seu arquivo README.md na raiz do seu projeto.

Este README foi elaborado para ser abrangente, profissional e incluir todas as informações essenciais para quem for clonar ou consultar o seu repositório no GitHub, enfatizando as práticas de segurança para dados sensíveis.

Markdown

# 🤖 Biochat - Chatbot Interno Biodinâmica

Este repositório contém o código-fonte do **Biochat**, um assistente inteligente desenvolvido para otimizar a disseminação de informações e a interação interna na empresa Biodinâmica. O principal objetivo do Biochat é fornecer respostas rápidas a perguntas frequentes, abrangendo desde informações sobre sistemas e ramais de contato até diretrizes e documentos internos.

Desenvolvido com **Python** utilizando o framework **Flask** para o backend, o Biochat se integra à **API do OpenRouter** para capacidades avançadas de processamento de linguagem natural (LLM), permitindo interações dinâmicas e contextuais.

## 🚀 Funcionalidades Chave

* **Acesso Rápido ao Conhecimento:** Provisão de respostas instantâneas sobre sites corporativos, sistemas internos (Geosales, WebChamado, Totvs, Dropdesk, Trello), missão, visão e valores da empresa.
* **Consulta de Contatos:** Facilitação do acesso a ramais e e-mails de funcionários, com tratamento seguro de dados confidenciais.
* **Orientação para Documentos:** Direcionamento para a localização de documentos e pastas importantes na intranet.
* **Interação Inteligente:** Utilização de modelo de linguagem avançado para compreender e responder a consultas complexas, mantendo o contexto da conversa.
* **Gerenciamento de Sessão:** Manutenção do histórico de conversas por sessão para uma experiência de usuário fluida e contínua.
* **Interface Web Intuitiva:** Frontend desenvolvido em HTML, CSS e JavaScript, proporcionando uma experiência de usuário amigável.
* **Segurança da Informação:** Implementação de rigorosas práticas de segurança para proteger informações sensíveis da empresa, garantindo que não sejam expostas publicamente.

## 🛠️ Tecnologias Utilizadas

* **Python 3.x:** Linguagem de programação principal.
* **Flask:** Microframework web para a construção da API e do servidor backend.
* **`python-dotenv`:** Biblioteca para o carregamento seguro de variáveis de ambiente.
* **`requests`:** Módulo HTTP para comunicação com APIs externas.
* **OpenRouter API:** Plataforma para acesso a modelos de linguagem, utilizando `openai/gpt-3.5-turbo`.
* **HTML, CSS, JavaScript:** Para a construção da interface do usuário no navegador.

## ⚙️ Configuração do Ambiente de Desenvolvimento

Siga as instruções abaixo para configurar e executar o Biochat em seu ambiente local.

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

* **Python 3.8** ou versão superior.
* **pip** (gerenciador de pacotes do Python), que geralmente é instalado com o Python.

### 1. Clonagem do Repositório

Primeiramente, clone este repositório para o seu ambiente local e navegue até o diretório do projeto:

git clone [https://github.com/milani02/Biochat.git](https://github.com/milani02/Biochat.git)

### 2. Criação e Ativação do Ambiente Virtual

É uma prática recomendada utilizar um ambiente virtual para isolar as dependências do projeto, evitando conflitos com outras instalações Python em seu sistema.

python -m venv venv
# Para ativar o ambiente virtual no Windows:
.\venv\Scripts\activate
# Para ativar o ambiente virtual no macOS/Linux:
source venv/bin/activate

### 3. Instalação das Dependências

Com o ambiente virtual ativado, instale as bibliotecas Python necessárias listadas no requirements.txt. Se este arquivo não existir, você pode criá-lo após instalar as bibliotecas essenciais (Flask, python-dotenv, requests) e usar pip freeze > requirements.txt.

pip install Flask python-dotenv requests
# Ou, se você tiver um requirements.txt:
# pip install -r requirements.txt

### 4. Configuração de Variáveis de Ambiente e Conhecimento da Empresa

Este projeto depende de informações sensíveis que NÃO SÃO E NÃO DEVEM SER versionadas no controle de código-fonte por motivos de segurança.

Variáveis de Ambiente (.env):

Crie um arquivo chamado .env na raiz do seu projeto (no mesmo nível do app.py). Este arquivo é explicitamente ignorado pelo .gitignore.

Preencha-o com suas chaves de API reais, seguindo o exemplo abaixo (valores entre < > devem ser substituídos):

Snippet de código

FLASK_SECRET_KEY=<SUA_CHAVE_SECRETA_FLASK_AQUI>
OPENROUTER_API_KEY=<SUA_CHAVE_API_OPENROUTER_AQUI>
Consulte o arquivo .env.example (versionado no Git) para verificar quais variáveis são esperadas pelo sistema.

Base de Conhecimento da Empresa (conhecimento_empresa.py):

O arquivo conhecimento_empresa.py contém dados confidenciais da Biodinâmica, como URLs de intranet, informações de ramais e e-mails internos. Por essa razão, este arquivo NÃO É VERSIONADO neste repositório Git.
Para que o chatbot funcione corretamente em seu ambiente local, você precisará obter uma cópia atualizada deste arquivo com a equipe responsável (ex: TI) e colocá-lo na raiz do projeto (na mesma pasta que app.py).

### 5. Execução da Aplicação

Após configurar o ambiente virtual e os arquivos de dados sensíveis, você pode iniciar a aplicação Flask:
python app.py

O Biochat estará acessível via navegador web no endereço http://127.0.0.1:5000.

## ⚖️ Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.