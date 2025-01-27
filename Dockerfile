# Étape de base
FROM node:lts-bookworm-slim AS base
WORKDIR /app
RUN apt update && apt install -y curl wget fontconfig && rm -rf /var/lib/apt/lists/*

# Étape de préparation (installation des dépendances globales)
FROM base AS installer
COPY package.json package-lock.json ./
COPY ./apps ./apps
COPY ./packages ./packages
RUN npm install --legacy-peer-deps

# Étape des dépendances complètes
FROM installer AS deps
RUN npm install --legacy-peer-deps

# Étape des dépendances de production
FROM installer AS production-deps
RUN npm install --legacy-peer-deps --production

# Étape de build
FROM installer AS build
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app/apps/tyfo.dev
RUN npm run build

# Étape finale pour la production
FROM base
ENV NODE_ENV=production
ENV FONTCONFIG_PATH=/etc/fonts
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/tyfo.dev/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
