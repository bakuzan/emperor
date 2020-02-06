import { EmperorDetail } from './EmperorDetail';

export interface EMPPageContext extends Record<string, any> {
  slug: string;
  previous: null | Pick<EmperorDetail, 'fields'>;
  next: null | Pick<EmperorDetail, 'fields'>;
}
