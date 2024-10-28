import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PrismaService } from './prisma.service';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class AppModule {}
