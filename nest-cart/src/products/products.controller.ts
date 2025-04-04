import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  search(@Query('name') name: string): Promise<Product[]> {
    return this.productsService.searchByName(name);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',  // Store images in 'uploads' folder
      filename: (req, file, cb) => {
        // Generate a unique name for each uploaded file
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);  // Use unique name as filename
      }
    })
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,  // Receive the uploaded file
    @Body() productData: Omit<Product, 'id'>   // Receive the product data
  ): Promise<Product> {
    // Create the URL for the uploaded image
    const imageUrl = file ? `/uploads/${file.filename}` : 'default-product.png';

    // Store the product with the image URL
    return this.productsService.create({
      ...productData,
      image: imageUrl,  // Store the image path in the database
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
