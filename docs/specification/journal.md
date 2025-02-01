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

### Journalisation des événements

> **Acteur principal:** Système
>
> **Précondition:** Un utilisateur a réalisé une action
>
> **Scénario:**
> 1. Le système écoute les actions réalisées par les utilisateurs
> 2. Après chaque action effectuée, le système consigne l'événement dans le journal de bord
>
> **Remarques:** En cas de transaction en base de données, la journalisation s'effectue en même temps.
