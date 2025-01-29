# Cercle, Role and Permission

Un cercle forme un espace contenant des objets et des documents pour lesquels des utilisateurs interagissent selon leurs rôles et leurs permissions.

Les rôles et les permissions ne sont pas éditables dans un premier temps. Des rôles et permissions sont prédéfinis.

## Entités


### Cercle

| Attribut  | Description  | Format |
|-----------|------------- |--------|
| ID        | Identifiant unique | UUID| 
| Nom | Nom du cercle | Text |
| Description | Description du cercle | Text |
| Date de création | Date de création du cercle| Date et heure |
| Créateur | Créateur (utilisateur du cercle) | UUID |


### Role

| Attribut  | Description  | Format |
|-----------|------------- |--------|
| ID        | Identifiant unique du rôle | UUID | 
| Nom | Nom du rôle | Text |
| Description | Description du rôle | Text |


### Permission

Une permission est un droit d’interagir avec l'application, ce qui signifie être autorisé à effectuer une action.

| Attribut  | Description  | Format |
|-----------|------------- |--------|
| ID        | Identifiant unique de la permission | UUID | 
| Rôle | Nom du rôle| Text |
| Action | Identifiant unique de l'action | Text |

### Attribution

Un utilisateur se fait attribuer un rôle. L'utilisateur pourra effectuer les actions permises par cette attribution.

| Attribut  | Description  | Format |
|-----------|------------- |--------|
| ID        | Identifiant unique de l'attribution | UUID | 
| Utilisateur | Référence à l'utilisateur | UUID |
| Rôle | Référence au rôle | UUID |
| Cercle | Référence au cercle | UUID |

## Cas d'utilisation

En tant que prestataire, je peux créer un cercle.

En tant que prestataire, je peux attribuer un rôle à un utilisateur valable pour un cercle.

En tant que prestataire, je peux révoquer l'attribution d'un rôle à un utilisateur.

En tant que prestataire, je peux archiver un cercle.