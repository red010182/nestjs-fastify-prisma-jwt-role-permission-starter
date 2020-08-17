import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthMoudle } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [AuthMoudle],
})
export class UserModule {}
