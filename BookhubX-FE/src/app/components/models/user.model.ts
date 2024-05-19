// user.model.ts

export interface User {
    username: string;
    email: string;
    password: string;
    role?: string; // Make the role optional
  }
  