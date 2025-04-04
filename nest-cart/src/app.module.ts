import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { UploadsController } from './uploads.controller'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Souhayel111*',
      database: 'products_db',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [UploadsController],
})
export class AppModule {}