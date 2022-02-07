import { __prod__ } from './constansts';
import { Post } from './entities/Post';
import { Options } from '@mikro-orm/core';
import path from 'path';
import { User } from './entities/User';

const config: Options = {
  entities: [Post, User],
  dbName: 'lireddit',
  type: 'postgresql',
  debug: !__prod__,
  user: 'mitchellmoore',
  migrations: {
    path: path.join(__dirname, '/migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};
export default config;
