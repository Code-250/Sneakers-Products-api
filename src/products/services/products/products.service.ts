import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async update(id: number, productsDto: ProductsDto) {
    const product: Products = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException(
        `Product with id=${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.productRepository.update(id, productsDto);
  }

  async create(productDto: ProductsDto, uploadedImage: any) {
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
