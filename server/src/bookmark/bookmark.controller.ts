import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor (private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks (@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @Get(':id')
  getBookmarkById (@GetUser('id') userId: string, @Param('id') bookmarkId: string) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId)
  }

  @Post()
  createBookmark (@GetUser('id') userId: string, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(userId, dto)
  }

  @Patch(':id')
  updateBookmark (@Param('id') bookmarkId: string, @Body() dto: UpdateBookmarkDto) {
    return this.bookmarkService.updateBookmark(bookmarkId, dto)
  }

  @Delete()
  deleteBookmarks (@GetUser('id') userId: string) {
    return this.bookmarkService.deleteBookmarks(userId)
  }

  @Delete(':id')
  deleteBookmarkById (@Param('id') bookmarkId: string) {
    return this.bookmarkService.deleteBookmarkById(bookmarkId)
  }
}
