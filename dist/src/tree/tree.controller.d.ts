import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { TreeService } from './tree.service';
export declare class TreeController {
    private readonly treeService;
    constructor(treeService: TreeService);
    getTree(): Promise<import("./tree.service").TreeNodeView[]>;
    createNode(dto: CreateTreeNodeDto): Promise<{
        label: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        parentId: number | null;
    }>;
}
