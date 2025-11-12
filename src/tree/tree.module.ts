import { Module } from '@nestjs/common';
import { TreeController } from './tree.controller';
import { TreeRepository } from './tree.repository';
import { TreeService } from './tree.service';

@Module({
  controllers: [TreeController],
  providers: [TreeService, TreeRepository],
})
export class TreeModule {}
