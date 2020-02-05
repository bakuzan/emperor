import { GatsbyImageProps } from 'gatsby-image';

export interface Emperor {
  id: string;
  slug: string;
  name: string;
  image: {
    childImageSharp: GatsbyImageProps;
  };
  house: string;
  reignStart: string;
  reignEnd: string;
  reignLengthInDays: number;
}
