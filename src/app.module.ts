import { Module } from '@nestjs/common';
// global configuration module that every part of the app can access these settings without asking because it set global; things like environment variables (.env), Prevents you from manually importing config everywhere
import { ConfigModule } from '@nestjs/config';
// PrismaModule is the database module on how to talk to db
import { PrismaModule } from './prisma/prisma.module';
// module related to tree services: Business logic -> creating a tree node, retrieving, updating, or deleting nodes, Handles HTTP routes like GET /trees, POST /trees. 

// XXX---Without TreeModule---XXX
// 1) tree logic would mix with user logic
// 2) controllers become bloated
// 3) services become huge
// 4) scaling is hard

// $$$$$---BENEFITS of TreeModule ---$$$$$: 
// 1) code is organized
// 2) reusable
// 3) testable
// 4) each area is isolated
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, TreeModule],
})
export class AppModule {}
