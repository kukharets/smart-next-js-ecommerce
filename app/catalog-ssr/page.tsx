import { ProductCard } from '@components/ProductCard';
import { IProduct } from '@state/products';

interface CatalogProps {
  searchParams: { page?: string };
}

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const productsPerPage = 10;

  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?limit=${productsPerPage}&offset=${
      (page - 1) * productsPerPage
    }`
  );
  const products: IProduct[] = await res.json();

  return (
    <div>
      <div className="flex gap-1 flex-col">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
