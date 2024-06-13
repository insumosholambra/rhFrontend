import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from './employee-list.service';
import { Employee } from '../../../model/employee.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeListService]
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeListService: EmployeeListService){}

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
    DEPARTAMENTO: '',
    CARGO: '',
    SALDO_FERIAS: 0,
    ULTIMO_PERIODO_FERIAS: 0
  }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.employeeListService.allUsers().subscribe(response => {
      this.employees = response;
      if(this.employees.length > 0){
        this.employee = this.employees[0]
      }
    });
  }




}
