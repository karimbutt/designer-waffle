export interface IContact extends IContactBase {
  id: string;
  userId: string;
}

export interface IContactBase {
  firstName: string;
  lastName: string;
  birthday?: string;
}
