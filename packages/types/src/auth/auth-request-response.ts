import z from "zod";

export const TRegisterRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().optional(),
  password: z.string().min(8),
  roleId: z.string().optional(),
});

export const TLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TRegisterRequest = z.infer<typeof TRegisterRequestSchema>;
export type TLoginRequest = z.infer<typeof TLoginRequestSchema>;

export type TRoleResponse = {
  id: string;
  name: string;
  permissions?: any[];
  User?: any[];
  createdAt: Date;
  updatedAt: Date;
};

export type TRoleResponseWithPromise = Promise<TRoleResponse>;

export type TAuthResponse = {
  id: string;
  email: string;
  name: string;
  roleId: string;
  role?: TRoleResponse;
  Events?: any[];
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
};

export type TAuthResponseWithPromise = Promise<TAuthResponse>;

export type TTokenPayload = {
  id: string;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
};
