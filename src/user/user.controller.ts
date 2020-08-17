import { AuthService } from 'src/auth/auth.service';
import { Controller, Post, Body, Get, Query, Headers, UseGuards, Res, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { assert, assertParams } from '../lib/assert';
import { Auth } from 'src/auth/auth.decorator';
import { FastifyRequest } from 'fastify'

@Controller('/v1/user')
export class UserController {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  @Post('/login')
  async login(@Body('account') account: string, @Body('password') password: string) {
    assertParams(account && password)

    const user = await this.prisma.user.findOne({
      where: {
        account
      }
    })
    assert(user, 400, '帳號不存在')
    assert(user.password === password, 400, '密碼錯誤')

    const { password: _, ...rest } = user

    return {
      token: this.authService.getJwtToken(rest)
    }
  }

  @Auth('admin')
  @Get('/checkJWT')
  async checkJWT(@Req() req: FastifyRequest) {
    return {
      user: req['user']
    }
  }
}
