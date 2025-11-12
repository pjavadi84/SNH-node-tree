import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.node.deleteMany();

  const rootOne = await prisma.node.create({
    data: { label: 'Root One' },
  });

  const rootTwo = await prisma.node.create({
    data: { label: 'Root Two' },
  });

  await prisma.node.createMany({
    data: [
      { label: 'Child 1.1', parentId: rootOne.id },
      { label: 'Child 1.2', parentId: rootOne.id },
      { label: 'Child 2.1', parentId: rootTwo.id },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
