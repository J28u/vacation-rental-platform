import { Prisma } from '../../generated/prisma/client';

export type RentalWithOwner = Prisma.RentalGetPayload<{
  include: {
    owner: true;
  };
}>;
