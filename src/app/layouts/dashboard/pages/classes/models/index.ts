import { FormControl } from "@angular/forms";
import { ICourses } from "../../courses/models";
import { IStudent } from "../../students/models";

export interface IClass{
    id:number;
    course?: ICourses,
    students?: IStudent, 
    studentId: string,
    courseId: number,
    qty: number
}

export interface IClassForm {
  qty: FormControl<number | null>;
  students: FormControl<IStudent | null>;
  course: FormControl<ICourses | null>;
}

export interface ICreateClassesData {
  course?: ICourses | null
  students?: IStudent | null
  qty?: number | null
}