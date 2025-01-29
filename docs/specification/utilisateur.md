# Utilisateurs

Un utilisateur est une personne physique qui représente elle-même, une autre personne physique, ou une personne morale.

Cet utilisateur est renseigné dans l'application par ses données personnelles dont ces informations d'authentification.

Un utilisateur interagit avec l'application de deux manières distinctes:
 * en tant que fournisseur d'une prestation, appelé prestataire
 * et/ou en tant que consommateur d'une prestation, appelé consommateur;

Le prestataire configure et met à disposition des prestations et des documents.

Le consommateur consomme les prestations et les documents mis à sa disposition.

## Entité

| Attribut                | Description                                  | Format        |
|-------------------------|----------------------------------------------|---------------|
| ID | Identifiant unique de l'utilisateur| UUID |
| Référence client | Code de référence du client | Texte |
| Titre | Titre ou genre de l'utilisateur | Texte |
|Nom | Nom de l'utilisateur| Texte |
|Prénom |  Prénom de l'utilisateur| Texte |
|Adresse Email | Adresse Email de l'utilisateur | Texte |
|Adresse Postale | Adresse postale de l'utilisateur | Texte |
|Numéro | Numéro de l'immeuble | Texte |
|Code postal | Code postal | Texte |
|Localité | Nom de la localité | Texte |
|Numéro de téléphone primaire | Numéro de téléphone mobile ou fixe à utiliser prioritairement | Texte |
|Numéro de téléphone secondaire | Numéro de téléphone mobile ou fixe secondaire | Texte |

## Cas d'utilisation

En tant qu'administrateur, je peux créer un nouvel utilisateur.

En tant qu'administrateur, je peux archiver un utilisateur.

En tant qu'administrateur, je peux supprimer modifier un utilisateur.

En tant qu'administrateur, je peux consulter le profile d'un utilisateur.

En tant qu'utilisateur, je peux modifier certaines de mes informations.

En tant qu'utilisateur, je peux consulter le profile de mon utilisateur.
