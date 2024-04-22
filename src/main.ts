import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.intercepter';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', "views"));

  //Validator
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  //End validator

  //Guard global
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //End guard global
  app.setViewEngine('ejs');

  //CORS
  app.enableCors({
    origin: [
      "https://itviecclonefe.vercel.app",
      "http://localhost:3000"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true //FE và BE trao đổi cookie với nhau
  });
  //End CORS

  //Versioning
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    //defaultVersion: ['1', '2']
    defaultVersion: ['1']
  })
  //End versioning

  //Set cookieParse
  app.use(cookieParser());
  //End set cookieParse

  //Helmet
  app.use(helmet());
  //End helmet

  //swagger
  const config = new DocumentBuilder()
    .setTitle('ITviec Clone')
    .setDescription('The ITviec clone API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //localhost:8000/swagger
  SwaggerModule.setup('swagger', app, document,
    {
      swaggerOptions: {
        //Lưu lại authToken khi refresh lại web
        persistAuthorization: true
      }
    }
  );
  //End swagger

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
