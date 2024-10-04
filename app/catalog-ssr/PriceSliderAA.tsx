import React, { useState, useEffect } from 'react';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { debounce } from 'lodash';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSliderAA: React.FC<Props> = React.memo(
  ({ minPrice = 0, maxPrice = 100 }) => {
    const { urlParams, setUrlParam } = useUrlParams();

    const [priceRange, setPriceRange] = useState([
      urlParams.minPrice ?? minPrice,
      urlParams.maxPrice ?? maxPrice,
    ]);

    const updateUrlWithDebounce = debounce((minPrice, maxPrice) => {
      setUrlParam({ minPrice, maxPrice });
    }, 300);

    useEffect(() => {
      updateUrlWithDebounce(priceRange[0], priceRange[1]);
    }, [priceRange]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      const newMinPrice = value < priceRange[1] ? value : priceRange[0];
      const newMaxPrice = value > priceRange[0] ? value : priceRange[1];
      setPriceRange([newMinPrice, newMaxPrice]);
    };

    return (
      <div className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-lg w-full border border-gray-300">
        <h2 className="text-xl font-bold text-center text-teal-500 mb-4 uppercase">
          Price Range
        </h2>
        <div className="relative w-full">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="10"
            value={priceRange[0]}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="10"
            value={priceRange[1]}
            onChange={handleSliderChange}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer top-0"
            style={{ zIndex: 1 }}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-gray-700">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      </div>
    );
  }
);

PriceSliderAA.displayName = 'PriceSliderAA';
