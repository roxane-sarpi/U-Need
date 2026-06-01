# Docker

## Structure

```text
U-Need/
├── docker-compose.yml
├── .env                   # credentials Docker de chaque dev (non commité)
├── .env.example           # template à copier (commité)
├── backend/
│   ├── Dockerfile
│   └── .env
└── frontend/
    ├── Dockerfile
    └── .env
```

---

## Dockerfile Backend (`backend/Dockerfile`)

```dockerfile
FROM node:24-alpine       # image de base légère
WORKDIR /app

COPY package*.json .      # copie les dépendances en premier (cache Docker)
RUN npm install

COPY . .                  # copie le code source

EXPOSE 5000
CMD ["node", "index.js"]
```

## Dockerfile Frontend (`frontend/Dockerfile`)

```dockerfile
FROM node:24-alpine
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
# --host est requis pour que Vite accepte les connexions depuis l'extérieur du conteneur
```

## docker-compose.yml

Orchestre trois services :

- **mysql** → image `mysql:8.0`, port `3307:3306`, données persistées dans un volume `mysql_data`
- **backend** → port `APP_PORT` (défaut `5000`), démarre uniquement quand MySQL est prêt (`healthcheck`)
- **frontend** → port `VITE_PORT` (défaut `5173`), env depuis `frontend/.env`

`develop.watch` : synchronise les fichiers à chaud, reconstruit si `package.json` change.

---

## Service MySQL

Le conteneur MySQL est **isolé du MySQL local** — il repart de zéro avec ses propres credentials.

### Rôle des deux `.env`

| Fichier | Lu par | Sert à |
| --- | --- | --- |
| `.env` (racine) | `docker-compose.yml` via `${VAR}` | **Créer** le conteneur MySQL |
| `backend/.env` | service backend via `env_file` | **Connecter** le backend à MySQL |

Les valeurs doivent correspondre entre les deux fichiers.

### Variables à aligner

| Root `.env` | `backend/.env` |
| --- | --- |
| `MYSQL_DATABASE` | `DB_NAME` |
| `MYSQL_USER` | `DB_USER` |
| `MYSQL_PASSWORD` | `DB_PASSWORD` |

### `DB_HOST` — local vs Docker

`backend/.env` garde `DB_HOST=localhost` pour le dev local.
Le `docker-compose.yml` surcharge cette valeur avec `DB_HOST=mysql` (nom du service Docker) uniquement dans le conteneur.

### Setup pour chaque développeur

```bash
# 1. Copier le template
cp .env.example .env

# 2. Remplir avec ses propres valeurs (mêmes que backend/.env)
# MYSQL_ROOT_PASSWORD=root
# MYSQL_DATABASE=...
# MYSQL_USER=...
# MYSQL_PASSWORD=...
```

---

## Commandes

```bash
# Lancer (avec build)
docker compose up --build

# Lancer en mode hot-reload
docker compose watch

# Arrêter
docker compose down

# Logs
docker compose logs -f [backend|frontend]

