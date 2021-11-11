import { Context } from './conxtext'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '.prisma/client'


const createToken = (user: User, secret: string, expiresIn: any) => {
  const { id, name, email } = user
  return jwt.sign({ id, name, email }, secret, { expiresIn })
}

export const resolvers = {
  Query: {
    getUser: async (_: unknown, { token }: any, ctx: Context) => {
      return await jwt.verify(token, process.env.SECRET ?? '')
    },
    getProducts: async (_: unknown, __: unknown, ctx: Context) => {
      return await ctx.prisma.product.findMany({})
    },
    getProduct: async (_: unknown, { id }: any, ctx: Context) => {
      const product = await ctx.prisma.product.findUnique({ where: { id } })
      if (!product) {
        throw new Error('Product not Found')
      }
      return product
    },
    getCustomers: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.customer.findMany({})
    },
    getCustomersBySeller: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.customer.findMany({ where: { userId: ctx.user.id } })
    },
    getCustomer: async (_: unknown, { id }: any, ctx: Context) => {
      const customer = await ctx.prisma.customer.findUnique({ where: { id }})
      if (!customer) {
        throw new Error('Customer not Found')
      }
      if (customer.userId !== ctx.user.id) {
        throw new Error('Customer not Found')
      }
      return customer
    },
    getOrders: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.order.findMany({
        include: {
          Order: true
        }
      })
    },
    getOrdersByUser: async (_: unknown, __: unknown, ctx: Context) => {
      return ctx.prisma.order.findMany({
        where: {
          userId: ctx.user.id
        },
        include: {
          Order: true
        }
      })
    },
    getOrder: async (_: unknown, { id }: any, ctx: Context) => {
      const order = await ctx.prisma.order.findUnique({ where: { id }})
      if (!order) {
        throw new Error('Order not Found')
      }
      if (order.userId !== ctx.user.id) {
        throw new Error('Order not Found')
      }      
      return ctx.prisma.order.findUnique({
        where: {
          id
        },
        include: {
          Order: true
        }
      })
    },
    getOrderByStatus: async (_: unknown, { status }: any, ctx: Context) => {
      return await ctx.prisma.order.findMany({ where: {
        userId: ctx.user.id,
        status
      } })
    },
    getBestCustomers: async (_: unknown, { status }: any, ctx: Context) => {
      const top = await ctx.prisma.order.groupBy({
        by: ['customerId'],
        
        where: {
          status: 'PENDING'
        },
        _sum: {
          total: true
        },
        orderBy: {
          _sum: {
            total: 'desc'
          }
        },
        take: 10,
      })
      return  top.map(t => ({
        total: t._sum.total,
        customer: {
          id: t.customerId
        }
      }))
    },
    getBestUsers: async (_: unknown, { status }: any, ctx: Context) => {
      const top =  await ctx.prisma.order.groupBy({
        by: ['userId'],
        
        where: {
          status: 'PENDING'
        },
        _sum: {
          total: true
        },
        orderBy: {
          _sum: {
            total: 'desc'
          }
        },
        take: 10,
      })
      const x = top.map(t => ({
        total: t._sum.total,
        user: {
          id: t.userId
        }
      }))
      console.log({ x })
      return x
    },
    searchProduct: async (_: unknown, { text }: any, ctx: Context) => {
      return await ctx.prisma.product.findMany({
        where: {
          name: {
            contains: text,
            mode: 'insensitive'
          }
        },
        take: 10
      })
    }

  },
  Mutation: {
    createUser: async (_: unknown, { input } : any, ctx: Context): Promise<User> => {
      const { email, password } = input
      const existsUser = await ctx.prisma.user.findUnique({
        where: { email }
      })
      if (existsUser) {
        throw new Error('User Exists')
      }
      const salt = await bcrypt.genSalt(10)
      input.password = await bcrypt.hash(password, salt)
      return ctx.prisma.user.create({
        data: input
      })
    },
    signIn: async (_: unknown, { input }: any, ctx: Context) => {
      const { email, password } = input
      const existsUser = await ctx.prisma.user.findUnique({
        where: { email }
      })
      if (!existsUser) {
        throw new Error('User Not Exists')
      }
      const correctPassword = await bcrypt.compare(password, existsUser.password)
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
      return {
        token: createToken(existsUser, process.env.SECRET ?? '', '24h')
      }
    },
    createProduct: async (_: unknown, { input }: any, ctx: Context) => {
      return ctx.prisma.product.create({ data: input })
    },
    updateProduct: async (_: unknown, { id, input }: any, ctx: Context) => {
      const product = await ctx.prisma.product.findUnique({ where: { id } })
      if (!product) {
        throw new Error('Product not Found')
      }
      return await ctx.prisma.product.update({
        where: { id },
        data: input
      })
    },
    deleteProduct: async (_: unknown, { id }: any, ctx: Context) => {
      const product = await ctx.prisma.product.findUnique({ where: { id } })
      if (!product) {
        throw new Error('Product not Found')
      }
      return await ctx.prisma.product.delete({ where: { id } })
    },
    createCustomer: async (_: unknown, { input }: any, ctx: Context) => {
      const { email } = input
      console.log(input)
      const customer = await ctx.prisma.customer.findUnique({  where: { email } })
      if (customer) {
        throw new Error('Client exists')
      }
      input.userId = ctx.user.id
      return ctx.prisma.customer.create({ data: input })
    },
    updateCustomer: async (_: unknown, { id, input }: any, ctx: Context) => {
      const customer = await ctx.prisma.customer.findUnique({ where: { id } })
      if (!customer) {
        throw new Error('Customer not Found')
      }
      if (customer.userId !== ctx.user.id) {
        throw new Error('Customer not Found')
      }
      return await ctx.prisma.customer.update({
        where: { id },
        data: input
      })
    },
    deleteCustomer: async (_: unknown, { id }: any, ctx: Context) => {
      const customer = await ctx.prisma.customer.findUnique({ where: { id } })
      if (!customer) {
        throw new Error('Customer not Found')
      }
      if (customer.userId !== ctx.user.id) {
        throw new Error('Customer not Found')
      }
      return await ctx.prisma.customer.delete({ where: { id } })
    },
    createOrder: async (_: unknown, { input }: any, ctx: Context) => {
      const { customerId, orders } = input
      const customer = await ctx.prisma.customer.findUnique({ where: { id: customerId } })
      if (!customer) {
        throw new Error('Customer not Found')
      }
      if (customer.userId !== ctx.user.id) {
        throw new Error('Customer not Found')
      }
      for await (const order of orders) {
        const product = await ctx.prisma.product.findUnique({ where: { id: order.productId } })
        console.log('product', product?.stock, order.amount)
        if (!product || order.amount > product?.stock) {
          throw new Error(`product ${product?.name} not exists`)
        }
      }

      for await (const order of orders) {
        await ctx.prisma.product.update({ 
          where: {
            id: order.productId
          },
          data: {
            stock: {
              decrement: order.amount
            }
          }
        })
      }
      input.userId = ctx.user.id
      const order = await ctx.prisma.order.create({ data: {
        customerId: input.customerId,
        userId: input.userId,
        total: input.total,
        status: input.status,
        Order: {
          create: input.orders
        }
      }})
      return order
    },
    updateOrder: async (_: unknown, { id, input }: any, ctx: Context) => {
      const { orders } = input
      const order = await ctx.prisma.order.findUnique({ where: { id } })
      if (!order) {
        throw new Error('Order not exists')
      }
      const customer = await ctx.prisma.customer.findUnique({ where: { id: order.customerId } })
      if (!customer) {
        throw new Error('Customer not exists')
      }

      if (
        customer.userId !== ctx.user.id ||
        order.userId !== ctx.user.id
        ) {
        throw new Error('Customer not Found')
      }

      for await (const order of orders) {
        const product = await ctx.prisma.product.findUnique({ where: { id: order.productId } })
        if (!product /* || order.amount > product?.stock */) {
          throw new Error(`product ${product?.name} not exists`)
        }
      }

      for await (const order of orders) {
        await ctx.prisma.product.update({ 
          where: {
            id: order.productId
          },
          data: {
            stock: {
              decrement: order.amount
            }
          }
        })
      }

      await ctx.prisma.orderDetail.deleteMany({ where: { orderId: id } })
      return ctx.prisma.order.update({
        where: { id },
        data: {
          status: input.status,
          Order: {
            create: input.orders,
          }
        },
        include: {
          Order: true
        }
      })
    },
    deleteOrder: async (_: unknown, { id }: any, ctx: Context) => {
      const order = await ctx.prisma.order.findUnique({ where: { id } })
      if (!order) {
        throw new Error('Order not exists')
      }
      if (order.userId !== ctx.user.id) {
        throw new Error('Order not exists')
      }
      return ctx.prisma.order.delete({
        where: { id},
        include: {
          Order: true
        }
      })
    }
  }
}