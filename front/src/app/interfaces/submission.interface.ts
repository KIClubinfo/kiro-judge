import { ITeam } from './team.interface';
import { IInstance } from './instance.interface';

export interface ISubmission {
  id: number;
  createdAt: string;
  updatedAt: string;
  team?: ITeam;
  instance: IInstance;
  score: number;
}
