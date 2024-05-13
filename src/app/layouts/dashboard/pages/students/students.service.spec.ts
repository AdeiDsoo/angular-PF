import { TestBed } from '@angular/core/testing';
import { StudentService } from './students.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { CreateStudentPayload, IStudent } from './models';

describe('Students Service', () => {
  let studentService: StudentService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentService],
      imports: [HttpClientTestingModule],
    });

    studentService = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getStudents debe realizar una peticion GET a {apiURL}/students', () => {
    studentService.getStudents().subscribe({
      next: (resp) => {
        expect(Array.isArray(resp)).toBeTrue();
      },
    });

    httpTestingController.expectOne({
      method: 'GET',
      url: environment.baseAPIURL + '/students',
    }).flush([]);
  });

  it('createdStudent debe ejecutar POST en {apiURL}/students', () => {
    const payload: CreateStudentPayload = {
      createdAt: new Date(),
      email: 'test@mail.com',
      firstName: 'test',
      lastName: 'test',
      role: 'ADMIN'
    };

const mockResp:IStudent = {
  id: '52',
  createdAt: new Date(),
  email: 'test@mail.com',
  firstName: 'test',
  lastName: 'test',
  role: 'ADMIN',
};

    studentService.createdStudent(payload).subscribe({next:(resp)=>{
        expect(resp).toEqual(mockResp);
    }})

     httpTestingController.expectOne({
       method: 'POST',
       url: environment.baseAPIURL + '/students/' ,
     }).flush(mockResp);
  });
});
