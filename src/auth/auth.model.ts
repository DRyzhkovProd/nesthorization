export enum UserRole {
  User = 'User',
  Editor = 'Editor',
  Admin = 'Admin',
}
export class AuthModel {
  email: string;
  passwordHash: string;
}
