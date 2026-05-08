import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // pas besoin de l'importer dans chaque module qui l'utilise, uniquement dans le root module app.module.ts
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
