const ConflictError = require("../errors/conflictError");
const GoneError = require("../errors/GoneError");
const NotFoundError = require("../errors/NotFoundError");
const prisma = require("../prisma/client");
const QRCode = require("qrcode");

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

async function getUrls(userId, page, limit) {
  const skip = (page - 1) * limit;
  const total = await prisma.url.count({
    where: {
      userId,
    },
  });
  const data = await prisma.url.findMany({
    where: {
      userId,
    },
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
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

async function updateUrl(shortCode, userId, updateData) {
  const url = await prisma.url.findFirst({
    where: {
      shortCode,
      userId,
    },
  });

  if (!url) {
    throw new NotFoundError("Url not found");
  }

  const { originalUrl, customAlias, expiresAt } = updateData;

  const data = {};

  if (originalUrl) {
    data.originalUrl = originalUrl;
  }

  if (customAlias) {
    if (RESERVED_ALIASES.includes(customAlias.toLowerCase())) {
      throw new ConflictError("Alias is reserved");
    }
    const existingUrl = await prisma.url.findUnique({
      where: {
        shortCode: customAlias,
      },
    });
    if (existingUrl && existingUrl.id !== url.id) {
      throw new ConflictError("Alias already exists");
    }

    data.shortCode = customAlias;
  }

  if (expiresAt) {
    if (expiresAt && new Date(expiresAt) <= new Date()) {
      throw new ConflictError("Expiration date must be in the future");
    }
    data.expiresAt = expiresAt;
  }

  const updatedUrl = await prisma.url.update({
    where: {
      id: url.id,
    },
    data,
  });

  return {
    id: updatedUrl.id,
    originalUrl: updatedUrl.originalUrl,
    shortCode: updatedUrl.shortCode,
    clickCount: updatedUrl.clickCount,
    createdAt: updatedUrl.createdAt,
    expiresAt: updatedUrl.expiresAt,
  };
}

async function generateQRCode(shortCode, userId) {
  const url = await prisma.url.findFirst({
    where: {
      shortCode,
      userId,
    },
  });

  if (!url) {
    throw new NotFoundError("Url not found");
  }

  const shortUrl = `${process.env.BASE_URL}/${url.shortCode}`;
  const qrBuffer = await QRCode.toBuffer(shortUrl);

  return qrBuffer;
}

module.exports = {
  createShortUrl,
  getUrls,
  getUrlByShortCode,
  incrementClickCount,
  deleteUrl,
  getUrlStats,
  updateUrl,
  generateQRCode,
};
