import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  varient?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient = 'regular',
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      w="100%"
      maxW={varient === 'regular' ? '800px' : '400px'}
    >
      {children}
    </Box>
  );
};
