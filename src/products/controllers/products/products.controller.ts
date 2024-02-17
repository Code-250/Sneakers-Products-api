import {
  Body,
  Controller,
  Delete,
  Param,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProductsDto } from 'src/products/dtos/product.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsFile } from 'nestjs-form-data';
import { Response } from 'src/__shared__/dto/response.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private cloudinary: CloudinaryService,
  ) {}

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return new Response('Sneakers retrieved', products);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  async uploadImageToCloudinary(file: any) {
    return await this.cloudinary.uploadFile(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  @Post()
  @IsFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() productDto: ProductsDto,
  ) {
    const imageUploaded = await this.uploadImageToCloudinary(file);
    const productCreated = await this.productsService.create(
      productDto,
      imageUploaded.secure_url,
    );
    return new Response('Product created', productCreated);
  }

  @Patch(':id')
  @IsFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: ProductsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUploaded = await this.uploadImageToCloudinary(file);
    const foundProduct = await this.productsService.update(
      id,
      productDto,
      imageUploaded.secure_url,
    );
    return new Response('found Product', foundProduct);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const removedProduct = await this.productsService.delete(id);
    return new Response('removed Product', removedProduct);
  }
}
