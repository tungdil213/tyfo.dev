# Notification

Une notification permet d'informer un utilisateur qu'une action a été produite dans l'application.
La notification se fait par l'envoi d'un EMail.

Dans un premier temps, les utilisateurs reçoivent les notifications de bases, sans paramétrage.

## Entités 
| Attribut                | Description                                  | Format        |
|-------------------------|----------------------------------------------|---------------|
|ID                       | Identifiant unique de la notification | UUID |
|Date de création         | Date de création de la notification | Date et heure |
|Date d'exécution | Date désirée pour envoyer la notification. | Date et heure|
|Date de confirmation d'exécution | Date à laquelle la notification a été envoyée | Date et heure|
|Est notifié | Est-ce que la notification a été envoyée | Binaire |
|Destinataire | Référence à l'utilisateur destinataire de la notification| UUID|
|Template | Nom de la template à utiliser pour générer le contenu | Texte |
|Vecteurs (SMS, EMail, Push, ...) | Vecteur d'envoi| Liste |
|Contenu | Représentation des valeurs à appliquer dans la template | JSON |
