# Usa una imagen base de Node.js. 
# Esto asegura que tu aplicación se ejecute en un entorno consistente.
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de manifiesto del proyecto (package.json y package-lock.json)
# para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
# Esto ayuda a aprovechar el cache de Docker, evitando reinstalar dependencias si no cambian.
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Define el comando que se ejecutará cuando el contenedor se inicie
CMD ["node", "src/app.js"]