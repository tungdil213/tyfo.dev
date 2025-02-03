# Utilisateurs

Un utilisateur est une personne physique qui représente elle-même, une autre personne physique, ou une personne morale.

Cet utilisateur est renseigné dans l'application par ses données personnelles dont ces informations d'authentification.

Un utilisateur interagit avec l'application de deux manières distinctes:
 * en tant que fournisseur d'une prestation, appelé prestataire
 * et/ou en tant que consommateur d'une prestation, appelé consommateur;

Le prestataire configure et met à disposition des prestations et des documents.

Le consommateur consomme les prestations et les documents mis à sa disposition.

## Entité

 | Attribut                       | Description                                                   | Format          | 
 | ------------------------------ | ------------------------------------------------------------- | --------------- | 
 | ID                             | Identifiant unique de l'utilisateur                           | UUID            | 
 | Référence client               | Code de référence du client                                   | Texte           | 
 | Titre                          | Titre ou genre de l'utilisateur                               | Texte           | 
 | Nom                            | Nom de l'utilisateur                                          | Texte           | 
 | Prénom                         | Prénom de l'utilisateur                                       | Texte           | 
 | Adresse Email                  | Adresse Email de l'utilisateur                                | Texte           | 
 | Adresse Postale                | Adresse postale de l'utilisateur                              | Texte           | 
 | Numéro                         | Numéro de l'immeuble                                          | Texte           | 
 | Code postal                    | Code postal                                                   | Texte           | 
 | Localité                       | Nom de la localité                                            | Texte           | 
 | Numéro de téléphone primaire   | Numéro de téléphone mobile ou fixe à utiliser prioritairement | Texte           | 
 | Numéro de téléphone secondaire | Numéro de téléphone mobile ou fixe secondaire                 | Texte           | 

## Cas d'utilisation

### Création d'un utilisateur

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède aux paramètres d'administration puis à la section utilisateurs
> 2. Le prestataire clique sur le bouton ajouter un utilisateur
> 3. Le prestataire saisi les données du nouvel utilisateur
> 4. Le prestataire assigne un cercle et un rôle
> 5. Le prestataire valide la création
> 5. Le système crée le nouvel utilisateur et confirme au prestataire
>
> **Remarques:** Le prestataire ne peut pas saisir de mot de passe. Seul un utilisateur peut le faire pour lui-même.
>
> **Postcondition:** Le système va envoyer un email au nouvel utilisateur pour
l'inviter à terminer la création de son compte. Le nouvel utilisateur a 7 jours pour
compléter la création du compte.

### Archivage d'un utilisateur

> **Acteur principal:** Administrateur
>
> **Précondition:** Le Administrateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Administrateur accède aux paramètres d'administration puis à la section utilisateurs
> 2. Le Administrateur choisi l'utilisateur dans la liste et clique dessus pour accéder aux détails
> 3. Le Administrateur clique sur le bouton archiver
> 4. Le système demande une confirmation
> 5. En cas de confirmation positive, le système archive l'utilisateur et confirme au Administrateur
>
> **Remarques:** En archivant un utilisateur, aucune données n'est effacée mais l'utilisateur n'est plus visible dans l'interface et il ne peut plus accéder à son compte, la connexion n'est plus possible.

### Modification d'un utilisateur

> **Acteur principal:** Administrateur
>
> **Précondition:** Le Administrateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Administrateur accède aux paramètres d'administration puis à la section utilisateurs
> 2. Le Administrateur choisi l'utilisateur dans la liste et clique dessus pour accéder aux détails
> 3. Le Administrateur clique sur le bouton modifier
> 4. Le Administrateur saisi les nouvelles données puis valide
> 5. Le système modifie l'utilisateur et confirme au Administrateur
>
> **Postcondition:** Le système envoi un email à l'utilisateur pour l'informer de modifications
>
> **Remarques:** Le Administrateur ne peut pas modifier le mot de passe ou autre données d'authentification. Seul l'utilisateur peut le faire pour lui-même.
>
> A noter que les données de l'utilisateur ne sont pas envoyées par email, uniquement une invitation à les consulter.

### Consultation d'un profile utilisateur

> **Acteur principal:** Administrateur
>
> **Précondition:** Le Administrateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Administrateur accède aux paramètres d'administration puis à la section utilisateurs
> 2. Le Administrateur choisi l'utilisateur dans la liste et clique dessus pour accéder aux détails

### Consultation de son profile utilisateur

> **Acteur principal:** Utilisateur
>
> **Précondition:** L'utilisateur est authentifié dans l'application
>
> **Scénario:**
> 1. L'utilisateur accède aux détails de son profile dans le menu
> 2. L'utilisateur peut consulter ses données

### Modification de son profile utilisateur

> **Acteur principal:** Utilisateur
>
> **Précondition:** L'utilisateur est authentifié dans l'application
>
> **Scénario:**
> 1. L'utilisateur accède aux détails de son profile dans le menu
> 2. L'utilisateur clique sur Modifier
> 3. L'utilisateur peut modifier certaines données autorisées puis valide
> 4. Le système applique les changements et confirme à l'utilisateur.
