# Chatbot

## Instalar Anaconda
[Download do Instalador do Anaconda](https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Windows-x86_64.exe)

* Na seção **Variáveis do sistema**, procure por **Path** e clique em **Editar**
* Clique em **Novo** e adicione os caminhos da instalação do **Anaconda**

```shell
C:\ProgramData\Anaconda3
C:\ProgramData\Anaconda3\Scripts
C:\ProgramData\Anaconda3\Library\bin
```

## Instalar CLI do Google Cloud
[Download do Instalador do CLI do Google Cloud](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe?hl=pt-br)

## Configuração
```shell
node --version
npm install
fly launch
```
## Chatbot
### [https://chatbot-87802.web.app/](https://chatbot-87802.web.app/)

## Github
```shell
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/edi2-br/chatbot.git
git push -u origin main
```

## Atualizar chatbot no Github e no Google Cloud
```shell
git add .
git commit -m "Configuração do GitHub Actions para deploy no Cloud Run"
git push origin main
```

```shell
gcloud config set project avid-folder-454915-u6
gcloud auth configure-docker
gcloud builds submit --tag gcr.io/avid-folder-454915-u6/whatsapp-bot
```

https://chatbot-166297637920.us-central1.run.app