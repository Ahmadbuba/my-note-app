import { User } from './user.model';

export interface Note {
  id: number;
  title: string;
  content: string;
  user_id: number;
  user: User;
  created: string;
  updated?: string;
}
