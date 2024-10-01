'use client';
import { Box, Icon, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { PriceSlider } from '@app/catalog-ssr/PriceSlider';

export const Filter = () => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsFilterOpened(true)}
      onMouseLeave={() => setIsFilterOpened(false)}
      position="absolute"
      minWidth={isFilterOpened ? '250px' : '130px'}
      minHeight={isFilterOpened ? '100%' : 'auto'}
      top="60px"
      left="0"
      zIndex="10"
      bgGradient={
        isFilterOpened
          ? 'linear(to-b, #ffffff, #f0f0f0)'
          : 'linear(to-b, #fafafa, #eaeaea)'
      }
      borderRadius={isFilterOpened ? '0 20px 20px 0' : '0'}
      boxShadow="xl"
      transition="all 0.3s ease"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
    >
      <Box
        width="100%"
        position="absolute"
        top="0"
        left="0"
        borderRadius="40px 0"
        boxShadow={isFilterOpened ? 'none' : 'lg'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        transition="all 0.3s ease"
      >
        <Box
          display="flex"
          flexDirection={isFilterOpened ? 'row-reverse' : 'column'}
          justifyContent="center"
          alignItems="center"
          gap={isFilterOpened ? '20px' : 0}
        >
          <Icon
            marginTop="10px"
            as={EditIcon}
            color={isFilterOpened ? 'secondary.500' : 'secondary.400'}
            w={isFilterOpened ? 6 : 16}
            h={isFilterOpened ? 6 : 16}
            transition="color 0.3s ease, transform 0.3s ease"
            _hover={{ transform: 'scale(1.1)', color: 'secondary.600' }}
          />
          {!isFilterOpened && (
            <Text color="primary.400" fontSize="2xl" fontWeight="bold">
              Filter
            </Text>
          )}
        </Box>
      </Box>
      {isFilterOpened && (
        <Box
          marginTop="50px"
          display="flex"
          flexDirection="column"
          gap="20px"
          p={4}
          width="100%"
          bg="white"
          boxShadow="inner"
          borderRadius="20px"
        >
          <PriceSlider maxPrice={300} minPrice={1} />
        </Box>
      )}
    </Box>
  );
};
