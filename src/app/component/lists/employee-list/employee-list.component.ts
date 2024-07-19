import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from '../../../core/services/employee-list.service';
import { Employee } from '../../../model/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditUserComponent } from '../../../modal/edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SharedModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeListService, BsModalService],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private employeeListService: EmployeeListService,
    private modalService: BsModalService
  ) { }

  modalRef?: BsModalRef;
  DESCRICAO_DEP: string = ''
  DESCRICAO_CARGO: string = ''
  uniqueDepartments: Set<string> = new Set();
  uniquePositions: Set<string> = new Set();


  selectedEmployee!: Employee;
  employees: Employee[] = [];
  employee: Employee = {
    ID: 0,
    PASSWORD: '',
    NOME: '',
    SOBRENOME: '',
    CPF: '',
    RG: '',
    DATA_NASCTO: '',
    ENDERECO: '',
    BAIRRO: '',
    CIDADE: '',
    ESTADO: '',
    TELEFONE: '',
    TEL_COMERCIAL: '',
    RAMAL: '',
    EMAIL: '',
    DEPARTAMENTO: {ID: 0, DESCRICAO: ''},
    CARGO: {ID: 0, DESCRICAO: ''},
    SALDO_FERIAS: 0,
    ULTIMO_PERIODO_FERIAS: '0',
    DATA_CADASTRO: '0',
  };

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.employeeListService.allUsers().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: any) => {
        console.error('Erro ao buscar usuários:', error);
      }
    });
  }

  edit(employee: Employee) {
    this.selectedEmployee = employee;

    const initialState = {
      employee: this.selectedEmployee,
    };
    this.modalRef = this.modalService.show(EditUserComponent, { initialState });
  }

  delete(employee: Employee) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir esse usuário?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeListService.deleteEmployee(employee.ID).subscribe((response) => {
            if (response) {
              Swal.fire({
                title: 'Usuário excluído com sucesso!',
                icon: 'success',
              }).then((res) => {
                if (res.isConfirmed) {
                  window.location.reload();
                }
                window.location.reload();

              });
            }
          });
      }

    });
  }
}
