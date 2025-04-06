import { randomUUID } from 'node:crypto'

/**
 * Génère un UUID pour un modèle donné
 * @param modelName Nom du modèle
 * @returns Un nouveal UUID
 */
export function generateUuid(): string {
  return randomUUID()
}
