import { HttpException } from '@nestjs/common'

export const assert = (pass: any, statusCode: number = 500, message: string = 'Internal Server Error') => {
  if(!pass) {
    throw new HttpException(message, statusCode)
  }
}

export const assertParams = (pass: any) => {
  if(!pass) {
    throw new HttpException('Invalid Parameters', 400)
  }
}
