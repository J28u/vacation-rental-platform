import { Prisma } from '../../generated/prisma/client';

export type MessageWithAuthor = Prisma.MessageGetPayload<{
  include: {
    author: true;
  };
}>;
