const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type AuthPayload {
    user: User
    token: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): String
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
