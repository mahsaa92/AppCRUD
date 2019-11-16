import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
