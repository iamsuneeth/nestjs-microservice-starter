export enum SubjectType {
  LOCAL = 'local',
  AUTH0 = 'auth0',
}

export interface ISubject {
  type: SubjectType;
  info: any;
  token: string | undefined;
}
