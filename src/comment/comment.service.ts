import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { PostService } from '../post/post.service';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}


  async findAll(postId: string) {
    return this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author') 
      .where('comment.postId = :postId', { postId })
      .getMany();
  }

  
  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id }, relations: ['author'] });
  }
  

  async create(content: string, author: User, postId: string): Promise<Comment> {
    const post = await this.postService.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const comment = this.commentRepository.create({
      content,
      authorId: author.id,
      postId: post.id,
    });
    return this.commentRepository.save(comment);
  }



  async update(id: string, comment: Partial<Comment>): Promise<void> {
    await this.commentRepository.update(id, comment);
  }

  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
