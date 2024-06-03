import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/constant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
// https://chatgpt.com/c/16fef2f7-950c-48fd-a52c-614951003b67
