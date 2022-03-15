import type { NextPage } from 'next';
import { Box, Container, Grid, GridItem, Text, Flex, Input } from '@chakra-ui/react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../services/queries';
import { useState } from 'react';
import Card, { CardProps } from '../components/card';
import Information from '../components/information';

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_POKEMONS);

  const [active, setActive] = useState<any>(null);
  const [search, setSearch] = useState<string>('');

  const pokemons = data?.pokemons.filter((item: { name: string }) => item.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <Box bgColor='gray.700'>
        <Head>
          <title>Pokédex</title>
        </Head>
        <Flex justifyContent='center' alignItems='center' height='100vh'>
          <Text color='white'>Loading...</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box bgColor='gray.700' minHeight='100vh'>
      <Head>
        <title>Pokédex</title>
      </Head>
      <Container maxW='container.xl' paddingY={6}>
        <Text color='white' textAlign='center' fontSize='4xl' fontWeight='medium' mb={12}>
          Pokédex
        </Text>
        <Input bgColor='white' mb={16} placeholder='Search for a pokémon...' onChange={(e) => setSearch(e.target.value)} />
        <Grid templateColumns='repeat(3, 1fr)' gap={8}>
          {pokemons.map((item: CardProps) => (
            <GridItem key={item.id}>
              <Card {...item} onClick={setActive} />
            </GridItem>
          ))}
        </Grid>

        <Information isOpen={!!active} {...active} onClose={() => setActive(null)} />
      </Container>
    </Box>
  );
};

export default Home;
