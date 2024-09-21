interface Product {
    id: number;
    title: string;
}

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
    const products: Product[] = await res.json();

    return (
        <div className="h-full">
            <div className="catalog-filter"><h1>Product Titles (Page {page})</h1>
                <div>
                    {page > 1 && (
                        <a href={`?page=${page - 1}`}>
                            <button>Previous Page</button>
                        </a>
                    )}
                    <a href={`?page=${page + 1}`}>
                        <button>Next Page</button>
                    </a>
                </div>
            </div>
            <div className='flex flex-col h-full'>
                {products.map((product) => (
                    <li key={product.id} className="list-none">{product.title}</li>
                ))}
            </div>

            {/* Пагінація */}

        </div>
    );
}
