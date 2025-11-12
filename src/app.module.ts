import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, TreeModule],
})
export class AppModule {}
