import { ProductCard } from '@components/ProductCard';
import { IProduct } from '@state/products';
import { Filter } from '@app/catalog-ssr/Filter';

interface CatalogProps {
  searchParams: { page?: string; maxPrice?: string };
}

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const productsPerPage = 10;
  const priceMaxRange = searchParams.maxPrice
    ? parseInt(searchParams.maxPrice)
    : 100;

  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?limit=${productsPerPage}&offset=${
      (page - 1) * productsPerPage
    }&price_min=1&price_max=${priceMaxRange}`
  );
  const products: IProduct[] = await res.json();

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Filter />
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
