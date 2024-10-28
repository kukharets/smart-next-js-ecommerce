"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
const BATCH_SIZE = 100;
async function main() {
    try {
        const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
        const isValid = products.every((product) => product.title &&
            product.price &&
            product.description &&
            product.image &&
            product.category);
        if (!isValid) {
            console.error('Found products with missing fields.');
            return;
        }
        for (let i = 0; i < products.length; i += BATCH_SIZE) {
            const batch = products.slice(i, i + BATCH_SIZE);
            await prisma.$transaction(async (prisma) => {
                await Promise.all(batch.map(async (product) => {
                    await prisma.product.create({
                        data: {
                            title: product.title,
                            price: product.price,
                            description: product.description,
                            image: product.image,
                            category: {
                                connectOrCreate: {
                                    where: { id: product.category.id },
                                    create: { name: product.category.name },
                                },
                            },
                        },
                    });
                }));
            });
            console.log(`Successfully imported a batch of ${batch.length} products.`);
        }
        console.log('Import completed successfully.');
    }
    catch (error) {
        console.error('Error during import: ', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((e) => console.error(e));
//# sourceMappingURL=import-products.js.map