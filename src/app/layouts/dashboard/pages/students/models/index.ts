export type UserRole='ADMIN' | 'USER' 

export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface CreateStudentPayload {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  role: UserRole | null;
  createdAt: Date | null;
}