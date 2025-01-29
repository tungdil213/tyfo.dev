# Objets

Les objets sont des éléments pour lesquels s'appliquent une prestation. Ils comprennent les éléments suivants:
* des dossiers pour la classification et le rangement,
* des fichiers dans différents formats,
* des documents dans différents formats,
* des documents consultable et ou éditable dans l'application,
* des documents numériquement signés;

## Entités

### Dossier

| Attribut                | Description                                  | Format        |
|-------------------------|----------------------------------------------|---------------|
|ID | Identifiant unique du dossier | UUID |
|Nom | Nom du dossier| Texte |
|Description | Description du dossier | Texte |
|Cercle | Référence au cercle dans lequel est ce dossier | UUID |
|Parent | Référence au cercle parent, si sous-dossier | UUID |
|Date de création | Date de création du dossier| Date et heure |
|Date de dernière modification | Date de dernière modification du dossier | Date et heure |
|Créateur | Référence à l'utilisateur ayant créé ce dossier | UUID |

## Fichier

Un fichier représente un fichier ou un document.

| Attribut                | Description                                  | Format        |
|-------------------------|----------------------------------------------|---------------|
|ID | Identifiant unique du fichier | UUID |
|Dossier | Référence au dossier dans lequel se trouve le fichier | UUID |
|Nom | Nom du fichier | Text |
|Type Mime | Type Mime représentant le format du fichier | Text |
|Créateur | Référence à l'utilisateur ayant créé le fichier | UUID |
|Date de création | Date de création du fichier | Date et heure |
|Dernière date de modification | Dernière date de modification du fichier | Date et heure |
|Revision | Numéro de révision du fichier | Nombre entier|
|Empreinte | Empreinte numérique représentant le contenu du fichier| Texte |

## Cas d'utilisation

### Création d'objets

En tant que prestataire, je peux créer un dossier dans un cercle.

En tant que prestataire, je peux téléverser un fichier dans un dossier.

### Consultation d'objets

En tant que prestataire, je peux consulter la liste des dossiers et des sous dossiers d'un cercle

En tant que prestataire, je peux lister les fichiers présent dans les dossiers.

En tant que prestataire, je peux télécharger un fichier pour le consulter.

En tant que prestataire, je peux archiver un fichier.

En tant que prestataire, je peux téléverser une nouvelle version d'un fichier pour créer une nouvelle révision.

En tant que consommateur, je peux consulter la liste des dossiers et des sous-dossiers d'un cercle.

En tant que consommateur, je peux lister les fichiers présent dans les dossiers.

En tant que consommateur, je peux télécharger un fichier pour le consulter.


 

