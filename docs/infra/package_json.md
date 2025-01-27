# Documentation du fichier `package.json`

Le fichier `package.json` est le fichier central pour gérer les dépendances, les scripts et la configuration des workspaces npm dans ce projet monorepo.

## Structure détaillée

### 1. **Propriétés principales**

- **`type`** :
  - Valeur : `"module"`
  - Indique que le projet utilise les modules ECMAScript (ESM).

- **`private`** :
  - Valeur : `true`
  - Empêche la publication accidentelle de ce monorepo sur npm.

- **`license`** :
  - Valeur : `"UNLICENSED"`
  - Spécifie que le projet n'est pas sous licence publique.

### 2. **Scripts définis**

Le fichier `package.json` inclut plusieurs scripts pour faciliter le développement et l'exécution. Voici une description détaillée :

- **Docker** :
  - `docker:up` : Démarre les services Docker en arrière-plan.
    ```bash
    docker compose up -d
    ```

  - `docker:down` : Stoppe les services Docker.
    ```bash
    docker compose down
    ```

  - `docker:build` : Construit une image Docker à partir du Dockerfile à la racine.
    ```bash
    docker build . -t site
    ```

  - `docker:run` : Lance le conteneur Docker configuré avec les variables d'environnement nécessaires.
    ```bash
    docker run --env-file ./apps/tyfo.dev/.env -e NODE_ENV=production -e HOST=0.0.0.0 -e DB_HOST=host.docker.internal -it -p 3333:3333 --add-host=host.docker.internal:host-gateway site
    ```

- **Lint et formatage** :
  - `lint` : Vérifie le code avec ESLint pour détecter les erreurs et les mauvaises pratiques.
    ```bash
    eslint .
    ```
  - `format` : Formate le code source avec Prettier.
    ```bash
    prettier .
    ```

- **Gestion des dépendances** :
  - `taze` : Met à jour les dépendances pour tous les workspaces.
    ```bash
    npx taze -r -I
    ```

- **Vérification des types** :
  - `typecheck` : Vérifie les types dans tous les workspaces.

### 3. **Workspaces**

Le projet utilise la fonctionnalité **npm workspaces** pour organiser les packages et applications :

- **`apps/*`** : Contient les applications principales.
- **`packages/*`** : Contient les bibliothèques partagées comme le système de design.

Cette configuration permet :
- Une gestion centralisée des dépendances.
- Le partage des bibliothèques entre les différentes parties du projet.

### 4. **Dépendances de développement (`devDependencies`)**

- **`@julr/tooling-configs`** : Fournit une configuration préétablie pour les outils de développement.
- **`eslint`** : Outil de linting pour maintenir un code propre.
- **`prettier`** : Outil de formatage pour harmoniser le style du code.

### 5. **Dépendances spécifiques au projet**

Les dépendances utilisées sont installées et gérées selon les besoins de chaque workspace. La commande suivante installe toutes les dépendances dans un environnement reproductible :
```bash
npm install
```

### 6. **Scripts personnalisés**

Le monorepo peut contenir des scripts supplémentaires définis par les workspaces individuels. Pour exécuter un script spécifique à un workspace :
```bash
npm run <script_name> --workspace=<workspace_name>
```

---

## Notes complémentaires
- Les scripts de ce fichier sont conçus pour être utilisés dans un environnement Dockerisé.
- Les workspaces facilitent la gestion des dépendances communes et des outils de développement.
- La documentation pour chaque workspace est disponible dans le dossier `docs/`.

Pour toute modification ou extension, assurez-vous de tester les changements avec les commandes npm appropriées pour éviter les erreurs dans l'ensemble du monorepo.
