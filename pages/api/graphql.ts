import { ApolloServer, gql } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import { resolvers } from "../../graphql/resolvers";
import { readFileSync } from 'fs'
import Cors from 'micro-cors'
import { createContext } from "../../graphql/conxtext";
import { join } from 'path'

const cors = Cors()

const loadTypeDef = (schema: string) => gql(readFileSync(join(process.cwd(), 'graphql/schema', `${schema}.gql`), 'utf8'))

const apolloServer = new ApolloServer({
  typeDefs: [
    loadTypeDef('User'),
    loadTypeDef('Product'),
    loadTypeDef('Auth'),
    loadTypeDef('Customer'),
    loadTypeDef('Order'),
  ],
  resolvers,
  context: createContext
})

const startServer = apolloServer.start()


export default cors(async function handler(req: MicroRequest, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false
  }
}