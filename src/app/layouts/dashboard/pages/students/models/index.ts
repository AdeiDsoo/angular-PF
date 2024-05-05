export type UserRole='ADMIN' | 'USER' 

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface CreateStudentPayload {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: UserRole | null;
  createdAt: Date | null;
}