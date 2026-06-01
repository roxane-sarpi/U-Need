FROM node:24-alpine
WORKDIR /app

# 1. On copie les fichiers de dépendances et on installe
COPY package*.json .
RUN npm install

# 2. On copie tout le reste du code source du frontend
COPY . .

# 3. On expose le port et on lance l'application
EXPOSE 5173
# L'option --host est indispensable pour que Vite accepte les connexions extérieures au conteneur
CMD ["npm", "run", "dev", "--", "--host"]