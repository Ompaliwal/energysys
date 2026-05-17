// lib/roles.ts
export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    CASHIER: "cashier",
    READER: "reader",
    CONSUMER: "consumer",

  } as const;
  
  export type Role = (typeof ROLES)[keyof typeof ROLES];