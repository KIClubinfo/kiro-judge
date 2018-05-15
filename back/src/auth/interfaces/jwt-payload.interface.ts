export interface IJWTPayload {
  email: string;
  teamId: number;
  competitionId: number;
  iat?: number;
  exp?: number;
}
