import React, { useState, useEffect } from 'react';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { debounce } from 'lodash';
import { Range } from 'react-range';

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

    return (
      <div
        className="flex flex-col justify-center items-center p-6 bg-gradient-to-r from-gray-200 to-gray-100 shadow-xl rounded-lg w-full p-4 border border-gray-200"
        style={{ width: '300px' }}
      >
        <h2 className="text-center font-bold text-blue-400 text-xl mb-4 uppercase">
          Price Range
        </h2>
        <Range
          step={10}
          min={minPrice}
          max={maxPrice}
          values={priceRange}
          onChange={values => setPriceRange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{ ...props.style, height: '36px' }}
              className="w-full bg-gray-200"
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '36px',
                width: '36px',
                borderRadius: '50%',
                backgroundColor: 'green',
              }}
            />
          )}
        />
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-lg font-semibold">
            ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>
    );
  }
);
PriceSliderGPT.displayName = 'PriceSliderA';
