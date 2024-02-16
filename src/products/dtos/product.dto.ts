import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 100)
  shoeType: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 10)
  price: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 10)
  discountRate: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 200)
  description: string;

  @IsString()
  status: string;
}
