export interface UserResponse {
  id: string;
  displayName: string;
  email: string;
  role: string;
  verified: boolean;
  lastLogin?: Date;
  password?: undefined;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
  onboarding?: any; // Replace `any` with the actual type if you have it
}

export interface MessageResponse {
  message: string;
}
