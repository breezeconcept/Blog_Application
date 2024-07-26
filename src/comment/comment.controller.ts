import { Controller, Get, Post as HttpPost, Put, Delete, Param, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { PostService } from '../post/post.service';


@Controller('posts/:postId/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    // private readonly postService: PostService,
  ) {}

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentService.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }



  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(
    @Param('postId') postId: string,
    @Body('content') content: string,
    @Request() req,
  ) {
    const user = req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.commentService.create(content, user, postId);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() comment: Partial<Comment>,
    @Request() req,
  ) {
    console.log('Authenticated User:', req.user); 
    const existingComment = await this.commentService.findOne(id);
    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }
    if (existingComment.author.id !== req.user.id) {
      return { message: 'You can only update your own comments' };
    }
    return this.commentService.update(id, comment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const existingComment = await this.commentService.findOne(id);
    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }
    if (existingComment.author.id !== req.user.id) {
      return { message: 'You can only delete your own comments' };
    }
    return this.commentService.delete(id);
  }
}
