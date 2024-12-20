# Etapa de build
FROM node:20-alpine AS build

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa de produção com Nginx
FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
