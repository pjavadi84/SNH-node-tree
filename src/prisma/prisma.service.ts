import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// When app boots:
// Prisma connects ↑
// When app shuts down:
// Prisma disconnects ↓
// $$$$---This design is perfect for Kubernetes, serverless, or microservices---$$$;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // OnModuleInit: connects to DB, OnModuleDestroy: disconnect from DB

  // $$$---Benefit of OnModuleInit---$$$
  //  1) DB connection is ready before any requests come in
  //  2) No repeated connections
  //  3) Better performance
  
  async onModuleInit() {
    await this.$connect();
  }

  // OnModuleDestroy: Perfect for graceful shutdown in production:
  //  $$$---Benefit of onModuleDestroy--$$$
  // 1) prevents hanging connections
  // 2) prevents memory leaks
  // 3) prevents stuck database clients
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
