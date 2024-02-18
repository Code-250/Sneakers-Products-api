import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { isRunningInProduction } from './__shared__/utils/env.util';
import { configureSwagger } from './__shared__/config/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.setGlobalPrefix('api/v1');
  configureSwagger(app);

  // if (!isRunningInProduction()) {
  //   configureSwagger(app);
  // }
  await app.listen(port || 3000);
  Logger.log(`Server is running on port=${port}`);
}
bootstrap();
