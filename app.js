const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const connectDB = require("./database");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

connectDB();

const getUserFromToken = (token) => {
  try {
    if (token) {
      const SECRET_KEY = process.env.SECRET_KEY;
      return jwt.verify(token, SECRET_KEY);
    }
    return null;
  } catch (err) {
    return null;
  }
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = getUserFromToken(token.replace("Bearer ", ""));
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log("Server running on PORT ", process.env.PORT);
  });
}

startServer();
