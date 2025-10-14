import { Injectable } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(private readonly chatGateway: ChatGateway) {}
  create(userId: number) {
    this.chatGateway.sendToUser(userId, 'newChat', {
      message: 'Someone booked your vehicle!',
      timestamp: new Date(),
      type: 'booking_notification',
    });

    return {
      success: true,
      message: `Notification sent to user ${userId}`,
      userId,
    };
  }
}
