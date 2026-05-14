import { Prisma } from '../../generated/prisma/client';

export type RentalWithMessages = Prisma.RentalGetPayload<{
  include: {
    messages: { include: { author: true } };
  };
}>;
