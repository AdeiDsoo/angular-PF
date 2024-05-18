import { createReducer, on } from '@ngrx/store';
import { IStudent } from '../../layouts/dashboard/pages/students/models';
import { authActions } from './auth.actions';

export interface AuthState {
  authUser: null | IStudent;
}

const initialState:AuthState={
    authUser:null
}

 const MOCK_AUTH_STUDENT: IStudent = {
    id: "1",
    createdAt: new Date(),
    email: 'student1@mail.com',
    firstName: 'student1',
    lastName: 'test',
    role: 'ADMIN',
  };

export const authFeatureName='auth'

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    if (
      action.payload.email !== 'user@mail.com' ||
      action.payload.password !== '12345'
    ) {
      alert('Correo o password incorrectos');
      return state;
    } else {
      localStorage.setItem(
        'accessToken',
        'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds'
      );
      return {
        authUser: MOCK_AUTH_STUDENT,
      };
    }
  }),

  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);