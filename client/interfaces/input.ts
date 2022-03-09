export interface login {
  email: string;
  password: string;
}

export interface signup extends login {
  name: string;
  confirmPassword: string;
}
