// book.model.ts

export interface Book {
  _id: string;
    title: string;
    author: string[];
    genre: string[];
    description: string;
    price: string;
    image: string;
    publisher: string;
    userId: string;
    stock: number;
  }
  