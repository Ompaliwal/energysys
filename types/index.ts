// types/index.ts

export type Role = "admin" | "manager" | "cashier" | "reader";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthPayload {
  userId: string;
  role: Role;
}

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface ILoginInput {
  email: string;
  password: string;
}