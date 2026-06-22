const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.url.delete({
    where: {
      shortCode: "abcd123",
    },
  });
  console.log(deleted);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
