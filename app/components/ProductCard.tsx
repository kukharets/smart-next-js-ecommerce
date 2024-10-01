import {
  Box,
  Image,
  Text,
  Heading,
  Button,
  Stack,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { IProduct } from '@state/products';

export const ProductCard = ({
  images,
  title,
  category,
  description,
  price,
}: IProduct) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={6}
      maxWidth="400px"
      className="m-5"
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '2xl',
      }}
    >
      <Image
        src={images[0]}
        alt={title}
        borderRadius="lg"
        objectFit="cover"
        w="full"
        h="300px"
      />

      <Stack mt={4} spacing={3} flexGrow={1}>
        <Badge colorScheme="green" fontSize="md">
          {category.name}
        </Badge>

        <Heading minHeight="50px" noOfLines={2} size="md" color="gray.800">
          {title}
        </Heading>

        <Text color="gray.600" fontSize="sm" noOfLines={3}>
          {description}
        </Text>

        <Text fontSize="xl" fontWeight="bold" color="orange.400">
          ${price}
        </Text>

        <Button
          bg="main.400"
          color="white"
          size="lg"
          w="full"
          _hover={{
            bgGradient: 'linear(to-r, main.400, secondary.400)',
            color: 'white',
          }}
        >
          Buy now
        </Button>
      </Stack>

      <Flex justify="center" mt={4}>
        <Image
          src={category.image}
          alt={category.name}
          boxSize="50px"
          objectFit="cover"
          borderRadius="full"
        />
      </Flex>
    </Box>
  );
};
