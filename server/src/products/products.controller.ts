import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('price_min') priceMin: string,
    @Query('price_max') priceMax: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const minPrice = parseFloat(priceMin) || 0;
    const maxPrice = parseFloat(priceMax) || 100;
    console.log('[[ GET PRODUCTS ]]');
    return this.productsService.getProducts(
      pageNumber,
      limitNumber,
      minPrice,
      maxPrice,
    );
  }
}
