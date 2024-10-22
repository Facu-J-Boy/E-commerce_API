FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre tu aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]