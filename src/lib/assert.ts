import { HttpException } from '@nestjs/common'

export const assert = (pass: any, statusCode: number = 500, message: string = '異常錯誤') => {
  if(!pass) {
    throw new HttpException(message, statusCode)
  }
}

export const assertParams = (pass: any) => {
  if(!pass) {
    throw new HttpException('參數錯誤', 400)
  }
}
