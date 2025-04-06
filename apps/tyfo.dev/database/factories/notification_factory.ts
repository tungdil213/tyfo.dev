import Factory from '@adonisjs/lucid/factories'

import Notification from '#models/notification'
import { UserFactory } from '#factories/user_factory'
import { DateTime } from 'luxon'
import { generateUuid } from '#utils/uuid_helper'

export const NotificationFactory = Factory.define(Notification, async ({ faker }) => {
  const executionTime = DateTime.fromJSDate(faker.date.future())
  return {
    uuid: generateUuid(),
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
