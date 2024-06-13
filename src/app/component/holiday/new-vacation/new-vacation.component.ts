import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayRequestService } from '../holiday-request/holiday-request.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from '../../lists/employee-list/employee-list.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-new-vacation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './new-vacation.component.html',
  styleUrl: './new-vacation.component.css',
  providers: [HolidayRequestService, EmployeeListService]
})
export class NewVacationComponent {
onSubmit() {
throw new Error('Method not implemented.');
}


  form!: FormGroup
  requests: any
  daysAvailable: any
  isAvailable: boolean = true

  constructor(
    private readonly fb: FormBuilder,
    private holidayRequest: HolidayRequestService,
    private employeeService: EmployeeListService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      ID_FUNCIONARIO: ['', Validators.required],
      NOME_FUNCIONARIO: ['', Validators.required],
      DATA_ADMISSAO: ['', Validators.required],
      SALDO_ATUAL: ['', Validators.required],
      DATA_ULTIMA_FERIAS: ['', Validators.required],
      DIAS_GOZADOS: ['', Validators.required],
      SALDO_POS_FÉRIAS: ['', Validators.required],
      STATUS_SOLICITACAO: ['', Validators.required],
      DATA_SOLICITACAO: ['', Validators.required],
      DATA_INICIO_FERIAS: ['', Validators.required],
      DATA_FIM_FERIAS: ['', Validators.required],
    }),
    this.getDaysAvailable()
  }


  getDaysAvailable() {
    const id = localStorage.getItem('id');
    this.employeeService.userById(Number(id)).subscribe(res => {
      //precisa verificar se a propriedade existe antes de atribuir o valor na variável, se não fizer, ele não aceita
      if (res && 'SALDO_FERIAS' in res) {
        this.daysAvailable = res.SALDO_FERIAS;
      } else {
        console.error('A propriedade SALDO_FERIAS não existe no objeto retornado pela API');
      }
    }, error => {
      console.error('Erro ao fazer a chamada da API:', error);
    });
  }










}
