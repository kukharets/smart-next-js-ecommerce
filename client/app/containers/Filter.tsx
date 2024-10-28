'use client';
import { useEffect, useState } from 'react';
import { PriceSlider } from '@components/PriceSlider';
import { IProduct } from '@state/products';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export const Filter = ({ products }: { products: IProduct[] }) => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  console.log(products);

  useEffect(() => {}, [isFilterOpened]);

  return (
    <div
      onMouseEnter={() => setIsFilterOpened(true)}
      onMouseLeave={() => setIsFilterOpened(false)}
      className={`absolute top-0 left-0 mt-16 flex flex-col items-center transition-all duration-300 ease-in-out z-10 shadow-xl ${
        isFilterOpened
          ? 'w-64 min-h-screen rounded-r-2xl bg-gradient-to-b from-white to-gray-200'
          : 'w-32 rounded-2xl shadow-lg bg-gradient-to-b from-second to-white'
      }`}
    >
      <div
        className={`h-100 w-full flex justify-center items-center 
              transition-all duration-300 ease-in-out 
              ${isFilterOpened ? '' : 'rounded-2xl shadow-lg'}`}
      >
        <div
          className={`flex items-center justify-center ${
            isFilterOpened
              ? 'pb-2 flex-row-reverse space-x-5'
              : 'flex-col space-y-0'
          }`}
        >
          <svg
            className={`mt-2 fill-current text-text transition-all duration-300 ease-in-out ${
              isFilterOpened ? 'w-6 h-6' : 'w-8 h-8'
            }`}
          >
            <AdjustmentsHorizontalIcon />
          </svg>
          {!isFilterOpened && (
            <p className="text-2xl font-bold text-primary-400">Filter</p>
          )}
        </div>
      </div>
      {isFilterOpened && <PriceSlider maxPrice={300} minPrice={1} />}
    </div>
  );
};
