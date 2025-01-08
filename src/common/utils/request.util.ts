import { Request } from 'express';

export const extractUser = (request: Request): string => {
  const role = request?.user?.['role'] ?? null;
  return role;
};

export const extractTokenFromHeader = (
  request: Request,
): string | null => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : null;
};
