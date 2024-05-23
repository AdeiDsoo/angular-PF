import { FormControl } from "@angular/forms";
import { ICourses } from "../../courses/models";
import { IStudent } from "../../students/models";

export interface IClass{
    id:string;
    course?: ICourses,
    students?: IStudent, 
    studentId: string,
    courseId: string,
    qty: number
}

export interface IClassForm {
  qty: FormControl<number | null>;
  students: FormControl<IStudent | null>;
  course: FormControl<ICourses | null>;
}

// export interface ICreateClassesData {
//   course?: ICourses | null;
//   students?: IStudent | null;
//   qty?: number | null;
//   courseId?: string | null;
//   studentId?: string | null;
// }
export interface ICreateClassesData {
  courseId?: string | null;
  studentId?: string | null;
  qty?: number | null;
}