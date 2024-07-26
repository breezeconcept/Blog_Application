// src/post/post.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as BlogPost } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    const { data, total } = await this.postService.findAll(page, limit, search);
    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() post: BlogPost, @Request() req) {
    post.author = req.user;
    return this.postService.create(post);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() post: Partial<BlogPost>,
    @Request() req,
  ) {
    const existingPost = await this.postService.findOne(id);
    if (existingPost.author.id !== req.user.userId) {
      return { message: 'You can only update your own posts' };
    }
    return this.postService.update(id, post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const existingPost = await this.postService.findOne(id);
    if (existingPost.author.id !== req.user.userId) {
      return { message: 'You can only delete your own posts' };
    }
    return this.postService.delete(id);
  }
}
