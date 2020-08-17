import { SetMetadata, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard'

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
  );
}
