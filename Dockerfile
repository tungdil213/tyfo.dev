# Étape 1 : Base Node.js
FROM node:lts-bookworm-slim AS base
WORKDIR /app
RUN apt update && apt install -y curl wget fontconfig && rm -rf /var/lib/apt/lists/*

# Étape 2 : Installation de PNPM et des dépendances
FROM base AS deps
WORKDIR /app
RUN npm install -g pnpm

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/tyfo.dev/package.json ./apps/tyfo.dev/
COPY packages/ui/package.json ./packages/ui/

# Installer toutes les dépendances pour le monorepo
RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false
# Étape 3 : Build des packages et de l'application
FROM deps AS build
WORKDIR /app
COPY . .

# 🔥 Build du package UI (si nécessaire) puis de l’application principale
RUN pnpm --filter @tyfo.dev/ui run build
RUN pnpm --filter @tyfo.dev/site run build

# 🔥 Générer les assets front avec Vite (indispensable pour Inertia.js)
WORKDIR /app/apps/tyfo.dev
RUN pnpm run build

# Étape 4 : Image finale pour l'exécution
FROM base AS runner
WORKDIR /app

# Installer PNPM
RUN npm install -g pnpm

# Copier les fichiers essentiels
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/tyfo.dev/package.json ./apps/tyfo.dev/

# Copier le build et les assets
COPY --from=build /app/apps/tyfo.dev/build ./apps/tyfo.dev/build
COPY --from=build /app/apps/tyfo.dev/public/assets ./apps/tyfo.dev/public/assets

# Installation des dépendances en mode production
WORKDIR /app/apps/tyfo.dev
RUN pnpm install --prod --no-optional --no-frozen-lockfile --filter @tyfo.dev/site

# Vérification que les assets sont bien présents
RUN ls -l /app/apps/tyfo.dev/public/assets || echo "Assets NOT FOUND"

# Lancer le serveur
EXPOSE 3333
CMD ["node", "build/bin/server.js"]
