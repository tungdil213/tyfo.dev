# Journal de bord

Chaque action effectué dans l'application est consignée dans un journal de bord.

Les événements dans ce journal doivent permettre un suivit précis de chacune des interactions dans l'application
afin de pouvoir justifier en tout temps tous les changements d'état.

## Entités

### Événement

| Attribut                | Description                                  | Format        |
|-------------------------|----------------------------------------------|---------------|
| ID                      | Identification unique de l'entrée du journal | UUID          |
| Date de création        | Date et heure de l'événement                 | Date et heure |
| Utilisateur             | Identifiant de l'utilisateur                 | UUID          |
| Action                  | Nom de l'action                              | Text          |
| Type d'objet primaire   | Type d'objet de départ ou primaire                          |  Text             |
| Objet primaire          | Référence à l'objet de départ ou primaire                                             | Text              |
| Type d'objet secondaire | Type d'objet de destination ou secondaire                                             |  Text             |
| Objet secondaire        | Référence à l'objet de destination ou secondaire                                             |  Text             |
| Message                 | Message explicatif de l'événement                                             |  Text             |

## Cas d'utilisation

A chaque fois qu'un utilisateur ou qu'une routine performe une action, un événement est consignée dans le journal de bord.