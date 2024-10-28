import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: string, limit: string, priceMin: string, priceMax: string): Promise<{
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
        categoryId: number;
    }[]>;
}
