import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum'
import { AuthDTO } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService

  const BASE_URL = "http://localhost:3333"

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
    await app.listen(3334)
    
    prisma = app.get(PrismaService)

    await prisma.cleanDb()
    pactum.request.setBaseUrl("http://localhost:3334")
  });

  afterAll(() => {
    app.close();
  });
  
  describe("Auth", () => {
    const dto: AuthDTO = {
      email: "example@gmail.com",
      password: "pass123"
    }

    describe("Sign up", () => {
      it("should throw if email was not provided", () => {
        return pactum.spec().post(`/auth/signup`).withBody({
          password: dto.password
        }).expectStatus(400)
      })

      it("should throw if password was not provided", () => {
        return pactum.spec().post(`/auth/signup`).withBody({
          email: dto.email
        }).expectStatus(400)
      })

      it("should throw if body was not provided", () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400)
      })

      it("should sign up a new user", () => {
        return pactum.spec().post(`/auth/signup`).withBody(dto).expectStatus(201).stores("userAccessToken", "access_token")
      })
    })

    describe("Sign in", () => {
      it("should throw if email was not provided", () => {
        return pactum.spec().post(`/auth/signup`).withBody({
          password: dto.password
        }).expectStatus(400)
      })

      it("should throw if password was not provided", () => {
        return pactum.spec().post(`/auth/signup`).withBody({
          email: dto.email
        }).expectStatus(400)
      })

      it("should throw if body was not provided", () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400)
      })

      it("should sign in user", () => {
        return pactum.spec().post("/auth/signin").withBody(dto).expectStatus(200).stores("userAccessToken", "access_token")
      })
    })
  })
  
  describe("Users", () => {
    describe("Get Current User", () => {
      it('should throw if no access token was provided', () => {
        return pactum.spec().get("/users/me").expectStatus(401)
      })

      it('should return the user information based on the provided access token', () => {
        return pactum.spec().get("/users/me").withHeaders({
          Authorization: `Bearer $S{userAccessToken}`
        }).expectStatus(200)
      })
    })

    describe("Edit User", () => {
      
    })
  })

  describe("Bookmarks", () => {
    describe("Get Bookmarks", () => {})

    describe("Get Bookmark By Id", () => {})

    describe("Create Bookmark", () => {})

    describe("Update Bookmark", () => {})

    describe("Delete Bookmarks", () => {})
  })
});
