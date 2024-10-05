import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { debounce } from 'lodash';
import { useUrlParams } from '@app/hooks/useUrlParams';

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

    return (
      <div className="w-full p-6 flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-lg border border-gray-300">
        <div className="text-center font-bold text-blue-600 text-xl mb-4 uppercase">
          Price Range
        </div>
        <Range
          step={10}
          min={minPrice}
          max={maxPrice}
          values={priceRange}
          onChange={values => setPriceRange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '12px',
                width: '100%',
                backgroundColor: '#ccc',
                display: 'flex',
                borderRadius: '5px',
                background: getTrackBackground({
                  values: priceRange,
                  colors: ['#0EA5E9', '#ccc'],
                  min: minPrice,
                  max: maxPrice,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="w-6 h-6 bg-blue-600 rounded-full focus:outline-none"
              style={{ ...props.style }}
            />
          )}
        />
        <div className="mt-4 text-center text-gray-700 text-lg font-semibold">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    );
  }
);

PriceSliderAA.displayName = 'PriceSliderAA';
