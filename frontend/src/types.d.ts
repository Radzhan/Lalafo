export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
  number: string;
  displayname: string
  user: string;
}

export interface ItemMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface Category {
  _id: string;
  title: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayname: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}
export interface LoginMutation {
  username: string;
  password: string;
  displayname: string;
  phone: string;
}
export interface GlobalError {
  error: string;
}

export interface ItemCard {
  image: string;
  title: string;
  price: number;
  _id: string;
}

export interface Categories {
  _id: string;
  title: string;
}
