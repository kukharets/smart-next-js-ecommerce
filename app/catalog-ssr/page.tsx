import { ProductCard } from '@components/ProductCard';
import { IProduct } from '@state/products';
import { Filter } from '@containers/Filter';

interface CatalogProps {
  searchParams: { page?: string; maxPrice?: string; minPrice?: string };
}

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const priceMaxRange = searchParams.maxPrice || 1000;
  const priceMinRange = searchParams.minPrice || 1;

  const res = await fetch(
    `http://localhost:4000/products?page=1&limit=10&price_min=${priceMinRange}&price_max=${priceMaxRange}`
  );
  const products: IProduct[] = await res.json();
  console.log(products);
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Filter products={products} />
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
