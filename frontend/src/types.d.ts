export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: Category;
  }
  
  export interface ProductMutation {
    category: string;
    title: string;
    description: string;
    price: string;
    image: File | null;
  }
  
  export interface Category {
    _id: string;
    title: string;
    description: string;
  }
  
  export interface RegisterMutation {
    username: string;
    password: string;
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
      }
    },
    message: string;
    name: string;
    _name: string;
  }
  
  export interface LoginMutation {
    username: string;
    password: string;
  }
  
  export interface GlobalError {
    error: string;
  }