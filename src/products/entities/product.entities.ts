import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductStatus {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  shoeType: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  discountRate: string;

  @Column({ type: 'enum', default: ProductStatus.PENDING, enum: ProductStatus })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
