import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  searchByName(name: string): Promise<Product[]> {
    return this.productRepository.find({ where: { name: Like(`%${name}%`) } });
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    return this.productRepository.save(productData);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (!result.affected) throw new NotFoundException(`Product with ID ${id} not found`);
  }
}