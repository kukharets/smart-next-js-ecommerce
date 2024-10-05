import React, { useState, useEffect } from 'react';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { debounce } from 'lodash';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSliderGPT: React.FC<Props> = React.memo(
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

    const handleThumbChange = (thumbIndex: number, value: number) => {
      const newPriceRange = [...priceRange];
      newPriceRange[thumbIndex] = value;

      // Prevent thumbs from crossing each other
      if (newPriceRange[0] > newPriceRange[1]) {
        if (thumbIndex === 0) {
          newPriceRange[0] = newPriceRange[1];
        } else {
          newPriceRange[1] = newPriceRange[0];
        }
      }

      setPriceRange(newPriceRange);
    };

    const rangePercent = [
      ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100,
      ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100,
    ];

    return (
      <div className="w-80 p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-lg border border-gray-300 flex flex-col items-center">
        <h2 className="text-xl font-bold text-primary-400 mb-4 text-center uppercase">
          Price Range
        </h2>
        <div className="relative w-full h-2 bg-gray-200 rounded-lg">
          <div
            className="absolute bg-teal-400 h-2 rounded-lg"
            style={{
              left: `${rangePercent[0]}%`,
              right: `${100 - rangePercent[1]}%`,
            }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange[0]}
            onChange={e => handleThumbChange(0, Number(e.target.value))}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: 2 }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange[1]}
            onChange={e => handleThumbChange(1, Number(e.target.value))}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: 2 }}
          />
          <div
            className="absolute w-5 h-5 bg-teal-400 rounded-full cursor-pointer"
            style={{
              left: `calc(${rangePercent[0]}% - 1.25rem)`, // Adjust for thumb width
            }}
          />
          <div
            className="absolute w-5 h-5 bg-teal-400 rounded-full cursor-pointer"
            style={{
              left: `calc(${rangePercent[1]}% - 1.25rem)`, // Adjust for thumb width
            }}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-lg font-semibold">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>
    );
  }
);

PriceSliderGPT.displayName = 'PriceSliderGPT';
