# U-Need

Les étapes de dockerisation du backend

# 1. Image de base ultra-légère avec la version Node.js du projet
FROM node:24-alpine

# 2. Définition du dossier de travail à l'intérieur du conteneur
WORKDIR /app

# 3. Copie des fichiers de dépendances uniquement (Optimisation du cache)
COPY package*.json .

# 4. Installation des dépendances dans le conteneur
RUN npm install

# 5. Copie du reste du code source (exclut les fichiers du .dockerignore)
COPY . .

# 6. Documentation du port d'écoute du backend
EXPOSE 5000

# 7. Commande de démarrage de l'application
CMD ["node", "index.js"]
