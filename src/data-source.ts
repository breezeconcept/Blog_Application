import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Comment } from './comment/comment.entity'; // Include other entities

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Post, Comment], // List all entities
  migrations: ['src/migrations/*.ts'], // Path for migration files
  synchronize: false, // Migrations are used to manage schema
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
