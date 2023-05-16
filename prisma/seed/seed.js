import { PrismaClient } from '@prisma/client';
import { users } from './users.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });