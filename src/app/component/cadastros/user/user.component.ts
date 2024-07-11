import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { ListRoleService } from '../../lists/role-list/list-role.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Department } from '../../../model/department.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./user.component.css'],
  providers: [UserService, ListRoleService]
})
export class UserComponent {

  employeeForm!: FormGroup;
  employee: Employee[] = [];
  departamentos: Department[] = [];
  siglas: any = '';
  cargos: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: ListRoleService
  ) {
    this.employeeForm = this.fb.group({
      NOME: ['', Validators.required],
      SOBRENOME: ['', Validators.required],
      CPF: ['', Validators.required],
      RG: ['', Validators.required],
      DATA_NASCTO: ['', Validators.required],
      ENDERECO: ['', Validators.required],
      BAIRRO: ['', Validators.required],
      CIDADE: ['', Validators.required],
      ESTADO: ['', Validators.required],
      TELEFONE: ['', Validators.required],
      TEL_COMERCIAL: [''],
      RAMAL: [''],
      EMAIL: ['', [Validators.required, Validators.email]],
      DEPARTAMENTO: [0, Validators.required],
      CARGO: [0, Validators.required],
      DATA_CADASTRO: ['', Validators.required],
      ULTIMO_PERIODO_FERIAS: ['', Validators.required],
      SALDO_FERIAS: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getRoles();
    this.getDepartments();
    this.getNameStates();
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);

    if (this.employeeForm.valid) {
      const departmentId = this.employeeForm.get('DEPARTAMENTO')?.value;
      const cargoId = this.employeeForm.get('CARGO')?.value;

      const employeeData: Employee = {
        ...this.employeeForm.value,
        DEPARTAMENTO: {
          ID: departmentId,
          DESCRICAO: this.departamentos.find(dep => dep.ID === departmentId)?.DESCRICAO || ''
        },
        CARGO: {
          ID: cargoId,
          DESCRICAO: this.cargos.find((cargo: { ID: any; }) => cargo.ID === cargoId)?.DESCRICAO || ''
        }
      };

      console.log(employeeData);

      this.userService.newEmployee(employeeData).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Sucesso',
            icon: 'success',
            text: 'Funcionário cadastrado com sucesso',
            confirmButtonText: 'Ok'
          }).then(result => {
            if (result.isConfirmed) {
              this.employeeForm.reset();
              window.location.reload();
            }
          });
        },
        error: (error) => {
          console.error('Erro na requisição:', error);
          Swal.fire('Erro!', 'Ocorreu um erro ao cadastrar o funcionário.', 'error');
        },
        complete: () => {
          // Opcional: algo que você queira fazer quando o Observable completar
        }
      });
    } else {
      console.error('Formulário inválido');

      let errorFields = '';
      Object.keys(this.employeeForm.controls).forEach(field => {
        const control = this.employeeForm.get(field);
        if (control?.invalid) {
          errorFields += `${field}, `;
        }
      });

      Swal.fire('Atenção!', `Os seguintes campos estão inválidos: ${errorFields}`, 'warning');

      Object.keys(this.employeeForm.controls).forEach(field => {
        const control = this.employeeForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        console.error('Erro ao obter cargos:', error);
      }
    );
  }

  getDepartments() {
    this.userService.allDepartments().subscribe(
      response => {
        this.departamentos = response;
        console.log(this.departamentos);

      },
      error => {
        console.error('Erro ao obter departamentos:', error);
      }
    );
  }

  getNameStates() {
    this.userService.getStates().subscribe(
      response => {
        this.siglas = response.map((estado: any) => estado.sigla);
      },
      error => {
        console.error('Erro ao obter estados:', error);
      }
    );
  }
}
