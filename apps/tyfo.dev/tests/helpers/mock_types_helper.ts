/**
 * @file mock_types_helper.ts
 * @description Utilitaires pour résoudre les problèmes de typage entre les mocks et les modèles Lucid
 */
import { LucidModel } from '@adonisjs/lucid/build/src/Contracts'

/**
 * Type utilitaire pour aider à gérer les incompatibilités de type entre les mocks
 * et les modèles AdonisJS Lucid. Permet d'utiliser un type mocké là où un type Lucid est attendu.
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 */
export type MockAsModel<TMock, TModel> = TMock & Omit<TModel, keyof TMock>

/**
 * Fonction utilitaire pour convertir une instance mock en type modèle.
 * Ceci est une assertion de type, donc aucune conversion réelle n'est effectuée.
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 * @param mockInstance L'instance mock à convertir
 * @returns L'instance mock convertie en type modèle
 */
export function mockAsModel<TMock, TModel>(mockInstance: TMock): TModel {
  return mockInstance as unknown as TModel
}

/**
 * Fonction utilitaire pour convertir un tableau d'instances mock en tableau de types modèle.
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 * @param mockInstances Le tableau d'instances mock à convertir
 * @returns Le tableau d'instances mock converti en tableau de types modèle
 */
export function mocksAsModels<TMock, TModel>(mockInstances: TMock[]): TModel[] {
  return mockInstances as unknown as TModel[]
}

/**
 * Type utilitaire pour les résultats promis de mock en tant que modèle
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 */
export type PromiseMockAsModel<TMock, TModel> = Promise<MockAsModel<TMock, TModel>>

/**
 * Fonction utilitaire pour convertir une promesse de mock en promesse de modèle
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 * @param mockPromise La promesse d'instance mock à convertir
 * @returns La promesse d'instance mock convertie en promesse de type modèle
 */
export function promiseMockAsModel<TMock, TModel>(mockPromise: Promise<TMock>): Promise<TModel> {
  return mockPromise.then((mockInstance) => mockAsModel<TMock, TModel>(mockInstance))
}

/**
 * Type utilitaire pour les résultats promis de mock nullable en tant que modèle nullable
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 */
export type PromiseMockAsModelNullable<TMock, TModel> = Promise<MockAsModel<TMock, TModel> | null>

/**
 * Fonction utilitaire pour convertir une promesse de mock nullable en promesse de modèle nullable
 *
 * @template TMock Le type mocké (ex: MockRole)
 * @template TModel Le type du modèle Lucid (ex: Role)
 * @param mockPromise La promesse d'instance mock nullable à convertir
 * @returns La promesse d'instance mock convertie en promesse de type modèle nullable
 */
export function promiseMockAsModelNullable<TMock, TModel>(
  mockPromise: Promise<TMock | null>
): Promise<TModel | null> {
  return mockPromise.then((mockInstance) =>
    mockInstance ? mockAsModel<TMock, TModel>(mockInstance) : null
  )
}
