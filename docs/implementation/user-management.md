# Gestion des Utilisateurs

## Vue d'ensemble

La gestion des utilisateurs dans tyfo.dev est implémentée à travers un service dédié (`UserService`) qui interagit avec un repository (`UserRepository`) pour effectuer les opérations CRUD sur les utilisateurs, ainsi que la gestion des rôles et des cercles.

## Structure

```
└── app
    ├── services
    │   ├── contracts
    │   │   └── user_service_contract.ts   # Interface définissant les méthodes du service
    │   └── user_service.ts                # Implémentation du service utilisateur
    └── repositories
        └── user_repository.ts             # Repository pour les opérations de base de données
```

## Fonctionnalités implémentées

### 1. Gestion des utilisateurs

#### Création d'un utilisateur
```typescript
// Exemple d'utilisation
const user = await userService.createUser({
  email: 'utilisateur@exemple.com',
  fullName: 'Nom Complet',
  description: 'Description de l\'utilisateur'
});
```

#### Mise à jour d'un utilisateur
```typescript
// Exemple d'utilisation
const updatedUser = await userService.updateUser(userUuid, {
  fullName: 'Nouveau Nom',
  description: 'Nouvelle description'
});
```

#### Suppression d'un utilisateur
```typescript
// Exemple d'utilisation
await userService.deleteUser(userUuid);
```

#### Récupération d'un utilisateur par UUID
```typescript
// Exemple d'utilisation
const user = await userService.getUserByUuid(userUuid);
```

#### Liste des utilisateurs
```typescript
// Exemple d'utilisation
const users = await userService.listUsers();
// Avec pagination
const usersPage2 = await userService.listUsers(2, 20); // page 2, 20 utilisateurs par page
```

### 2. Gestion des rôles

#### Attribution d'un rôle à un utilisateur
```typescript
// Exemple d'utilisation
await userService.assignRole(userUuid, roleUuid, circleUuid);
```

#### Retrait d'un rôle à un utilisateur
```typescript
// Exemple d'utilisation
await userService.removeRole(userUuid, roleUuid, circleUuid);
```

#### Liste des rôles d'un utilisateur
```typescript
// Exemple d'utilisation
const roles = await userService.listRolesByUser(userUuid);
```

## Modèle de données

Le modèle `User` comprend les propriétés suivantes :
- `id` : Identifiant unique (auto-incrémenté)
- `uuid` : UUID unique généré pour chaque utilisateur
- `email` : Adresse email unique
- `fullName` : Nom complet de l'utilisateur
- `description` : Description de l'utilisateur (peut être null)
- `createdAt` : Date de création
- `updatedAt` : Date de dernière mise à jour

## Tests

Les tests du service utilisateur sont définis dans `tests/functional/services/user_service.spec.ts` et couvrent les fonctionnalités suivantes :
- Création d'un utilisateur
- Récupération d'un utilisateur par UUID
- Mise à jour d'un utilisateur
- Suppression d'un utilisateur
- Attribution d'un rôle à un utilisateur
- Retrait d'un rôle d'un utilisateur
- Listage des utilisateurs
- Listage des rôles d'un utilisateur

## Points importants

1. **Utilisation de `fullName`** : Le modèle utilise un champ `fullName` unique au lieu de séparer prénom et nom.
2. **Contraintes NOT NULL** : Assurez-vous que les champs obligatoires sont toujours fournis, notamment :
   - `description` pour les rôles et les cercles
   - `user_id` lors de la création d'un cercle
   - `circle_id` lors de la création d'une attribution
3. **Relations** : Les utilisateurs sont liés aux rôles via la table d'attribution (`attributions`) qui contient également une référence au cercle concerné.
