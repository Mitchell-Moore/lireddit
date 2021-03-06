import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  //Data is loadind
  if (fetching) {
  }
  //User is not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href={'login'}>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={'register'}>
          <Link>register</Link>
        </NextLink>
      </>
    );
  }
  //User is logged in
  else {
    body = (
      <>
        <Flex>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            type="button"
            variant="link"
            onClick={() => logout()}
            isLoading={logoutFetching}
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
