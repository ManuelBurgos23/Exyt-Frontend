# Etapa 1: Construcción de Angular SSR
FROM node:18 AS build-stage

WORKDIR /app

COPY . /app

# Instalar dependencias y Angular CLI
RUN npm install -g @angular/cli
RUN npm install


# Construir en modo SSR
RUN ng build

# Etapa 2: Servidor Express para SSR
FROM node:18

WORKDIR /app

# Copiar archivos compilados correctamente
COPY --from=build-stage /app/dist/exyt /app/dist/exyt
COPY --from=build-stage /app/package.json /app/

# Instalar dependencias de producción
RUN npm install --omit=dev

# Exponer puerto
EXPOSE 8080

# Ejecutar servidor con soporte para .mjs
CMD ["npm","run","serve:ssr:Exyt"]
