import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { runtimeConfig } from './__shared__/config/appConfig';
import { TypeOrmFactoryConfigService } from './__shared__/config/typeorm-factory.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [runtimeConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmFactoryConfigService,
    }),
    ProductsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}
  async onApplicationBootstrap(): Promise<void> {
    if (this.configService.get('env') !== 'production') {
    }
  }
}
