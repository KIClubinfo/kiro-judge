import { IInstance } from './instance.interface';

export interface ICompetition {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  subjectUrl: string;
  instances: IInstance[];
}
