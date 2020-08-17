import { Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  getJwtToken(user: any, options?: JwtSignOptions) {
    return this.jwtService.sign(user)
  }

  decodeJwtToken(token: string) {
    return this.jwtService.decode(token)
  }
}
