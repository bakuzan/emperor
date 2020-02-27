import { GatsbyImageProps } from 'gatsby-image';

export interface Emperor {
  id: string;
  slug: string;
  name: string;
  image: {
    childImageSharp: GatsbyImageProps;
  };
  house: string;
  succession: string;
  reignStart: string;
  reignEnd: string;
  reignLengthInDays: number;
  daysSinceReignStart: number;
  daysSinceReignEnd: number;
  empire?: string;
}

export interface RankedEmperor extends Emperor {
  rank: number;
}

export interface InDepthEmperor extends Emperor {
  dateOfBirth: string;
  birthplace: string;
  dateOfDeath: string;
  deathplace: string;
}
