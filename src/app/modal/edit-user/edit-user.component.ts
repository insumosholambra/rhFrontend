import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeListService } from '../../core/services/employee-list.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../component/cadastros/department/department.service';
import { Department } from '../../model/department.model';
import { ListRoleService } from '../../component/lists/role-list/list-role.service';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [EmployeeListService, DepartmentService, ListRoleService]
})
export class EditUserComponent implements OnInit {
  @Input() employee!: Employee;
  form!: FormGroup;
  departments: Department[] = [];
  roles: Role[] = []
  positions: string[] = [];
  isModalOpen: boolean = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeListService,
    private departmentService: DepartmentService,
    private roleService: ListRoleService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      ENDERECO: [this.employee.ENDERECO, Validators.required],
      BAIRRO: [this.employee.BAIRRO, Validators.required],
      CIDADE: [this.employee.CIDADE, Validators.required],
      ESTADO: [this.employee.ESTADO, Validators.required],
      TELEFONE: [this.employee.TELEFONE, Validators.required],
      TEL_COMERCIAL: [this.employee.TEL_COMERCIAL, Validators.required],
      EMAIL: [this.employee.EMAIL, Validators.required],
      DEPARTAMENTO_ID: [this.employee.DEPARTAMENTO?.ID || '', Validators.required],
      CARGO_ID: [this.employee.CARGO?.ID || '', Validators.required],
    });
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    this.departmentService.allDepartment().subscribe(res => {
      this.departments = res;
    });
  }

  getDepartmentNameById(departmentId: number): string {
    const department = this.departments.find(dept => dept.ID === departmentId);
    return department ? department.DESCRICAO : '';
  }

  loadPositions() {
    this.roleService.getAllRoles().subscribe(res => {
      this.roles = res
    })
  }

  getPositionById(roleId: number){
    const position = this.roles.find(role => role.ID === this.employee.CARGO?.ID)
    return position ? position.DESCRICAO : '';
  }

  updateUser() {
    Swal.fire({
      title: 'Editar usuário',
      text: 'Deseja realmente editar o usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, editar!',
      cancelButtonText: 'Não, cancelar!'
    }).then(res => {
      if (res.isConfirmed) {
        if (this.form.valid) {
          const departmentId = this.form.value.DEPARTAMENTO_ID;
          const departmentDescription = this.getDepartmentNameById(departmentId);
          const roleId = this.form.value.ROLE_ID
          const roleDescription = this.getPositionById(roleId)

          const updatedUser: Employee = {
            ...this.employee,
            ...this.form.value,
            DEPARTAMENTO: {
              ID: departmentId,
              DESCRICAO: departmentDescription
            },
            CARGO: {
              ID: roleId,
              DESCRICAO: roleDescription
            }
          };

          this.employeeService.updateUser(updatedUser, this.employee.ID).subscribe(res => {
            Swal.fire('Sucesso!', 'Usuário editado com sucesso!', 'success').then(res => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          });
        }
      }
    });
  }

  close() {
    this.isModalOpen = false;
  }
}
