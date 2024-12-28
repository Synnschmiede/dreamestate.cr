export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role: string;
  password: string;
  confirm_password?: string;
  status: string;

  //read only
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export const defaultUser: IUser = {
  first_name: '',
  last_name: '',
  email: '',
  contact_number: '',
  role: 'USER',
  password: '',
  confirm_password: '',
  status: 'ACTIVE',
};

export interface IUpdateUser {
  id: string;
  role: string;
  is_deleted: boolean;
  contact_number: string; 
  status: string;
} 
