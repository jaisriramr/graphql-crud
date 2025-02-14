const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const connectDB = require("./database");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

connectDB();

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log("Server running on PORT ", process.env.PORT);
  });
}

startServer();
