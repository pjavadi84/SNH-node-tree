"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeService = void 0;
const common_1 = require("@nestjs/common");
const tree_repository_1 = require("./tree.repository");
let TreeService = class TreeService {
    treeRepository;
    constructor(treeRepository) {
        this.treeRepository = treeRepository;
    }
    async getTree() {
        const flatNodes = await this.treeRepository.findAll();
        const nodeMap = new Map();
        flatNodes.forEach((node) => {
            nodeMap.set(node.id, {
                id: node.id,
                label: node.label,
                parentId: node.parentId ?? null,
                children: [],
            });
        });
        const roots = [];
        nodeMap.forEach((node) => {
            if (node.parentId === null) {
                roots.push(node);
                return;
            }
            const parent = nodeMap.get(node.parentId);
            if (parent) {
                parent.children.push(node);
            }
            else {
                roots.push(node);
            }
        });
        return roots;
    }
    async createNode(dto) {
        const parentId = dto.parentId ?? null;
        if (parentId !== null) {
            const parent = await this.treeRepository.findById(parentId);
            if (!parent) {
                throw new common_1.NotFoundException(`Parent node ${parentId} was not found`);
            }
        }
        const data = {
            label: dto.label,
            parent: parentId !== null ? { connect: { id: parentId } } : undefined,
        };
        return this.treeRepository.createNode(data);
    }
};
exports.TreeService = TreeService;
exports.TreeService = TreeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tree_repository_1.TreeRepository])
], TreeService);
//# sourceMappingURL=tree.service.js.map