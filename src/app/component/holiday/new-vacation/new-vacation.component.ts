import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HolidayRequestService } from '../holiday-request/holiday-request.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from '../../lists/employee-list/employee-list.service';
import { Employee } from '../../../model/employee.model';
import { NewVacationService } from './new-vacation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-vacation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './new-vacation.component.html',
  styleUrl: './new-vacation.component.css',
  providers: [HolidayRequestService, EmployeeListService, NewVacationService],
})
export class NewVacationComponent {


  form!: FormGroup;
  requests: any;
  daysAvailable: any;
  isAvailable: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private holidayRequest: HolidayRequestService,
    private employeeService: EmployeeListService,
    private newVacationService: NewVacationService
  ) {}


  ngOnInit() {
    const date = new Date();
    const today = date.toISOString(); // Formata a data para o formato ISO 8601

    const id = localStorage.getItem('id');
    this.form = this.fb.group({
      ID_FUNCIONARIO: [id, Validators.required],
      STATUS_SOLICITACAO: ['PENDENTE', Validators.required],
      DATA_SOLICITACAO: [today, Validators.required],
      DATA_INICIO_FERIAS: ['', Validators.required],
      DATA_FIM_FERIAS: ['', Validators.required],
    });

    this.getDaysAvailable();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }



  onSubmit() {
    console.log(this.form.value);

    this.newVacationService.sendRequestVacation(this.form.value).subscribe(
      (response) => {
        console.log(response);
        console.log('Solicitação de férias enviada com sucesso!', response);
        Swal.fire({
          icon: 'success',
          title: 'Solicitação de férias enviada com sucesso'
        }).then(res => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error) => {
        console.error('Erro ao enviar solicitação de férias:', error);

        if (error.status === 400 && error.error.message === 'Já existe uma solicitação de férias para este funcionário.') {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar solicitação',
            text: 'Já existe uma solicitação de férias pendente. Aguarde aprovação ou contate o RH'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar solicitação',
            text: 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.'
          });
        }
      }
    );
  }






  getDaysAvailable() {
    const id = localStorage.getItem('id');
    this.employeeService.userById(Number(id)).subscribe(
      (res) => {
        //precisa verificar se a propriedade existe antes de atribuir o valor na variável, se não fizer, o JS não aceita
        if (res && 'SALDO_FERIAS' in res) {
          this.daysAvailable = res.SALDO_FERIAS;
        } else {
          console.error(
            'A propriedade SALDO_FERIAS não existe no objeto retornado pela API'
          );
        }
      },
      (error) => {
        console.error('Erro ao fazer a chamada da API:', error);
      }
    );
  }
}
