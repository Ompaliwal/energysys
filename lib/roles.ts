// lib/roles.ts
export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    CASHIER: "cashier",
    READER: "reader",
  } as const;
  
  export type Role = (typeof ROLES)[keyof typeof ROLES];