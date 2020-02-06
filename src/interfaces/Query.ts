export type Query<T, TName extends string> = {
  [key in TName]: T;
};
