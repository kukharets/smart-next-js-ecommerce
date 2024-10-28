import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateImagePaths() {
  try {
    const products = await prisma.product.findMany();

    const updatePromises = products.map((product) => {
      const updatedImage = product.image.replace(
        '/static',
        process.env.CLOUDFLARE_PUBLIC_R2_BUCKET_URL,
      );

      console.log(`Updating product ID: ${product.id}, Image: ${updatedImage}`);

      return prisma.product.update({
        where: { id: product.id },
        data: { image: updatedImage },
      });
    });

    await Promise.all(updatePromises);
    console.log('Image paths updated successfully.');
  } catch (error) {
    console.error('Error updating image paths:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImagePaths();
