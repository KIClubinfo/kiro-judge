import { ITeam } from './team.interface';

export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  teams?: ITeam[];
}
