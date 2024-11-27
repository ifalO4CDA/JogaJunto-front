# Use uma imagem oficial do Node.js como base para a etapa de build
FROM node:20-alpine AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /frontend

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .


EXPOSE 3000


#quero iniciar o app com o comando npm start
CMD ["npm", "start"]
