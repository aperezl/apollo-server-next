import { PrismaClient } from '.prisma/client'
import { prisma } from '../lib/prisma'
import jwt from 'jsonwebtoken'

export type Context = {
  prisma: PrismaClient,
  user?: any
}

export async function createContext({ req }: any): Promise<Context> {
  let user
  console.log('headers:', req.headers)
  const token = req.headers['authorization']
  console.log('token', token, process.env.SECRET)
  if (token) {
    try {
      user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET ?? '')
    console.log('user', user)
    } catch(e) {
      console.log('error', e)
    }
  }

  return {
    prisma,
    user
  }
} 