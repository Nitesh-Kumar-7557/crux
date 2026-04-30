export interface jwtPayload {
  id: number;
  role: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
}
