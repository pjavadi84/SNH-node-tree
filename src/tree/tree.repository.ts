// Data access logic: Prisma queries 

import { Injectable } from '@nestjs/common';
import { Prisma, Node as TreeNodeRecord } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

// @injectable is a declaration statement making functions within it to be acciessible by other parts of the app for example using findById can be used in tree.service.ts
@Injectable()
export class TreeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<TreeNodeRecord[]> {
    return this.prisma.node.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findById(id: number): Promise<TreeNodeRecord | null> {
    return this.prisma.node.findUnique({ where: { id } });
  }

  createNode(data: Prisma.NodeCreateInput): Promise<TreeNodeRecord> {
    return this.prisma.node.create({ data });
  }
}
