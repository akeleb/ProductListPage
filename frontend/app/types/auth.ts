export interface User {
  _id: string;
  email: string;
  username?: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
} 