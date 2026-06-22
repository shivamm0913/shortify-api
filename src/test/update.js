const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.url.update({
    where: {
      shortCode: "abcd123",
    },
    data: {
      clickCount: 5,
    },
  });

  console.log(updated);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$connect;
  });
