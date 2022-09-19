import { type ImageDataLike } from 'gatsby-plugin-image';

export interface Emperor {
  id: string;
  slug: string;
  name: string;
  image: ImageDataLike;
  house: string;
  succession: string;
  reignStart: string;
  reignEnd: string;
  reignLengthInDays: number;
  daysSinceReignStart: number;
  daysSinceReignEnd: number;
  empire?: string | null;
  reignCount?: number | null;
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
