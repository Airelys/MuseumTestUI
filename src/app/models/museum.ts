import { Article } from './article';

export class Museum{
  id: number = 0;
  name: string = '';
  address: string = '';
  city: string = '';
  type: string = '';
  articles: Array<Article> =[];
}
