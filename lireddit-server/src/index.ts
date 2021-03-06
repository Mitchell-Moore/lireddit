import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { COOKIE_NAME, __prod__ } from './constansts';
import { MyContext } from './types';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 Years
        httpOnly: true,
        secure: __prod__, //cookie only works in https
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    })
  );

  app.set('trust proxy', __prod__);

  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();

  //Need to set apollot cors to false as node cor middle set above causing collision
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main();
