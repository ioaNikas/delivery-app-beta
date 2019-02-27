
// tslint:disable-next-line: interface-over-type-literal
export type User = {
  uid: string;
  job: string;
};

export interface UserForm {
  email: string;
  pwd: string;
  job: string;
}

export function createUser(user: Partial<User>) {
  return {
    uid: user.uid,
    job: user.job
  } as User;
}

