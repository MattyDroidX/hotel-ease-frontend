![Tela inicial](public/image.png)

## CURSO DE TECNÓLOGO EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS

#### EFRAIM ALVES

#### FERNANDO MATIAS DUARTE


---

## Hotel Ease – Frontend (React)

Bem-vindo(a)!
Este projeto é o **frontend** da aplicação Hotel Ease, desenvolvido em **React.js**.
Este guia foi feito para pessoas com pouca ou nenhuma experiência em desenvolvimento Node.js ou React.
Vamos te mostrar passo a passo como **baixar**, **instalar** e **executar** o projeto no seu computador.

---

## Tecnologias Utilizadas

* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* npm (Node Package Manager)

---

## Pré-requisitos

Você precisa ter o **Node.js** instalado em seu computador (o `npm` vem junto com ele).

### Como instalar o Node.js e npm:

#### Para Windows

1. Acesse o site oficial: [https://nodejs.org](https://nodejs.org)
2. Clique no botão **LTS (Long Term Support)** — versão recomendada
3. Baixe o instalador `.msi`
4. Execute o instalador e clique em **Next** até o final (aceite os termos e mantenha as opções padrão marcadas)
5. Após a instalação, abra o **Prompt de Comando (cmd)** e digite:

```bash
node -v
npm -v
```

Você deve ver algo como:

```bash
v18.18.0
9.6.7
```

#### Para macOS

1. Acesse [https://nodejs.org](https://nodejs.org)
2. Clique no botão **LTS** para baixar a versão estável
3. Baixe o instalador `.pkg`
4. Execute o instalador normalmente
5. Após a instalação, abra o **Terminal** e verifique com:

```bash
node -v
npm -v
```

#### Para Ubuntu/Linux

Para instalar a versão estável mais recente do Node.js no Ubuntu, siga os passos abaixo:

```bash
# Atualize os pacotes existentes
sudo apt update && sudo apt upgrade -y

# Instale dependências necessárias
sudo apt install curl -y

# Baixe o script de instalação da versão LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Instale o Node.js
sudo apt install nodejs -y

# Verifique as versões instaladas
node -v
npm -v
```


---

## Baixando o projeto

Você receberá um **arquivo .zip** com o código-fonte do projeto. Esse arquivo **não inclui a pasta `node_modules`**, pois ela é muito grande e será reconstruída localmente após a instalação das dependências.

### Alternativa via GitHub (opcional)

Caso prefira, você também pode acessar diretamente o repositório no GitHub e clonar o projeto:

1. Acesse o repositório: [https://github.com/MattyDroidX/prominas](https://github.com/MattyDroidX/prominas)
2. Clique em **Code** e copie a URL (HTTPS)
3. Abra seu terminal e digite:

```bash
git clone https://github.com/MattyDroidX/prominas.git
cd prominas/hotel-ease-frontend
```

Depois disso, siga os mesmos passos de instalação das dependências abaixo:

### Passos para preparar o projeto:

1. Extraia o arquivo `.zip` que foi entregue.
2. Abra o terminal (no Windows, use o **Prompt de Comando** ou **PowerShell**).
3. Navegue até a pasta onde você extraiu o projeto. Exemplo:

```bash
cd C:\Usuarios\SeuNome\Downloads\hotel-ease-frontend
```

*(em Linux/macOS: `cd ~/Downloads/hotel-ease-frontend`)*

4. Instale as dependências do projeto:

```bash
npm install
```

Esse comando recria a pasta `node_modules` com base no `package.json`.

5. Execute o servidor de desenvolvimento:

```bash
npm start
```

Depois disso, o navegador será aberto automaticamente em:

```
http://localhost:3000

ou

http://127.0.0.1:3000/

```

Se não abrir automaticamente, copie e cole esse link no seu navegador.

---

## Como parar o servidor

Para parar a aplicação, volte ao terminal onde ela está rodando e pressione:

```bash
Ctrl + C
```

---

## Problemas comuns e soluções

| Problema                              | Solução                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| Porta 3000 em uso                     | Feche outros programas que estejam usando essa porta ou reinicie o PC.       |
| Permissão negada ao instalar pacotes  | Use `sudo npm install` (somente no macOS ou Linux).                          |
| Algo deu errado após instalar pacotes | Apague `node_modules` e `package-lock.json`, e rode `npm install` novamente. |
