import { AuthService } from 'src/auth/auth.service';
import { Controller, Post, Body, Get, Req, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { assert, assertParams } from '../lib/assert';
import { Auth } from 'src/auth/auth.decorator';
import { FastifyRequest } from 'fastify'
import * as md5 from 'md5'

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
    assert(user, 400, 'account not exist')
    assert(user.password === md5(password), 400, 'invalid password')

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

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    assertParams(id)
    const { password: _, ...user } = await this.prisma.user.findOne({
      where: {
        id: +id
      }
    })
    return user
  }
}
