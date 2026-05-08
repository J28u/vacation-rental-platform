import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // tous les modules qui importent le UsersModule ont accès au UsersService
})
export class UsersModule {}
