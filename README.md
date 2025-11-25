# Tree API

Minimal NestJS service that stores tree nodes in SQLite via Prisma and exposes them under `/api/tree`. The purpose of this architecture under tree directory is that controllers handle transport, services handle domain logic, repositories handle the DB, DTOs(data transfer objects: no biz logic) that handle input validation/typing, and the module glues them together.

## Setup
- `npm install`
- `npm run migrate`
- `npm run seed`

## Development
- `npm run dev` starts the API on port 3000 (configurable via `.env`).
- `npm run build && npm start` runs the compiled server.

## Testing
- `npm test` for unit tests.
- `npm run test:e2e` for Supertest happy-path coverage.
- to create a node and assign a parent node to it run:

`curl -X POST http://localhost:3000/api/tree \
  -H "Content-Type: application/json" \
  -d '{"label":"Child node","parentId": 1}'

  and replace parentId with the one we can choose from localhost:3000

## Design Decisions & Trade-offs
- **SQLite + Prisma**: satisfies persistence requirement with minimal setup; good for local dev, but would switch to Postgres/MySQL for multi-user prod deployments.
- **Adjacency list in memory**: tree assembly happens in Node (single `findMany`); avoids recursive SQL, keeps logic explicit, but would require pagination or batching if the dataset grew very large.
- **Single TreeModule**: keeps controller/service/repository co-located for clarity; if features expand, we’d split DTOs/services or add CQRS to manage complexity.
- **Minimal validation**: DTO only checks presence/type per requirements; extra constraints (e.g., max label length, cyclic guards) could be added later if needed.
- **Happy-path tests only**: focuses on the specified success flows; negative cases (invalid parent, validation errors) should be covered if this API grows.
