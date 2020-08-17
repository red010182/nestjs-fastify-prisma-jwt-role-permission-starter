import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthMoudle } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthMoudle]
})
export class AppModule {}
