import Factory from '@adonisjs/lucid/factories'
import { randomUUID } from 'node:crypto'

import Notification from '#models/notification'
import { UserFactory } from '#factories/user_factory'
import { DateTime } from 'luxon'

export const NotificationFactory = Factory.define(Notification, async ({ faker }) => {
  const executionTime = DateTime.fromJSDate(faker.date.future())
  return {
    uuid: randomUUID(),
    executionTime,
    confirmationTime: faker.datatype.boolean()
      ? executionTime.plus({ minutes: faker.number.int({ min: 1, max: 120 }) })
      : null,
    isNotified: faker.datatype.boolean(),
    template: 'file_downloaded',
    vector: JSON.stringify(['email']),
    content: JSON.stringify({ file: faker.system.fileName() }),
  }
})
  .relation('recipient', () => UserFactory)
  .build()
