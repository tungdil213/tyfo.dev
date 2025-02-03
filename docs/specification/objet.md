# Objets

Les objets sont des éléments pour lesquels s'appliquent une prestation. Ils comprennent les éléments suivants:
* des dossiers pour la classification et le rangement,
* des fichiers dans différents formats,
* des documents dans différents formats,
* des documents consultable et ou éditable dans l'application,
* des documents numériquement signés;

## Entités

### Dossier

 | Attribut                      | Description                                     | Format          | 
 | ----------------------------- | ----------------------------------------------- | --------------- | 
 | ID                            | Identifiant unique du dossier                   | UUID            | 
 | Nom                           | Nom du dossier                                  | Texte           | 
 | Description                   | Description du dossier                          | Texte           | 
 | Cercle                        | Référence au cercle dans lequel est ce dossier  | UUID            | 
 | Parent                        | Référence au cercle parent, si sous-dossier     | UUID            | 
 | Date de création              | Date de création du dossier                     | Date et heure   | 
 | Date de dernière modification | Date de dernière modification du dossier        | Date et heure   | 
 | Créateur                      | Référence à l'utilisateur ayant créé ce dossier | UUID            | 

## Fichier

Un fichier représente un fichier ou un document.

 | Attribut                      | Description                                            | Format          | 
 | ----------------------------- | ------------------------------------------------------ | --------------- | 
 | ID                            | Identifiant unique du fichier                          | UUID            | 
 | Dossier                       | Référence au dossier dans lequel se trouve le fichier  | UUID            | 
 | Nom                           | Nom du fichier                                         | Text            | 
 | Type Mime                     | Type Mime représentant le format du fichier            | Text            | 
 | Créateur                      | Référence à l'utilisateur ayant créé le fichier        | UUID            | 
 | Date de création              | Date de création du fichier                            | Date et heure   | 
 | Dernière date de modification | Dernière date de modification du fichier               | Date et heure   | 
 | Revision                      | Numéro de révision du fichier                          | Nombre entier   | 
 | Empreinte                     | Empreinte numérique représentant le contenu du fichier | Texte           | 

## Cas d'utilisation

### Création d'objets

#### Création d'un dossier

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire accède au dossier dans lequel il souhaite créer un dossier
> 3. Le prestataire clique sur le bouton pour créer un dossier
> 4. Le prestataire renseigne le nom et la description du dossier puis valide
> 5. Le système crée le dossier et confirme la création au prestataire

#### Téléversement d'un fichier

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire accède au dossier dans lequel il souhaite téléverser un fichier
> 3. Le prestataire clique sur le bouton pour téléverser un fichier
> 4. Le prestataire choisi un fichier et renseigne le nom et la description puis valide
> 5. Le système téléverse le fichier dans le dossier et confirme l'ajout au prestataire

#### Téléversement d'une nouvelle version d'un fichier

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire accède au dossier dans lequel il souhaite téléverser un fichier
> 3. Le prestataire clique sur le bouton pour téléverser un fichier
> 4. Le prestataire choisi un fichier et renseigne le nom et la description puis valide
> 5. Le système téléverse le fichier dans le dossier. 
> 6. Si le fichier existe déjà, le système propose d'annuler ou d'ajouter en tant que nouvelle révision.
> 7. Le prestataire choisi d'annuler ou d'ajouter en tant que nouvelle révision.
> 8. Le système agit en fonction du choix du prestataire. Soit en annulant soit en enregistrant une nouvelle révision 
puis confirme l'action effectuée au prestataire

### Consultation d'objets

#### Lister les dossiers

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire navigue dans la hiérarchie des dossiers pour les voir

#### Lister les fichiers

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire navigue dans la hiérarchie des dossiers pour accéder à celui voulu
> 3. Le prestataire pour voir la liste des fichiers dans le dossier ouvert

#### Télécharger un fichier

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire navigue dans la hiérarchie des dossiers pour accéder à celui voulu
> 3. Le prestataire retrouve le fichier voulu en parcourant la liste
> 4. Le prestataire clique sur le bouton pour télécharger le fichier

#### Lister les dossiers

> **Acteur principal:** Consommateur
>
> **Précondition:** Le Consommateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Consommateur accède au cercle voulu
> 2. Le Consommateur navigue dans la hiérarchie des dossiers pour les voir

#### Lister les fichiers

> **Acteur principal:** Consommateur
>
> **Précondition:** Le Consommateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Consommateur accède au cercle voulu
> 2. Le Consommateur navigue dans la hiérarchie des dossiers pour accéder à celui voulu
> 3. Le Consommateur pour voir la liste des fichiers dans le dossier ouvert

#### Télécharger un fichier

> **Acteur principal:** Consommateur
>
> **Précondition:** Le Consommateur est authentifié dans l'application
>
> **Scénario:**
> 1. Le Consommateur accède au cercle voulu
> 2. Le Consommateur navigue dans la hiérarchie des dossiers pour accéder à celui voulu
> 3. Le Consommateur retrouve le fichier voulu en parcourant la liste
> 4. Le Consommateur clique sur le bouton pour télécharger le fichier

### Archivage

> **Acteur principal:** Prestataire
>
> **Précondition:** Le prestataire est authentifié dans l'application
>
> **Scénario:**
> 1. Le prestataire accède au cercle voulu
> 2. Le prestataire navigue dans la hiérarchie des dossiers pour accéder à celui voulu
> 3. Le prestataire retrouve le fichier voulu en parcourant la liste
> 4. Le prestataire clique dessus pour afficher la page des détails
> 5. Le prestataire clique sur le bouton archiver.
> 6. Le système demande de confirmer l'action
> 7. Le prestataire confirme ou annule l'archivage.
> 8. Le système annule l'action ou archive le fichier selon le choix du prestataire
puis confirme l'action au prestataire.
>
> **Remarques:** En archivant, aucune donnée n'est effacée mais le fichier n'est plus visible
dans l'interface.
