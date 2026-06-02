import { Role } from '../../auth/enums/role.enum';

export interface UserResponse {
  userId: number;
  name: string;
  email: string;
  role: Role;
}
