import { Box, Image, Badge } from '@chakra-ui/react';
import { FC } from 'react';
import { getTypeColor } from '../../helpers';

export interface CardProps {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
  onClick: (pokemon: any) => void;
}

const Card: FC<CardProps> = ({ id, number, name, types, image, onClick }) => {
  return (
    <Box
      borderRadius='lg'
      overflow='hidden'
      cursor='pointer'
      _hover={{ transform: 'scale(1.05)', transition: 'transform 0.5s' }}
      onClick={() => onClick({ id, name })}>
      <Box py={6} bgColor='white'>
        <Image src={image} alt={name} height='60' m='auto' />
      </Box>

      <Box p='6' bgColor='blue.300' color='white'>
        <Box color='blue.700' fontSize='sm'>
          #{number}
        </Box>
        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
          {name}
        </Box>
        <Box>
          {types.map((item, index) => (
            <Badge key={index} mr={3} colorScheme={getTypeColor(item)}>
              {item}
            </Badge>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
