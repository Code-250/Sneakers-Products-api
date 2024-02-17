import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/products/entities/product.entities';
import { ProductsDto } from 'src/products/dtos/product.dto';
import { Products } from 'src/products/interfaces/products/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async delete(id: number) {
    const product: Products = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException(
        `Product with id=${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.productRepository.delete(id);
  }

  async update(id: number, productsDto: ProductsDto, file: string) {
    const product: Products = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException(
        `Product with id=${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedData = {
      title: productsDto.title || product.title,
      shoeType: productsDto.shoeType || product.shoeType,
      discountRate: productsDto.discountRate || product.discountRate,
      description: productsDto.description || product.description,
      imageUrl: file || product.imageUrl,
      status: productsDto.status || product.status,
      price: productsDto.price || product.price,
    };
    return this.productRepository.update(id, updatedData);
  }

  async create(productDto: ProductsDto, uploadedImage: string) {
    const existProduct = await this.productRepository.findOne({
      where: { title: productDto.title },
    });
    if (existProduct) {
      throw new BadRequestException('You have already created this Product');
    }
    const newProduct = this.productRepository.create({
      ...productDto,
      imageUrl: uploadedImage,
    });
    const saveProduct = await this.productRepository.save(newProduct);
    if (!saveProduct) {
      throw new HttpException(`create product failed`, HttpStatus.BAD_REQUEST);
    }
    return saveProduct;
  }

  async findOne(id: number) {
    const foundProduct = await this.productRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new HttpException(
        `Product with id=${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundProduct;
  }

  async findAll() {
    return this.productRepository.find();
  }
}
