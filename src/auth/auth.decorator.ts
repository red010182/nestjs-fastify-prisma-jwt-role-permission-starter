import { SetMetadata, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard'

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
