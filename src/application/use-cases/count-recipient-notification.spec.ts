import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  it('shoud be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: '1234' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: '123',
    });

    expect(count).toBe(2);
  });
});
