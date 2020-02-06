import { NavigateFn } from '@reach/router';

import { EMPPageContext } from './EMPPageContext';

export interface EMPPage<T = any> {
  path: string;
  '*': string;
  uri: string;
  location: Location;
  navigate: NavigateFn;
  pageResources: object;
  data: T;
  pageContext: EMPPageContext;
  pathContext: Record<string, any>;
}
