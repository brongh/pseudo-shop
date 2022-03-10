export interface login {
  email: string;
  password: string;
}

export interface signup extends login {
  name: string;
  confirmPassword: string;
}

export interface IUserData extends login {
  _id: string;
  products: any[];
  name: string;
}

export interface INewProduct {
  title: string;
  SKU: string;
  image: string;
}

export interface IAllProducts extends INewProduct {
  _id: string;
}
