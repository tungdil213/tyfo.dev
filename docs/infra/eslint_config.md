# Documentation du fichier `.eslint.config.js`

Le fichier `.eslint.config.js` configure les règles et les comportements d'ESLint pour ce projet monorepo. Il utilise une configuration préétablie fournie par le package `@julr/tooling-configs` et intègre des ajustements spécifiques au projet.

## Structure du fichier

### Importation

- **`julr`** :
  - Importé depuis `@julr/tooling-configs/eslint`.
  - Sert de base pour la configuration ESLint, simplifiant la gestion des règles et des plugins.

### Options spécifiques

#### **TypeScript**
La configuration TypeScript est personnalisée avec les options suivantes :

- **`forceDecorators: true`** : Active l'utilisation obligatoire des décorateurs.
- **`tsconfigPath`** :
  - Définit les chemins vers les fichiers `tsconfig.json` utilisés par le projet.
  - Les chemins spécifiés :
    - `./tsconfig.json` : Configuration principale.
    - `./inertia/tsconfig.json` : Configuration pour les modules spécifiques dans `inertia`.

#### **Fichiers ignorés**
Les chemins suivants sont exclus de l'analyse ESLint :

- `apps/romainlanz.com/.adonisjs/*` : Fichiers générés automatiquement par AdonisJS.
- `apps/romainlanz.comtypes/db.ts` : Typage spécifique ignoré pour des raisons de compatibilité.

### Règles personnalisées

Des règles spécifiques sont définies pour répondre aux besoins du projet :

- **Désactivation de règles non nécessaires** :
  - `@typescript-eslint/no-redeclare` : Désactivée car cette règle peut générer de faux positifs dans certains scénarios.
  - `@typescript-eslint/no-empty-object-type` : Désactivée pour permettre l'utilisation d'objets vides, courants dans AdonisJS.

- **Tri des imports** :
  - Règle : `perfectionist/sort-imports`.
  - Configuration :
    - Groupes : Les imports sont triés par catégorie, par exemple, `builtin`, `external`, `internal`, etc.
    - Modèle interne : Les imports avec les motifs `^#.+` ou `^~/.+` sont considérés comme internes.
    - Nouvelle ligne entre les groupes : `never` (aucune nouvelle ligne).
    - Ordre : Ascendant et alphabétique.

## Exemple du fichier
```javascript
import { julr } from '@julr/tooling-configs/eslint';

export default julr(
	{
		typescript: {
			forceDecorators: true,
			tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
		},
	},
	{
		ignores: ['apps/romainlanz.com/.adonisjs/*', 'apps/romainlanz.comtypes/db.ts'],
	},
	{
		rules: {
			// Not recommended to be turned on
			'@typescript-eslint/no-redeclare': 'off',
			// Common pattern in AdonisJS
			'@typescript-eslint/no-empty-object-type': 'off',
			'perfectionist/sort-imports': [
				'error',
				{
					groups: ['side-effect', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
					internalPattern: ['^#.+', '^~/.+'],
					newlinesBetween: 'never',
					order: 'asc',
					type: 'alphabetical',
				},
			],
		},
	}
);
```

## Notes complémentaires
- Ce fichier est basé sur une configuration centralisée pour assurer une cohérence à travers tout le projet.
- Les exclusions sont spécifiquement conçues pour éviter d'analyser des fichiers générés ou externes non pertinents.
- La règle de tri des imports (`perfectionist/sort-imports`) permet de maintenir un ordre logique et lisible dans les fichiers source.

Pour toute modification, assurez-vous de tester la configuration avec la commande suivante :
```bash
npm run lint
