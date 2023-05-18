import { PrismaClient } from '@prisma/client';
import { users } from './users.js';
import { posts } from './posts.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log('Users seeded');

  for (let post of posts) {
    await prisma.post.create({
      data: post,
    });
  }
  console.log('Posts seeded');

  console.log('Seeding completed! Nice:)');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });