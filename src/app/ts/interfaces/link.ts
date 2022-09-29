import { PageRoutes } from '../enum';

export interface LinkInterface {
  to: PageRoutes | string;
  text: string;
}
