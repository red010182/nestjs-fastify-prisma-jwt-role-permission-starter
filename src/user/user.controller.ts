import { AuthService } from 'src/auth/auth.service';
import { Controller, Post, Body, Get, Req, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { assert, assertParams } from '../lib/assert';
import { Auth } from 'src/auth/auth.decorator';
import { FastifyRequest } from 'fastify'
import * as md5 from 'md5'

const UserSelectFields = {
  id: true,
  name: true,
  roleID: true,
  account: true,
  role: true,
}
@Controller('/v1/user')
export class UserController {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  @Post('/login')
  async login(@Body('account') account: string, @Body('password') password: string) {
    assertParams(account && password)

    const user = await this.prisma.user.findOne({
      where: {
        account,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    assert(user, 400, 'account does not exist')
    assert(user.password === md5(password), 400, 'invalid password')

    const { password: _, ...rest } = user

    const permissions = await this.prisma.permission.findMany({
      where: {
        rolePermission: {
          every: {
            roleID: user.roleID
          }
        }
      }
    })

    const out = { ...rest, permissions }

    return {
      user: out,
      token: this.authService.getJwtToken(rest)
    }
  }

  @Auth()
  @Get('/me')
  async me(@Req() req: FastifyRequest) {
    return {
      user: req['user'],
    }
  }

  @Get('')
  async getUsers() {
    return await this.prisma.user.findMany({
      select: UserSelectFields,
      where: {
        roleID: {
          not: null
        }
      }
    })
  }
}
