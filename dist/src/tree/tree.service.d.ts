import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { TreeRepository } from './tree.repository';
export interface TreeNodeView {
    id: number;
    label: string;
    parentId: number | null;
    children: TreeNodeView[];
}
export declare class TreeService {
    private readonly treeRepository;
    constructor(treeRepository: TreeRepository);
    getTree(): Promise<TreeNodeView[]>;
    createNode(dto: CreateTreeNodeDto): Promise<{
        label: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        parentId: number | null;
    }>;
}
