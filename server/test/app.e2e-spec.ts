import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDTO } from 'src/auth/dto';
import { UpdateBookmarkDto } from '../src/bookmark/dto/update-bookmark.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);

    prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3334');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDTO = {
      email: 'example@gmail.com',
      password: 'pass123',
    };

    describe('Sign up', () => {
      it('should throw if email was not provided', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password was not provided', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if body was not provided', () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400);
      });

      it('should sign up a new user', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201)
          .stores('userAccessToken', 'access_token');
      });
    });

    describe('Sign in', () => {
      it('should throw if email was not provided', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password was not provided', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if body was not provided', () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400);
      });

      it('should sign in user', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
    });
  });

  describe('Users', () => {
    describe('Get Current User', () => {
      it('should throw if no access token was provided', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });

      it('should return the user information based on the provided access token', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .expectStatus(200);
      });
    });

    describe('Edit User', () => {
      it('should throw if user is not authenticated', () => {
        const dto = {
          email: 'arthurlage@gmail.com',
        };

        return pactum
          .spec()
          .patch('/users/edit')
          .withBody(dto)
          .expectStatus(401);
      });

      it("should be able to edit user's email field", () => {
        const dto = {
          email: 'arthurlage2@gmail.com',
        };

        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(200);
      });

      it("should be able to edit user's firstName field", () => {
        const dto = {
          firstName: 'Arthur',
        };

        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(200);
      });

      it("should be able to edit user's lastName field", () => {
        const dto = {
          lastName: 'Lage',
        };

        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(200);
      });

      it("should be able to edit all user's information fields", () => {
        const dto = {
          email: 'arthurlage@gmail.com',
          firstName: 'Arthur',
          lastName: 'Lage',
        };

        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {
      it('should throw if no link was provided', () => {
        const dto = {
          title: 'Test bookmark',
          description: 'this is my test bookmark',
        };

        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw if no title was provided', () => {
        const dto = {
          description: 'this is my test bookmark',
          link: 'https://fakebookmarklink.com',
        };

        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(400);
      });

      it('should should be able to create a new bookmark without a description', () => {
        const dto = {
          title: 'Test bookmark',
          link: 'https://fakebookmarklink.com',
        };

        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(201)
          .stores(`bookmarkId`, 'id');
      });

      it('should be able to create a new bookmark', () => {
        const dto = {
          title: 'Test bookmark',
          description: 'this is my test bookmark',
          link: 'https://fakebookmarklink.com',
        };

        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Get Bookmarks', () => {
      it('should throw if user is not authenticated', () => {
        return pactum.spec().get('/bookmarks').expectStatus(401);
      });

      it("should return user's bookmarks", () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .expectStatus(200)
          .expectJsonLength(2);
      });
    });

    describe('Get Bookmark By Id', () => {
      it('should throw if user is not authenticated', () => {
        return pactum.spec().get(`/bookmarks/$S{bookmarkId}`).expectStatus(401);
      });

      it("should return a specific user's bookmark", () => {
        return pactum
          .spec()
          .get(`/bookmarks/$S{bookmarkId}`)
          .withPathParams('id', `$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .expectStatus(200)
          .expectBodyContains(`$S{bookmarkId}`);
      });
    });

    describe('Update Bookmark', () => {
      const dto: UpdateBookmarkDto = {
        title: 'Updated title',
        description: 'Updated description',
        link: 'https://updatedlink.com',
      };

      it('should throw if user is not authenticated', () => {
        return pactum
          .spec()
          .patch(`/bookmarks/$S{bookmarkId}`)
          .expectStatus(401);
      });

      it('should be able to update a bookmark without a title', () => {
        return pactum
          .spec()
          .patch(`/bookmarks/$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody({
            description: dto.description,
            link: dto.link,
          })
          .expectStatus(200);
      });

      it('should be able to update a bookmark without a description', () => {
        return pactum
          .spec()
          .patch(`/bookmarks/$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody({
            title: dto.title,
            link: dto.link,
          })
          .expectStatus(200);
      });

      it('should be able to update a bookmark without a link', () => {
        return pactum
          .spec()
          .patch(`/bookmarks/$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody({
            title: dto.title,
            description: dto.description,
          })
          .expectStatus(200);
      });

      it('should be able to update a bookmark', () => {
        return pactum
          .spec()
          .patch(`/bookmarks/$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Delete Bookmark by Id', () => {
      it('should throw if user is not authenticated', () => {
        return pactum
          .spec()
          .delete(`/bookmarks/$S{bookmarkId}`)
          .expectStatus(401);
      });

      it("should delete user's bookmark", () => {
        return pactum
          .spec()
          .delete(`/bookmarks/$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .expectStatus(200);
      });
    });

    describe('Delete Bookmarks', () => {
      it('should throw if user is not authenticated', () => {
        return pactum.spec().delete('/bookmarks').expectStatus(401);
      });

      it("should delete user's bookmarks", () => {
        return pactum
          .spec()
          .delete('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAccessToken}`,
          })
          .expectStatus(200);
      });
    });
  });
});
