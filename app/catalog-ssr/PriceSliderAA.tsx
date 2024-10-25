import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useUrlParams } from '@app/hooks/useUrlParams';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSliderAA: React.FC<Props> = React.memo(
  ({ minPrice = 0, maxPrice = 100 }) => {
    const { urlParams, setUrlParam } = useUrlParams();

    const [priceRange, setPriceRange] = useState([
      urlParams.minPrice || minPrice,
      urlParams.maxPrice || maxPrice,
    ]);

    const handleChangeUrlPriceRange = ({
      minPrice,
      maxPrice,
    }: {
      minPrice: number;
      maxPrice: number;
    }) => {
      setUrlParam({ minPrice, maxPrice });
    };

    return (
      <div className="w-full p-6 flex flex-col justify-center items-center ">
        <div className="text-center text-text text-xl mb-4">Price Range</div>
        <Range
          step={10}
          min={minPrice}
          max={maxPrice}
          values={priceRange}
          onChange={values => setPriceRange(values)}
          onFinalChange={values =>
            handleChangeUrlPriceRange({
              minPrice: values[0],
              maxPrice: values[1],
            })
          }
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
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
              className="w-4 h-4 bg-minor rounded-full focus:outline-none"
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
