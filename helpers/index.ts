import { TypeColors } from '../constants/enums';

export const getTypeColor = (data: string) => {
  const type = <keyof typeof TypeColors>data.toLowerCase();
  const color = TypeColors[type];

  return color;
};
