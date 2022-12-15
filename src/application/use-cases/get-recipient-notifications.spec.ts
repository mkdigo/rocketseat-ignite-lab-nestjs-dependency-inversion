import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('shoud be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: '123',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '123' }),
        expect.objectContaining({ recipientId: '123' }),
      ]),
    );
  });
});
