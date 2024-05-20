import { Injectable } from '@angular/core';
import { ICourses } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ICreateCoursePayload } from './models/index';

@Injectable()
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getCourse(): Observable<ICourses[]> {
    return this.httpClient.get<ICourses[]>(environment.baseAPIURL + '/courses');
  }
  createCourse(payload: ICreateCoursePayload): Observable<ICourses> {
    return this.httpClient.post<ICourses>(
      environment.baseAPIURL + '/courses',
      payload
    );
  }
  deleteCourseById(id: string): Observable<ICourses> {
    return this.httpClient.delete<ICourses>(
      environment.baseAPIURL + '/courses/' + id
    );
  }
  updateCourseById(id: string, course: ICourses): Observable<ICourses> {
    return this.httpClient.put<ICourses>(
      `${environment.baseAPIURL}/courses/${id}`,
      course
    );
  }
}
