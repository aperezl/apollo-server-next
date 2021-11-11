import { PrismaClient } from '.prisma/client'
import { prisma } from '../lib/prisma'
import jwt from 'jsonwebtoken'

export type Context = {
  prisma: PrismaClient,
  user?: any
}

export async function createContext({ req }: any): Promise<Context> {
  let user
  const token = req.headers['authorization']
  console.log('token', token)
  if (token) {
    try {
      user = jwt.verify(token, process.env.SECRET || '')
    } catch(e) {
      console.log('error', e)
    }
  }

  return {
    prisma,
    user
  }
} 