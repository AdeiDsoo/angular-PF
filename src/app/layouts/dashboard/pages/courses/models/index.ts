export interface ICourses{
    id:string,
    name:string,
    price:number,
    qty:number
}

export interface ICreateCoursePayload {
  name: string;
  price: number;
  qty: number;
}