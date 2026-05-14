import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { RentalsModule } from '../rentals/rentals.module';

@Module({
  imports: [RentalsModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
