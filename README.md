# Monorepo avec Docker

## Description du projet
Ce projet est une solution complète pour accompagner les conseillers financiers indépendants. Il fournit un système sécurisé permettant de partager facilement des fichiers et des documents avec leurs clients tout en respectant les règles strictes de la FINMA. 

Le projet utilise **AdonisJS** comme framework principal et est structuré en monorepo avec npm pour une gestion efficace des dépendances et des applications multiples. Docker est utilisé pour simplifier le déploiement et l'exécution.

## Structure du projet
Le projet utilise une architecture modulaire avec la prise en charge des workspaces npm. Les principaux dossiers sont :

- `apps/` : Contient les applications principales.
- `packages/` : Contient les bibliothèques partagées, comme le `design-system`.
- `docs/` : Contient toute la documentation liée au projet.

## Prérequis
- **Node.js** : Version LTS recommandée (Bookworm Slim utilisée dans le Dockerfile).
- **Docker** : Dernière version stable.
- **npm** : Corepack activé pour la gestion des paquets.

## Installation
1. Clonez ce dépôt :
   ```bash
   git clone <url_du_dépôt>
   cd <nom_du_dépôt>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```

## Commandes principales

Voici les scripts définis dans le `package.json` :

- **Docker** :
  - `npm run docker:up` : Lance les services Docker en arrière-plan.
  - `npm run docker:down` : Stoppe les services Docker.
  - `npm run docker:build` : Construit l'image Docker.
  - `npm run docker:run` : Exécute le conteneur avec les variables d'environnement appropriées.

- **Lint et formatage** :
  - `npm run lint` : Analyse le code avec ESLint.
  - `npm run format` : Formate le code avec Prettier.

- **Autres utilitaires** :
  - `npm run taze` : Met à jour les dépendances.
  - `npm run typecheck` : Vérifie les types dans tout le projet.

## Dockerfile
Le projet est conçu pour fonctionner dans un environnement Docker multi-étapes :

1. **Base** : Installation de Node.js et des outils nécessaires.
2. **Installation** : Activation de Corepack et copie des fichiers de configuration.
3. **Dépendances** : Installation des dépendances pour le développement et la production.
4. **Build** : Compilation de l'application avec Adonis.js.
5. **Production** : Configuration pour l'exécution en environnement de production.

Pour une explication détaillée, consultez le fichier [docs/infra/docker.md](docs/infra/docker.md).

## Design System
Le dossier `packages/design-system` contient une bibliothèque partagée pour les composants UI. Les instructions détaillées pour son utilisation se trouvent dans `docs/design-system.md`.

## Package.json
Le fichier `package.json` centralise les scripts, dépendances, et la configuration des workspaces. Une documentation complète est disponible dans [docs/infra/package_json.md](docs/infra/package_json.md).

---

## Documentation
La documentation complète se trouve dans le dossier `docs`. Voici les principales sections :

1. **[Configuration de Docker](docs/infra/docker.md)** : Explication des étapes du Dockerfile.
2. **[Commandes npm TODO](docs/infra/scripts.md)** : Détails sur chaque script du `package.json`.
3. **[Design System TODO](docs/design-system.md)** : Guide d'utilisation et de contribution au système de design.
4. **[Package.json](docs/infra/package_json.md)** : Description des propriétés et scripts.

## Contributions
Les contributions sont les bienvenues. Veuillez suivre les étapes suivantes :

1. Forkez le dépôt.
2. Créez une branche pour vos modifications :
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. Poussez vos changements et créez une pull request.

## License
Ce projet est sous la licence **UNLICENSED**.
