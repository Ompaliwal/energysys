import { verifyToken } from "./jwt";

import { rolePermissions } from "./permissions";

export function getUserFromToken(
  token: string
) {

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function authorize(
  user: any,
  allowedRoles: string[]
) {

  if (!user)
    return false;

  return allowedRoles.includes(
    user.role
  );
}

export function hasAccess(
  role: string,
  pathname: string
) {

  const allowedRoutes =
    rolePermissions[
      role as keyof typeof rolePermissions
    ];

  if (!allowedRoutes)
    return false;

  return allowedRoutes.some(
    (route) =>
      pathname.startsWith(
        route
      )
  );
}