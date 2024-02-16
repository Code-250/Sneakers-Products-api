import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products/products.controller';
import { ProductEntity } from './entities/product.entities';
import { ProductsService } from './services/products/products.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
