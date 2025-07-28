# Documentation Technique tyfo.dev

## Introduction

Ce document présente la documentation technique de tyfo.dev, une application de gestion documentaire sécurisée avec un système de cercles et de rôles. Cette documentation vise à aider les développeurs à comprendre l'architecture, les fonctionnalités implémentées, et à faciliter la maintenance et l'extension du système.

## Architecture globale

tyfo.dev est structuré en monorepo avec npm workspaces et Docker. L'application principale est basée sur AdonisJS et utilise les technologies suivantes :
- **Backend** : AdonisJS (Node.js)
- **Frontend** : InertiaJS avec React
- **CSS** : Tailwind CSS
- **Base de données** : SQLite (développement), PostgreSQL (production)
- **ORM** : Lucid
- **Tests** : Japa

### Structure du projet

```
└── tyfo.dev
    ├── apps
    │   └── tyfo.dev              # Application principale
    │       ├── app               # Code source de l'application
    │       │   ├── controllers   # Contrôleurs
    │       │   ├── exceptions    # Exceptions personnalisées
    │       │   ├── middleware    # Middleware
    │       │   ├── models        # Modèles de données
    │       │   ├── repositories  # Repositories (couche d'accès aux données)
    │       │   ├── services      # Services métier
    │       │   └── utils         # Utilitaires
    │       ├── database          # Migrations et seeders
    │       ├── public            # Fichiers statiques
    │       ├── resources         # Assets frontend
    │       └── tests             # Tests automatisés
    ├── docs                      # Documentation
    │   ├── implementation        # Documentation technique d'implémentation
    │   ├── infra                 # Documentation infrastructure
    │   └── specification         # Spécifications fonctionnelles
    └── packages                  # Packages partagés
```

## Approche de développement

tyfo.dev suit une approche TDD (Test-Driven Development) où les tests sont écrits avant l'implémentation des fonctionnalités. Cette approche garantit une meilleure qualité de code et une couverture de test complète.

### Exécuter les tests

Pour exécuter les tests :

```bash
# Se positionner dans le dossier de l'application principale
cd apps/tyfo.dev

# Lancer tous les tests
pnpm run test

# Lancer un test spécifique
pnpm run test -- --files=tests/path/to/test.spec.ts
```

## Fonctionnalités documentées

Cette documentation technique couvre les fonctionnalités suivantes :

1. [Gestion des utilisateurs et des rôles](./user-management.md)
   - Création, mise à jour et suppression d'utilisateurs
   - Attribution et retrait de rôles
   - Listage des utilisateurs et de leurs rôles

2. [Gestion des fichiers et versionning](./file-management.md)
   - Upload et stockage de fichiers
   - Versionning (création, récupération, restauration)
   - Gestion des métadonnées
   - Déplacement de fichiers
   - Recherche par métadonnées

## Prochaines fonctionnalités en développement

Les fonctionnalités suivantes sont prévues pour les prochaines phases de développement :

1. **Gestion des cercles**
   - Création et archivage de cercles
   - Association d'utilisateurs aux cercles
   - Gestion des permissions au sein des cercles

2. **Journalisation des événements**
   - Suivi des actions des utilisateurs
   - Historique des modifications

3. **Système de notifications**
   - Notifications en temps réel
   - Paramètres de notification personnalisés

## Principes de conception

tyfo.dev suit plusieurs principes de conception importants :

1. **Architecture orientée services** : Les fonctionnalités sont encapsulées dans des services métier qui utilisent des repositories pour l'accès aux données.

2. **Séparation des préoccupations** : Chaque composant a une responsabilité unique et bien définie.

3. **Inversion de dépendance** : Les dépendances sont injectées plutôt que créées directement.

4. **Interfaces et contrats** : Les services implémentent des contrats (interfaces) qui définissent leur comportement attendu.

5. **Tests automatisés** : Chaque fonctionnalité est couverte par des tests unitaires et fonctionnels.

## Bonnes pratiques

- Toujours suivre l'approche TDD pour les nouvelles fonctionnalités
- Utiliser les interfaces existantes et créer de nouvelles interfaces au besoin
- Respecter les contraintes de base de données (NOT NULL, clés étrangères, etc.)
- Documenter les nouvelles fonctionnalités dans ce dossier de documentation
