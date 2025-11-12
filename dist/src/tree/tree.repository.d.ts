import { Prisma, Node as TreeNodeRecord } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class TreeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<TreeNodeRecord[]>;
    findById(id: number): Promise<TreeNodeRecord | null>;
    createNode(data: Prisma.NodeCreateInput): Promise<TreeNodeRecord>;
}
