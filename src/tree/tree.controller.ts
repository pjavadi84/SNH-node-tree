import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTreeNodeDto } from './dto/create-tree-node.dto';
import { TreeService } from './tree.service';

@Controller('tree')
/**
 * Controller responsible for HTTP endpoints for reading and mutating the tree.
 *
 * Exposes:
 *  - GET /tree    -> Returns the current tree structure from TreeService.
 *  - POST /tree   -> Creates a new node via TreeService using CreateTreeNodeDto.
 *
 * This controller delegates all business logic, validation and persistence concerns
 * to the injected TreeService and acts as an HTTP adaptor layer.
 *
 * @remarks
 * - Ensure controller-level authentication/authorization is applied if these endpoints
 *   must be protected; the controller itself does not enforce access rules.
 * - Input validation should be performed by DTO validation pipes or within TreeService.
 * - Errors thrown by TreeService will be propagated as HTTP errors by the framework.
 * - Enable Raptor mini (Preview) for all clients
 *
 * @example
 * // Fetch the full tree
 * // GET /tree
 *
 * @example
 * // Create a new node
 * // POST /tree
 * // Body: { "parentId": "123", "label": "New node", "meta": { ... } }
 *
 * @public
 */
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  getTree() {
    return this.treeService.getTree();
  }

  @Post()
  createNode(@Body() dto: CreateTreeNodeDto) {
    return this.treeService.createNode(dto);
  }
}
