import { IProduct } from '@state/products';

export const ProductCard = ({
  images,
  title,
  category,
  description,
  price,
}: IProduct) => {
  return (
    <div className="m-5 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl p-6 bg-white max-w-xl rounded-lg shadow-lg overflow-hidden">
      <img
        className="rounded-lg w-full h-72 object-cover"
        src={images[0]}
        alt={title}
      />
      <div className="mt-4 space-y-3 flex-grow">
        <span className="px-3 py-1 text-sm font-semibold text-green-500 uppercase inline-flex items-center rounded-full">
          {category.name}
        </span>
        <h2 className="text-gray-800 text-md leading-tight truncate-2-lines min-h-[50px]">
          {title}
        </h2>
        <p className="text-gray-600 text-sm truncate-3-lines">{description}</p>
        <p className="text-xl font-bold text-orange-400">${price}</p>
        <button className="w-full lg text-white bg-main-400 hover:bg-gradient-r hover:from-main-400 hover:to-secondary-400 transition-all duration-300">
          Buy now
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={category.image}
          alt={category.name}
        />
      </div>
    </div>
  );
};
