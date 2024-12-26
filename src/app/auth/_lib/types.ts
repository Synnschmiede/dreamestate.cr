export const defaultForgotPassword = {
  email: '',
  otp: '',
  new_password: '',
};

export interface IRegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role: "USER" | "ADMIN";
  password: string;
  confirm_password: string;
  status: "ACTIVE" | "BLOCKED";
}

export const defaultUser: IRegisterUser = {
  first_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  role: 'USER',
  password: '',
  confirm_password: '',
  status: 'ACTIVE',
};
