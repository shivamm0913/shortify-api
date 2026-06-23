const ConflictError = require("../errors/conflictError");
const GoneError = require("../errors/GoneError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const prisma = require("../prisma/client");

const RESERVED_ALIASES = ["admin", "api", "urls", "login", "stats"];

async function createShortUrl(originalUrl, customAlias, expiresAt, userId) {
  if (expiresAt && new Date(expiresAt) <= new Date()) {
    throw new ConflictError("Expiration date must be in  the future");
  }
  let shortCode;
  if (customAlias) {
    if (RESERVED_ALIASES.includes(customAlias.toLowerCase())) {
      throw new ConflictError("Alias is reserved");
    }
    const existingUrl = await prisma.url.findUnique({
      where: {
        shortCode: customAlias,
      },
    });

    if (existingUrl) {
      throw new ConflictError("Alias already exists");
    }

    shortCode = customAlias;
  } else {
    shortCode = Math.random().toString(36).substring(2, 8);
  }

  const url = await prisma.url.create({
    data: {
      originalUrl,
      shortCode,
      expiresAt,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return {
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clickCount: url.clickCount,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
  };
}

async function getUrls(userId) {
  const data = await prisma.url.findMany({
    where: {
      userId,
    },
  });

  return {
    data,
  };
}

async function getUrlByShortCode(shortCode) {
  const url = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!url) {
    throw new NotFoundError("Url Not Found");
  }
  if (url.expiresAt && new Date() > url.expiresAt) {
    throw new GoneError("Url has expired");
  }
  return {
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clickCount: url.clickCount,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
  };
}

async function getUrlStats(shortCode, userId) {
  const url = await prisma.url.findFirst({
    where: {
      shortCode,
      userId,
    },
    include: {
      visits: {
        orderBy: {
          visitedAt: "desc",
        },
        take: 10,
      },
    },
  });
  if (!url) {
    throw new NotFoundError("Url Not Found");
  }
  return {
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    clickCount: url.clickCount,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt,
    recentVisits: url.visits,
  };
}

async function incrementClickCount(shortCode) {
  const url = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!url) {
    throw new NotFoundError("Url Not Found");
  }
  await prisma.$transaction([
    prisma.urlVisit.create({
      data: {
        urlId: url.id,
      },
    }),

    prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    }),
  ]);
}

async function deleteUrl(shortCode, userId) {
  const url = await prisma.url.findFirst({
    where: {
      shortCode,
      userId,
    },
  });

  if (!url) {
    throw new NotFoundError("Url Not found");
  }

  await prisma.url.delete({
    where: {
      id: url.id,
    },
  });
}

module.exports = {
  createShortUrl,
  getUrls,
  getUrlByShortCode,
  incrementClickCount,
  deleteUrl,
  getUrlStats,
};
