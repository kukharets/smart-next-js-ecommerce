import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { Range, getTrackBackground } from 'react-range';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSliderCopilot: React.FC<Props> = React.memo(
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
      <div className="w-full p-4 flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl rounded-lg border border-gray-200">
        <p className="text-center font-bold text-primary-400 text-xl mb-4 uppercase">
          Price Range
        </p>
        <div className="w-full">
          <Range
            values={priceRange}
            step={10}
            min={minPrice}
            max={maxPrice}
            onChange={values => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ['#ccc', '#548BF4', '#ccc'],
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
                style={{
                  ...props.style,
                  height: '24px',
                  width: '24px',
                  backgroundColor: '#FFF',
                  border: '1px solid #CCC',
                }}
              />
            )}
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

PriceSliderCopilot.displayName = 'PriceSliderC';
