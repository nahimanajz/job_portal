const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const jobs = Array.from({ length: 40 }, (_, i) => ({
    title: `Job Title ${i + 1}`,
    category: `Category ${Math.floor(Math.random() * 5) + 1}`, // Random categories
    location: `City ${Math.floor(Math.random() * 10) + 1}`,    // Random locations
    description: `This is a description for Job Title ${i + 1}.`,
  }));

  await prisma.job.createMany({
    data: jobs,
  });

  console.log('Seeded 40 job records successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
