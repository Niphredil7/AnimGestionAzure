import { NotificationType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  type: NotificationType;

  @IsNotEmpty()
  @IsString()
  message: string;
}
