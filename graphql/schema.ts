import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    links: String
  }

  type User {
    id: ID!
    email: String!
    name: String
    created: String
  }

  type Mutation {
    createUser: User
  }
`