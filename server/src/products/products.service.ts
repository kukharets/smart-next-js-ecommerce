import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    page: number,
    limit: number,
    priceMin: number,
    priceMax: number,
  ) {
    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        price: {
          gte: priceMin,
          lte: priceMax,
        },
      },
    });
  }
}
