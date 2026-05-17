// lib/auth.ts
import { verifyToken } from "./jwt";

export function getUserFromToken(token: string) {
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function authorize(user: any, allowedRoles: string[]) {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}