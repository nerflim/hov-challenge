import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query {
    pokemons(first: 500) {
      id
      number
      name
      types
      image
    }
  }
`;

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;
