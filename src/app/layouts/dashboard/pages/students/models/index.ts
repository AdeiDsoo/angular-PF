export type UserRole='ADMIN' | 'USER' 

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
