// main file

// static imports
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// env
import dotenv from "dotenv";
dotenv.config();

// relative import
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

const server = async () => {
  // database connnection
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up(); // automating the migration process

  // intializing the app
  const app = express();

  const apolloServer = new ApolloServer({
    // connecting to the graphql end base
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false, // to not use class validator
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Server started at localhost:5000");
  });

  // post
  // const post = orm.em.create(Post, { title: "first post!" });
  // await orm.em.persistAndFlush(post);

  // just a console.log for separating these 2
  console.log("------------sql2------------");
};

server().catch((err) => console.log(err));
