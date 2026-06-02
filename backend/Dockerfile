FROM node:24-alpine
WORKDIR /app

# 1. On copie les fichiers de dépendances et on installe
COPY package*.json .
RUN npm install

# 2. On copie tout le reste du code source du backend
COPY . .

# 3. On expose le port et on lance l'application
EXPOSE 5050
CMD ["sh", "-c", "node migrate.js && node index.js"]