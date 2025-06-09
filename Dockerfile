# Etapa 1: Construcción de Angular
FROM node:18-alpine AS build
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

RUN npm install -g @angular/cli

RUN npm install

# Copia el resto del código fuente
COPY . .

# Genera la versión de producción
RUN ng build --configuration=production

CMD ["ng", "serve", "--host", "0.0.0.0"]