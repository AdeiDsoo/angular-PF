import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ICreateClassesData } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { IClass } from './models/index';

@Injectable({ providedIn: 'root' })
export class ClassesServices {
  constructor(private httpClient: HttpClient) {}

  getClass(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(
      environment.baseAPIURL + '/classes?_embed=student&_embed=course'
    );
  }

  getClassesByStudentId(sId: string): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(
      `${environment.baseAPIURL}/classes?studentId=${sId}&_embed=student&_embed=course`
    );
  }

  createClass(payload: ICreateClassesData): Observable<IClass> {
    console.log(payload, 'payload service');
    
    return this.httpClient.post<IClass>(
      environment.baseAPIURL + '/classes',
      payload
    );
  }

  deleteClass(id: string): Observable<IClass> {
    return this.httpClient.delete<IClass>(
      environment.baseAPIURL + '/classes/' + id
    );
  }

  updateClassById(id: string, classes: IClass): Observable<IClass> {
    return this.httpClient.put<IClass>(
      `${environment.baseAPIURL}/classes/${id}`,
      classes
    );
  }
}
