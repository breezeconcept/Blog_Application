import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { post: { id: postId } } });
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async create(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async update(id: string, comment: Partial<Comment>): Promise<void> {
    await this.commentRepository.update(id, comment);
  }

  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
