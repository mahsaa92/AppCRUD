import { Injectable } from '@angular/core';
import { DepartmentInfo, IDepartmentInfo } from '../models/department-info';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departments:Array<DepartmentInfo> =  [
    {  id:1, name: 'mahsa',email: 'mahsa.sadeghzadeh91@gmail.com', telephone: 686869868, APIkey:"a123"},  
    {  id:2, name: 'Hessa',email: 'mahsa.sadeghzadeh91@gmail.com', telephone: 976785738,  APIkey:"b345"}, 
    {  id:3, name: 'Ali',email: 'mahsa.sadeghzadeh91@gmail.com', telephone: 49237493749,  APIkey:"c678"}, 


];

  constructor() { }
  getAllDepartments():Observable<IDepartmentInfo[]>{
    return of(this.departments)
  }

  getDepartmentsById(id:number):Observable<IDepartmentInfo>{
    var department = this.departments.find(item => item.id === id);
    return of(department);
  }

  addNewDepartments(department:IDepartmentInfo):void{
    this.departments.sort(item => item.id)
    department.id = this.departments.length + 1
    this.departments.push(department);
  }

  deleteDepartments(department:IDepartmentInfo):IDepartmentInfo[]{
    const index = this.departments.findIndex(item => item.id === department.id);
    const deletedItem = this.departments.splice(index,1);

    return deletedItem;
  }

  updateDepartments(department:IDepartmentInfo):void{
    const index = this.departments.findIndex(item => item.id === department.id);
    console.log(this.departments[index])
    this.departments[index] = department;
  }


}
