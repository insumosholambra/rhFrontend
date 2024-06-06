import { Component } from '@angular/core';
import { DepartmentService } from '../../cadastros/department/department.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../cadastros/role/role.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
  providers: [DepartmentService]
})
export class DepartmentListComponent {

  constructor(
    private departmentService: DepartmentService
  ){}

  departments!: any

  ngOnInit(){
    this.getAllRoles()
  }

  getAllRoles(){
    this.departmentService.allDepartment().subscribe(response => {
      console.log(response);

      this.departments = response

    })
  }
}
