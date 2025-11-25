// Buisiness Logic: assemble the tree from flat records, validate parents on create and calls the repository. 

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

// @injectable declaration makes the following class reusable by others
@Injectable()
export class TreeService {
  // instead of const prisma = new PrismaClient() we do constructor(private readonly treeRepository: TreeRepository) {} tp prevent NestJS depedency injection:
  constructor(private readonly treeRepository: TreeRepository) {}

  async getTree(): Promise<TreeNodeView[]> {
    // ###--STEP 1: Building the tree and its children --###
    // get flat list of node from db, something like this:
    // [
    //   { id: 1, label: "Root", parentId: null },
    //   { id: 2, label: "Child A", parentId: 1 },
    //   { id: 3, label: "Child B", parentId: 1 },
    // ] 
    const flatNodes = await this.treeRepository.findAll();
    // using map for fast lookup O(1):
    // 1 → { id: 1, label: "Root", children: [] }
    // 2 → { id: 2, label: "Child A", children: [] }
    // 3 → { id: 3, label: "Child B", children: [] }

    const nodeMap = new Map<number, TreeNodeView>();

    flatNodes.forEach((node) => {
      nodeMap.set(node.id, {
        id: node.id,
        label: node.label,
        parentId: node.parentId ?? null,
        children: [],
      });
    });

    // ###---STEP 2: connecting parent and children to builds the actual tree structure:

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
