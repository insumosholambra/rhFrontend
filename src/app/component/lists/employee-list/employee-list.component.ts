import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from '../../../core/services/employee-list.service';
import { Employee } from '../../../model/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditUserComponent } from '../../../modal/edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

const modules = [
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  CommonModule,
  HttpClientModule,
  SharedModule,
  RouterModule
];
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [modules],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeListService, BsModalService],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private employeeListService: EmployeeListService,
    private modalService: BsModalService
  ) {}

  modalRef?: BsModalRef;
  DESCRICAO_DEP: string = '';
  DESCRICAO_CARGO: string = '';
  uniqueDepartments: Set<string> = new Set();
  uniquePositions: Set<string> = new Set();

  selectedEmployee!: Employee;
  employees: Employee[] = [];
  employee: Employee[] = []
  displayedColumns: string[] = ['nome', 'cpf', 'rg', 'nascimento', 'endereco', 'bairro', 'cidade', 'estado', 'telefone', 'telComercial', 'ramal', 'email', 'departamento', 'cargo', 'saldoFerias', 'acao'];


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
      },
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
        this.employeeListService.deleteEmployee(employee.ID).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Usuário excluído com sucesso!',
              icon: 'success',
            }).then(() => {
              this.employees = this.employees.filter(emp => emp.ID !== employee.ID);
            });
          },
          error: (error) => {
            console.error('Erro ao excluir usuário:', error);
            Swal.fire({
              title: 'Erro ao excluir usuário!',
              text: 'Ocorreu um erro ao tentar excluir o usuário. Por favor, tente novamente.',
              icon: 'error',
            });
          }
        });
      }
    });
  }

}
