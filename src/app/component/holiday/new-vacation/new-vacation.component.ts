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
import { EmployeeListService } from '../../../core/services/employee-list.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VacationRequest } from '../../../model/vacation-request.model';
import { NewVacationService } from '../../../core/services/new-vacation.service';

@Component({
  selector: 'app-new-vacation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './new-vacation.component.html',
  styleUrls: ['./new-vacation.component.css'],
  providers: [HolidayRequestService, EmployeeListService, NewVacationService],
})
export class NewVacationComponent {
  form!: FormGroup;
  requests: any;
  daysAvailable: any;
  isAvailable: boolean = true;
  quantityDays: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private holidayRequest: HolidayRequestService,
    private employeeService: EmployeeListService,
    private newVacationService: NewVacationService,
    private router: Router
  ) { }

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
      year: 'numeric',
    });
  }

  verifyIsExit(id: number) { }

  onSubmit() {
    const inicioFerias = this.form.get('DATA_INICIO_FERIAS')?.value;
    const fimFerias = this.form.get('DATA_FIM_FERIAS')?.value;
    const id = this.form.get('ID_FUNCIONARIO')?.value;
    console.log(inicioFerias, fimFerias);

    const results = this.newVacationService.getRequestVacationByIdEmployee(id).subscribe((res: any) => {
      console.log(res);

      const solicitacoes = res;
      console.log(solicitacoes.STATUS_SOLICITACAO)
      if (solicitacoes.STATUS_SOLICITACAO === 'PENDENTE') {
        Swal.fire({
          icon: 'error',
          title: 'Solicitação inválida',
          text: 'Há uma solicitação pendente, aguarde retorno RH.',
        });
      }

      if (solicitacoes.STATUS_SOLICITACAO === 'APROVADO') {
        Swal.fire({
          icon: 'error',
          title: 'Solicitação inválida',
          text: 'Você já possui férias aprovadas.',
        }).then((res) => {
          if (res.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      }

      this.calculateDaysDifference(inicioFerias, fimFerias);
      console.log(this.quantityDays);

      if (this.quantityDays > this.daysAvailable) {
        Swal.fire({
          icon: 'error',
          title: 'Período selecionado maior do que o período de dias disponíveis',
        });
        return;
      } else if (this.quantityDays < this.daysAvailable) {
        Swal.fire({
          icon: 'error',
          title: 'Período selecionado menor do que o período de dias disponíveis',
        });
        return;
      }

    });

    console.log(results);

    this.newVacationService.sendRequestVacation(this.form.value).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    );

    // Verifica status da solicitação existente

    // if (pendingRequest) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Solicitação inválida',
    //     text: 'Há uma solicitação pendente, aguarde retorno RH.',
    //   });
    //   return;
    // } else if (approvedRequest) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Solicitação inválida',
      //   text: 'Você já possui férias aprovadas.',
      // }).then((res) => {
      //   if (res.isConfirmed) {
      //     this.router.navigate(['/home']);
      //   }
      // });
    //   return;
    // } else {
    //   this.calculateDaysDifference(inicioFerias, fimFerias);
    //   console.log(this.quantityDays);

    //   if (this.quantityDays > this.daysAvailable) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Período selecionado maior do que o período de dias disponíveis',
    //     });
    //     return;
    //   } else if (this.quantityDays < this.daysAvailable) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Período selecionado menor do que o período de dias disponíveis',
    //     });
    //     return;
    //   }

    //   }
    // });
  }

  handleSuccess(response: any) {
    console.log('Solicitação de férias enviada com sucesso!', response);
    Swal.fire({
      icon: 'success',
      title: 'Solicitação de férias enviada com sucesso',
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    });
  }

  handleError(error: { status: number; error: { message: string } }) {
    console.error('Erro ao enviar solicitação de férias:', error);

    const errorMessage =
      error.status === 400 &&
        error.error.message ===
        'Já existe uma solicitação de férias para este funcionário.'
        ? 'Já existe uma solicitação de férias pendente. Aguarde aprovação ou contate o RH'
        : 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.';

    Swal.fire({
      icon: 'error',
      title: 'Erro ao enviar solicitação',
      text: errorMessage,
    });
  }

  calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcula a diferença em milissegundos
    const difference = Math.abs(end.getTime() - start.getTime());

    // Calcula o número de dias dividindo pelos milissegundos em um dia
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    this.quantityDays = daysDifference;

    return daysDifference;
  }

  getDaysAvailable() {
    const id = localStorage.getItem('id');
    this.employeeService.userById(Number(id)).subscribe(
      (res) => {
        // Verifica se a propriedade existe antes de atribuir o valor na variável
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
