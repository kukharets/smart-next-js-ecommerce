'use client';
import { IProduct } from '@state/products';
import { useState } from 'react';
import { BookmarkIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

export const ProductCard = ({
  image,
  title,
  category,
  description,
  price,
}: IProduct) => {
  const [isNoImage, setIsNoImage] = useState(false);

  return (
    <div className="p-6 bg-white max-w-[270px] rounded-lg shadow-lg overflow-hidden relative group">
      <span className="relative">
        {!isNoImage ? (
          <img
            className="rounded-lg w-72 h-72 object-cover"
            src={image}
            alt={title}
            onError={() => {
              setIsNoImage(true);
            }}
          />
        ) : (
          <div className="rounded-lg max-w-[222px] h-[288px] flex items-center justify-center text-solid bg-main text-lg">
            No image
          </div>
        )}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-30 backdrop-filter backdrop-blur-lg hover:bg-gray-400 hover:bg-opacity-40 transition-all duration-300 px-4 py-2 rounded-lg text-white opacity-0 group-hover:opacity-100">
          View Details
        </button>
      </span>

      <div className="mt-4 space-y-3 flex-grow">
        <span className="px-3 py-1 text-sm font-semibold text-green-500 uppercase inline-flex items-center rounded-full">
          {category}
        </span>
        <h2 className="text-gray-800 text-md leading-tight truncate-2-lines min-h-[50px]">
          {title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-4  overflow-ellipsis overflow-hidden">
          {description}
        </p>
        <p className="text-xl font-bold text-orange-400">${price}</p>
        <div className="flex justify-between">
          <div className="cursor-pointer h-6 w-6 text-2xl text-secondary transition-transform duration-200 hover:scale-110">
            <ShoppingCartIcon className="h-full w-full" />
          </div>
          <button className="text-text bg-main-400 hover:bg-gradient-r hover:from-main-400 hover:to-secondary-400 transition-all duration-300">
            Add to cart
          </button>
          <div className="cursor-pointer h-6 w-6 text-2xl text-warning transition-transform duration-200 hover:scale-110">
            <BookmarkIcon className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
