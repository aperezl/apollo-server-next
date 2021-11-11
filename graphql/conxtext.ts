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
  if (token) {
    user = jwt.verify(token, process.env.SECRET || '')
  }

  return {
    prisma,
    user
  }
} 