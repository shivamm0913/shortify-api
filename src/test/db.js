const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const url = await prisma.url.create({
    data: {
      originalUrl: "https://youtube.com",
      shortCode: "abcd123",
    },
  });
  console.log(url);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
