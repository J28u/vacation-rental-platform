import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // exporte seulement si un autre module en a besoin
})
export class UsersModule {}
