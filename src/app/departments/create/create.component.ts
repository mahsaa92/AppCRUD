import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartmentInfo, IDepartmentInfo } from '../models/department-info';
import { DepartmentsService } from '../services/departments.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private observableSubscription: Array<Subscription> = [];
  formSubmitted = false;
  departmentForm = this.fb.group({});

  constructor(private fb: FormBuilder,
    private departmentService: DepartmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.departmentForm.addControl('id', new FormControl(''));
    this.departmentForm.addControl('name', new FormControl('', [Validators.required]));
    this.departmentForm.addControl('email', new FormControl('', [Validators.required]));
    this.departmentForm.addControl('telephone', new FormControl('', [Validators.required]));
    this.departmentForm.addControl('APIkey', new FormControl('', [Validators.required]));

    const department$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.departmentService.getDepartmentsById(Number.parseInt(params.get('id')))
      ));

    department$.subscribe(department => {
      if (!isNullOrUndefined(department)) {
        this.departmentForm.get('id').setValue(department.id);
        this.departmentForm.get('name').setValue(department.name);
        this.departmentForm.get('email').setValue(department.email);
        this.departmentForm.get('telephone').setValue(department.telephone);
        this.departmentForm.get('APIkey').setValue(department.APIkey);
      }
    })
  }
  ngOnDestroy() {
    this.observableSubscription.forEach(item => {
      item.unsubscribe();
    });
  }

  save($event: any): void {

    this.formSubmitted = true;
    if (!this.departmentForm.valid) {
      return;
    }

    this.saveDepartment();


    this.router.navigate(['/departments']);
  }

  saveAndContinue($event: any): void {
    this.formSubmitted = true;
    if (!this.departmentForm.valid) {
      return;
    }

    this.saveDepartment();

  }

  saveDepartment(): void {
    const department = new DepartmentInfo();

    department.id = this.departmentForm.get('id').value;
    department.name = this.departmentForm.get('name').value;
    department.email = this.departmentForm.get('email').value;
    department.telephone = this.departmentForm.get('telephone').value;
    department.APIkey = this.departmentForm.get('APIkey').value;


    if (department.id == 0) {
      this.departmentService.addNewDepartments(department);
    }
    else {
      this.departmentService.updateDepartments(department);
    }
  }


}
