import { ID, guid } from '@datorama/akita';

// tslint:disable-next-line: interface-over-type-literal
export type User = {
  uid: string;
  email: string;
  job: string;
};

export function createUser(user: Partial<User>) {
  return {
    uid: user.uid,
    email: user.email,
    job: user.job
  } as User;
}

