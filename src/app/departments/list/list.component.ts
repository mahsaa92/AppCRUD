import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartmentInfo } from '../models/department-info';
import { DepartmentsService } from '../services/departments.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchText: string = "";

  departments: Observable<IDepartmentInfo[]> = null;
  department$:Observable<IDepartmentInfo>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentsService) { }

  ngOnInit() {
    this.departments = this.departmentService.getAllDepartments();
    this.department$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.departmentService.getDepartmentsById(Number.parseInt(params.get('id')))
        ));
  }

  deleteDepartment(department): void {
    this.departmentService.deleteDepartments(department);
  }
  filterCondition(department) {
    let search;
    if(department.name.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1){
      search = department.name.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1
    } else if( department.APIkey.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1){
      search = department.APIkey.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1
    }
    return search;

  }
  editDepartment(department:IDepartmentInfo):void{
      this.router.navigate(['departments/edit/'+department.id]);
  }
}
