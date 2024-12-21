import 'dotenv/config';

import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();

async function main() {
  const password = await hash(process.env.ADMIN_PASSWORD, 10);
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Admin',
      email,
      password,
      username,
      roles: [UserRole.ADMIN],
    },
  });

  Logger.log('Admin user created', 'Seed');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
