'use client';
import { Provider } from 'react-redux';
import store from '@state/store';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    main: {
      400: '#852f55',
    },
    secondary: {
      400: 'rgba(197,110,110,0.67)',
    },
    dark: {
      400: 'rgba(77,8,8,0.67)',
    },
  },
});

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Flex direction="column" minH="100vh">
          <Box
            as="header"
            bgGradient="linear(to-r, main.400, dark.400, secondary.400)"
            color="white"
            p={4}
            position="fixed"
            top={0}
            w="100%"
            zIndex={1000}
          >
            Perfect ecommerce example By Taras Kukharets
          </Box>

          <Box as="main" flex="1" mt="16" p={4} overflowY="auto">
            {children}
          </Box>
          <Box
            as="footer"
            bgGradient="linear(to-r, main.400, dark.400, secondary.400)"
            color="white"
            p={4}
            position="fixed"
            bottom={0}
            w="100%"
          >
            <Flex gap={10} justifyContent={'center'}>
              <p>Contact</p>
              <p>Source code</p>
            </Flex>
          </Box>
        </Flex>
      </Provider>
    </ChakraProvider>
  );
}
