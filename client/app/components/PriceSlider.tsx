import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { useDispatch } from 'react-redux';
import { changeFilter } from '@state/filter';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSlider: React.FC<Props> = React.memo(
  ({ minPrice = 0, maxPrice = 100 }) => {
    const dispatch = useDispatch();
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

    const handleChangeUrlPriceRange = ({
      min,
      max,
    }: {
      min: number;
      max: number;
    }) => {
      dispatch(changeFilter({ price: { min, max } }));
    };
    return (
      <div className="w-full p-6 flex flex-col justify-center items-center ">
        <div className="text-center text-text text-xl mb-4">Price Range</div>
        <Range
          min={minPrice}
          max={maxPrice}
          values={priceRange}
          onChange={values => setPriceRange(values)}
          onFinalChange={values =>
            handleChangeUrlPriceRange({ min: values[0], max: values[1] })
          }
          renderTrack={({ props, children }) => {
            const { ...restProps } = props;
            return (
              <div
                key="range"
                {...restProps}
                style={{
                  ...restProps.style,
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
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                className="w-4 h-4 bg-minor rounded-full focus:outline-none"
                style={{ ...restProps.style, cursor: 'pointer' }}
              />
            );
          }}
        />
        <div className="mt-4 text-center text-gray-700 text-lg font-semibold">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
      </div>
    );
  }
);

PriceSlider.displayName = 'PriceSlider';
