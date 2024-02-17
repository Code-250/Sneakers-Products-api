import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  imageUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  shoeType: string;

  @IsNotEmpty()
  @ApiProperty()
  price: string;

  @IsNotEmpty()
  @ApiProperty()
  discountRate: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
