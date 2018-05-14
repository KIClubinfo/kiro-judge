import { IUser } from './user.interface';
import { ICompetition } from './competition.interface';
import { ISubmission } from './submission.interface';

export interface ITeam {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  competition: ICompetition;
  members: IUser[];
  submissions: ISubmission[];
}
