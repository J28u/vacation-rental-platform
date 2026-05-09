import { User } from '../../generated/prisma/client';

export class UserProfileDto {
  id!: number;
  name!: string | null;
  email!: string;
  created_at!: Date | null;
  updated_at!: Date | null;
}

export function convertUserToProfile(user: User): UserProfileDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}
