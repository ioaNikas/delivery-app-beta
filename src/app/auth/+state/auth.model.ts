
// tslint:disable-next-line: interface-over-type-literal
export type User = {
  uid: string;
  email: string;
  job: string;
};

export type UserDB = {
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
    email: user.email,
    job: user.job
  } as User;
}

export function createUserDB(user: Partial<UserDB>) {
  return {
    job: user.job
  } as User;
}

