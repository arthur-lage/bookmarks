import { Injectable, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: string) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });

    return bookmarks;
  }

  async getBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        id: bookmarkId,
      },
    });

    return bookmark;
  }

  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });

    return bookmark;
  }

  async updateBookmark(bookmarkId: string, dto: UpdateBookmarkDto) {
    await this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });

    return HttpCode(HttpStatus.OK);
  }

  async deleteBookmarks(userId: string) {
    await this.prisma.bookmark.deleteMany({
      where: {
        userId,
      },
    });

    return HttpCode(HttpStatus.OK);
  }

  async deleteBookmarkById(bookmarkId: string) {
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });

    return HttpCode(HttpStatus.OK);
  }
}
