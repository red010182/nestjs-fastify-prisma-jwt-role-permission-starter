import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth.constant'
import { AuthService } from './auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    })
  ],
  exports: [AuthService]
})
export class AuthMoudle{}
