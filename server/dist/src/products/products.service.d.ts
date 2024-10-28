import { PrismaService } from '../prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    getProducts(page: number, limit: number, priceMin: number, priceMax: number): Promise<{
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
        categoryId: number;
    }[]>;
}
