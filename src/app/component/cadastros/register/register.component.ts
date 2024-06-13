import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../model/employee.model';
import { RegisterService } from './register.service';
import { HttpClientModule } from '@angular/common/http';
import { ListRoleService } from '../../lists/list-role/list-role.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [RegisterService, ListRoleService]
})
export class RegisterComponent {

  employeeForm!: FormGroup;

  departamentos: any
  siglas: any = ''

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
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
      DEPARTAMENTO: ['', Validators.required],
      CARGO: ['', Validators.required],
      DATA_CADASTRO: ['', Validators.required],
      ULTIMO_PERIODO_FERIAS: ['', Validators.required],
      SALDO_FERIAS: ['', Validators.required]

    });
  }

  ngOnInit(){
    this.getRoles();
    this.getDepartments();
    this.getNameStates();
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);

    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;


      this.registerService.newEmployee(employeeData).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          Swal.fire({
            title: 'Funcionário cadastrado com sucesso',
            confirmButtonText: 'Ok'
          }).then(result => {
            if(result.isConfirmed){
              this.employeeForm.reset();
              window.location.reload();
            }
          });
        },
        error: (error) => {
          console.error('Erro na requisição:', error);
        },
        complete: () => {
          // Opcional: algo que você queira fazer quando o Observable completar
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }


  cargos: any
  getRoles() {
    this.roleService.getAllRoles().subscribe(
      response => {
        this.cargos = response
      },
      error => {
        console.error('Error parsing response:', error);
      }
    );
  }

  getDepartments(){
    this.registerService.allDepartments().subscribe(
      response => {
        this.departamentos = response

      }
    )
  }


  getNameStates() {
    this.registerService.getStates().subscribe(response => {
      // Mapeando a resposta para obter apenas as siglas
      this.siglas = response.map((estado: any) => estado.sigla);

      console.log(this.siglas);
    });
  }



}
