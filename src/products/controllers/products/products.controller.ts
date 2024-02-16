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
} from '@nestjs/common';
import { ProductsDto } from 'src/products/dtos/product.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private cloudinary: CloudinaryService,
  ) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log('uploading data');
      const uploadedImage = await this.cloudinary.uploadImage(file.path);
      console.log('upload', uploadedImage);

      return uploadedImage;
    } catch (error) {
      console.log('Error Uploading Image', error);
      throw new Error('Failed to upload Image');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() productDto: ProductsDto,
  ) {
    const imageUploaded = this.uploadImageToCloudinary(file);
    console.log(imageUploaded, 'these images');
    return this.productsService.create(productDto, imageUploaded);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: ProductsDto,
  ) {
    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
