import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Param('postId') postId: string, @Body() comment: Comment, @Request() req) {
    comment.author = req.user.userId;
    comment.post = { id: postId } as any;
    return this.commentService.create(comment);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() comment: Partial<Comment>, @Request() req) {
    const existingComment = await this.commentService.findOne(id);
    if (existingComment.author !== req.user.userId) {
      return { message: 'You can only update your own comments' };
    }
    return this.commentService.update(id, comment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const existingComment = await this.commentService.findOne(id);
    if (existingComment.author !== req.user.userId) {
      return { message: 'You can only delete your own comments' };
    }
    return this.commentService.delete(id);
  }
}
