import React, { useState, useEffect } from 'react';
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useUrlParams } from '@app/hooks/useUrlParams';
import { debounce } from 'lodash';

interface Props {
  maxPrice: number;
  minPrice: number;
}

export const PriceSlider: React.FC<Props> = React.memo(
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
      <Flex
        width="300px"
        direction="column"
        justify="center"
        align="center"
        p={6}
        bgGradient="linear(to-r, #f9f9f9, #f0f0f0)"
        boxShadow="xl"
        borderRadius="lg"
        className="w-full p-4"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text
          align="center"
          fontWeight="bold"
          color="primary.400"
          fontSize="xl"
          mb={4}
          textTransform="uppercase"
        >
          Price Range
        </Text>
        <RangeSlider
          aria-label={['min', 'max']}
          min={minPrice}
          max={maxPrice}
          step={10}
          defaultValue={[minPrice, maxPrice]}
          onChangeEnd={val => setPriceRange(val)}
          minStepsBetweenThumbs={10}
          colorScheme="teal"
        >
          <RangeSliderTrack bg="gray.200">
            <RangeSliderFilledTrack bg="teal.400" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} boxSize={5}>
            <Box color="teal.400" />
          </RangeSliderThumb>
          <RangeSliderThumb index={1} boxSize={5}>
            <Box color="teal.400" />
          </RangeSliderThumb>
        </RangeSlider>
        <Box mt={4} textAlign="center">
          <Text color="gray.700" fontSize="lg" fontWeight="semibold">
            ${priceRange[0]} - ${priceRange[1]}
          </Text>
        </Box>
      </Flex>
    );
  }
);

PriceSlider.displayName = 'PriceSlider';
