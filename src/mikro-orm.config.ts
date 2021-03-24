// static import
import { MikroORM } from "@mikro-orm/core";
import path from "path";

// relative import
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
  // default values:
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false, // this is to not disabling foriegn keys
  },

  entities: [Post],
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
