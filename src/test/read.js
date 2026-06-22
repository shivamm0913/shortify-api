const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const url = await prisma.url.findUnique({
    where: {
      shortCode: "abcd123",
    },
  });
  console.log(url);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$connect();
  });
