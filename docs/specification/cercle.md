# Cercle, Role and Permission

Un cercle forme un espace contenant des objets et des documents pour lesquels des utilisateurs interagissent selon leurs rôles et leurs permissions.

Les rôles et les permissions ne sont pas éditables dans un premier temps. Des rôles et permissions sont prédéfinis.

## Entités


### Cercle

| Attribut        | Description                     | Format       | 
| -----------     | -------------                   | --------     | 
| ID              | Identifiant unique              | UUID         | 
| Nom             | Nom du cercle                   | Text         | 
| Description     | Description du cercle           | Text         | 
| Date de création| Date de création du cercle      | Date et heure| 
| Créateur        | Créateur (utilisateur du cercle)| UUID         | 


### Role

 | Attribut     | Description                | Format    | 
 | -----------: | :------------------------: | :-------- |
 | ID           | Identifiant unique du rôle | UUID      | 
 | Nom          | Nom du rôle                | Text      | 
 | Description  | Description du rôle        | Text      | 


### Permission

Une permission est un droit d’interagir avec l'application, ce qui signifie être autorisé à effectuer une action.

| Attribut  | Description  | Format |
|-----------|------------- |--------|
| ID        | Identifiant unique de la permission | UUID | 
| Rôle | Nom du rôle| Text |
| Action | Identifiant unique de l'action | Text |

### Attribution

Un utilisateur se fait attribuer un rôle. L'utilisateur pourra effectuer les actions permises par cette attribution.

 | Attribut    | Description                         | Format   | 
 | ----------- | ----------------------------------- | -------- | 
 | ID          | Identifiant unique de l'attribution | UUID     | 
 | Utilisateur | Référence à l'utilisateur           | UUID     | 
 | Rôle        | Référence au rôle                   | UUID     | 
 | Cercle      | Référence au cercle                 | UUID     | 

## Cas d'utilisation

### Création d'un cercle

> **Acteur principal:** Prestataire
>
> **Précondition:** L'utilisateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au menu correspondant
> 2. Le prestataire remplit les champs du formulaire et valide
> 3. Le système crée le cercle et confirme à l'utilisateur

### Attribution de rôles

> **Acteur principal:** Prestataire
>
> **Précondition:** L'utilisateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire ouvre les paramètres d'attribution des rôles
> 3. Le prestataire ajoute un autre utilisateur dans la liste et choisi le rôle voulu et valide
> 4. Le système attribue le rôle à l'utilisateur en question et confirme le changement dans l'interface


### Révoquer l'attribution de rôles

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire ouvre les paramètres d'attribution des rôles
> 3. Le prestataire enlève un ou plusieurs rôles à l'utilisateur ou enlève totalement l'utilisateur des attributions
> 4. Le prestataire valide les changements
> 5. Le système attribue le rôle à l'utilisateur en question et confirme le changement dans l'interface

### Archivage d'un cercle

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire accède aux paramètres du cercle
> 3. Le prestataire demande l'archivage du cercle
> 4. Le prestataire doit confirmer d'une action active (par exemple écrire un texte) l'archivage du cercle
> 5. Le système procède à l'archivage du cercle.
>
> **Remarques:** Les données du cercle existent toujours mais ne sont plus visibles ni accessibles aux utilisateurs.
