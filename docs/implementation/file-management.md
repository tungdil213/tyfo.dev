# Gestion des Fichiers et Versionning

## Vue d'ensemble

La gestion des fichiers dans tyfo.dev est implémentée via un service dédié (`StorageService`) qui interagit avec un repository (`ObjectRepository`) pour effectuer les opérations CRUD sur les fichiers, gérer leur versionning, et traiter les métadonnées associées. Le système utilise une approche par révisions pour gérer les différentes versions d'un même fichier.

## Structure

```
└── app
    ├── services
    │   ├── contracts
    │   │   └── storage_contract.ts        # Interface définissant les méthodes du service
    │   └── storage_service.ts             # Implémentation du service de stockage
    └── repositories
        └── object_repository.ts           # Repository pour les opérations de base de données
```

## Fonctionnalités implémentées

### 1. Gestion de base des fichiers

#### Traitement et stockage d'un fichier
```typescript
// Exemple d'utilisation
const file = // Objet MultipartFile d'AdonisJS
const userId = 1;
const folderId = 5;
const object = await storageService.processUploadedFile(file, userId, folderId);
```

#### Vérification d'existence d'un fichier
```typescript
// Exemple d'utilisation
const exists = await storageService.fileExists(filePath);
```

#### Suppression d'un fichier
```typescript
// Exemple d'utilisation
await storageService.deleteFile(filePath);
```

#### Récupération d'URL
```typescript
// URL publique
const url = await storageService.getFileUrl(filePath);

// URL signée temporaire
const signedUrl = await storageService.getSignedUrl(filePath, 60); // expire dans 60 minutes
```

### 2. Versionning des fichiers

#### Création d'une nouvelle version
```typescript
// Exemple d'utilisation
const file = // Objet MultipartFile d'AdonisJS
const newVersion = await storageService.createNewVersion(file, objectUuid, userId);
```

#### Récupération de l'historique des versions
```typescript
// Exemple d'utilisation
const versions = await storageService.getFileVersions(objectUuid);
```

#### Restauration d'une version antérieure
```typescript
// Exemple d'utilisation
const restoredVersion = await storageService.restoreVersion(versionUuid, userId);
```

### 3. Gestion des métadonnées

#### Mise à jour des métadonnées
```typescript
// Exemple d'utilisation
const updatedObject = await storageService.updateMetadata(objectUuid, {
  name: 'nouveau-nom.txt',
  mimeType: 'text/plain'
});
```

### 4. Organisation des fichiers

#### Déplacement d'un fichier
```typescript
// Exemple d'utilisation
const movedObject = await storageService.moveFile(objectUuid, targetFolderId, userId);
```

#### Recherche par métadonnées
```typescript
// Exemple d'utilisation
// Recherche par nom (partiel)
const filesByName = await storageService.searchByMetadata({ name: 'document' });

// Recherche par type MIME
const filesByType = await storageService.searchByMetadata({ mimeType: 'text/plain' });

// Recherche combinée avec filtrage par dossier et utilisateur
const files = await storageService.searchByMetadata(
  { name: 'document', mimeType: 'text/plain' },
  folderId,
  userId
);
```

## Modèle de données

Le modèle `Object` comprend les propriétés suivantes :
- `id` : Identifiant unique (auto-incrémenté)
- `uuid` : UUID unique généré pour chaque objet
- `userId` : ID de l'utilisateur propriétaire
- `folderId` : ID du dossier contenant l'objet
- `name` : Nom du fichier
- `mimeType` : Type MIME du fichier
- `revision` : Numéro de révision du fichier
- `hash` : Hash SHA256 du contenu du fichier
- `location` : Chemin de stockage du fichier
- `createdAt` : Date de création
- `updatedAt` : Date de dernière mise à jour

## Mécanisme de versionning

Le système de versionning fonctionne comme suit :
1. Chaque fichier est identifié par son nom, son dossier parent, et un numéro de révision.
2. Lorsqu'une nouvelle version est créée, un nouvel objet est stocké avec un numéro de révision incrémenté.
3. La dernière version d'un fichier est toujours celle avec le numéro de révision le plus élevé.
4. Le repository fournit une méthode `listRevisions` qui permet de récupérer toutes les versions d'un fichier.
5. Lors de la restauration d'une version antérieure, une nouvelle révision est créée avec le contenu de la version restaurée.

## Tests

Les tests du service de stockage sont définis dans `tests/functional/services/file_versioning.spec.ts` et couvrent les fonctionnalités suivantes :
- Upload de fichier
- Création de nouvelle version
- Récupération de l'historique des versions
- Restauration de version
- Mise à jour des métadonnées
- Déplacement de fichier
- Recherche par métadonnées

## Points importants

1. **Stockage physique** : Les fichiers sont stockés via le système de disque configuré dans AdonisJS (local par défaut, mais extensible à S3, etc.)
2. **Hachage de fichiers** : Chaque fichier est identifié par un hash SHA256 de son contenu, ce qui permet d'éviter les duplications.
3. **Repository de test** : Pour les tests, un `TestObjectRepository` simulé est utilisé, implémentant toutes les méthodes nécessaires.
4. **Types MIME** : Les types MIME sont importants pour la recherche et le traitement des fichiers.
