import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Flex,
  List,
  ListItem,
  Text,
  Badge,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { getTypeColor } from '../../helpers';
import { GET_POKEMON } from '../../services/queries';

interface Props {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const Information: FC<Props> = ({ id, name, isOpen, onClose }) => {
  const [getPokemon, { loading, data }] = useLazyQuery(GET_POKEMON);

  const infoList = [
    { title: 'National Number', value: data?.pokemon.number },
    {
      title: 'Type',
      value: data?.pokemon.types.map((item: string, index: number) => (
        <Badge key={index} mr={3} colorScheme={getTypeColor(item)}>
          {item}
        </Badge>
      )),
    },
    { title: 'Specie', value: data?.pokemon.classification },
    { title: 'Height', value: data?.pokemon.height.maximum },
    { title: 'Weight', value: data?.pokemon.weight.maximum },
    {
      title: 'Resistant',
      value: data?.pokemon.resistant.map((item: string, index: number) => (
        <Badge key={index} mr={3} colorScheme={getTypeColor(item)}>
          {item}
        </Badge>
      )),
    },
    {
      title: 'Weakness',
      value: data?.pokemon.weaknesses.map((item: string, index: number) => (
        <Badge key={index} mr={3} colorScheme={getTypeColor(item)}>
          {item}
        </Badge>
      )),
    },
  ];

  useEffect(() => {
    if (isOpen) {
      getPokemon({ variables: { id, name } });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Text textAlign='center' fontSize='lg' my={6}>
              Loading...
            </Text>
          ) : (
            <Flex>
              <Box fontSize='lg' mr={6}>
                <Image src={data?.pokemon.image} alt={data?.pokemon.name} height='80' m='auto' />
              </Box>
              <Box flex='1'>
                <Text fontSize='3xl' fontWeight='bold' mb={3}>
                  {data?.pokemon.name}
                </Text>

                <List spacing={1}>
                  {infoList.map((item, index) => (
                    <ListItem key={index} borderBottomWidth={1} borderBottomColor='gray.200' pb={1}>
                      <Flex alignItems='center'>
                        <Text fontWeight='semibold' mr={6} fontSize='sm' color='gray.500'>
                          {item.title}:
                        </Text>{' '}
                        {item.value}
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Information;
