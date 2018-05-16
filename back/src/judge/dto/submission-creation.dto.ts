import { IsNumber, IsString } from 'class-validator';

export class SubmissionCreationDto {
  @IsNumber() readonly teamId: number;
  @IsNumber() readonly instanceId: number;
  @IsString() readonly solution: string;
}
