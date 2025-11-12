import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { TreeRepository } from './tree.repository';

export interface TreeNodeView {
  id: number;
  label: string;
  parentId: number | null;
  children: TreeNodeView[];
}

@Injectable()
export class TreeService {
  constructor(private readonly treeRepository: TreeRepository) {}

  async getTree(): Promise<TreeNodeView[]> {
    const flatNodes = await this.treeRepository.findAll();
    const nodeMap = new Map<number, TreeNodeView>();

    flatNodes.forEach((node) => {
      nodeMap.set(node.id, {
        id: node.id,
        label: node.label,
        parentId: node.parentId ?? null,
        children: [],
      });
    });

    const roots: TreeNodeView[] = [];

    nodeMap.forEach((node) => {
      if (node.parentId === null) {
        roots.push(node);
        return;
      }

      const parent = nodeMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  async createNode(dto: CreateTreeNodeDto) {
    const parentId = dto.parentId ?? null;

    if (parentId !== null) {
      const parent = await this.treeRepository.findById(parentId);
      if (!parent) {
        throw new NotFoundException(`Parent node ${parentId} was not found`);
      }
    }

    const data: Prisma.NodeCreateInput = {
      label: dto.label,
      parent: parentId !== null ? { connect: { id: parentId } } : undefined,
    };

    return this.treeRepository.createNode(data);
  }
}
