import { Favorite } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  status: Favorite;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  planningId: string;
}
