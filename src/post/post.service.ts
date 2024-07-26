import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(page: number, limit: number, search: string) {
    const [data, total] = await this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.title LIKE :search OR post.content LIKE :search', { search: `%${search}%` })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    return { data, total };
  }

  // async findOne(id: string) {
  //   const post = await this.postRepository.createQueryBuilder('post')
  //     .leftJoinAndSelect('post.author', 'author')
  //     .where('post.id = :id', { id })
  //     .getOne();

  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }

  //   return post;
  // }


  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  // async update(id: string, post: Partial<Post>): Promise<void> {
  //   await this.postRepository.update(id, post);
  // }

  // async delete(id: string): Promise<void> {
  //   await this.postRepository.delete(id);
  // }
  async update(id: string, post: Partial<Post>): Promise<void> {
    await this.postRepository.update(id, post);
  }

  async delete(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
