import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
