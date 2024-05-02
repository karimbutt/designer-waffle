export interface IContact extends IContactBase {
  id: string;
  userId: string;
}

export interface IContactBase {
  firstName: string;
  lastName: string;
  birthday?: string;
}

// phones?: IPhoneNumber[];
// emails?: IEmail[];
// address?: IAddress;

// export interface IEmail extends IEmailBase {
//   id?: string;
// }

// export interface IEmailBase {
//   email: string;
//   type: EmailType;
// }

// export type EmailType = 'work' | 'personal' | 'other';

// export interface IPhoneNumber extends IPhoneNumberBase {
//   id?: string;
// }

// export interface IPhoneNumberBase {
//   type: PhoneNumberType;
//   number: string;
// }

// export type PhoneNumberType = 'work' | 'personal' | 'other';

// export interface IAddress extends IAddressBase {
//   id?: string;
// }

// export interface IAddressBase {
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }
