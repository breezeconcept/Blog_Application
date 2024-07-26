// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(page: number, limit: number, search: string): Promise<{ data: Post[], total: number }> {
    const [data, total] = await this.postRepository.findAndCount({
      where: search ? { title: Like(`%${search}%`) } : {},
      take: limit,
      skip: (page - 1) * limit,
      relations: ['author'],
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(id: string, post: Partial<Post>): Promise<void> {
    await this.postRepository.update(id, post);
  }

  async delete(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
