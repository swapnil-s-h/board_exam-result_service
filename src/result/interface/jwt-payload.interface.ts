import { Role } from 'src/auth/enums/role.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
