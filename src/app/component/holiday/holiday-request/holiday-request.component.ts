import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HolidayRequestService } from './holiday-request.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from '../../../core/services/employee-list.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-request',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, HttpClientModule],
  templateUrl: './holiday-request.component.html',
  styleUrls: ['./holiday-request.component.css'],
  providers: [HolidayRequestService, EmployeeListService],
})
export class HolidayRequestComponent {
  vacations: any[] = [];
  pendent: boolean = true

  constructor(
    private holidayService: HolidayRequestService,
    private employeeListService: EmployeeListService
  ) {}

  ngOnInit() {
    this.getAllRequests();
    this.isPendent();
  }

  formatDate(dateString: any) {
    if (!dateString) {
      return ''; // Ou qualquer valor padrão que você prefira, como 'Data inválida'
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (dateString.match(datePattern)) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } else if (dateString.match(isoPattern)) {
      const date = new Date(dateString);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    } else {
      throw new Error(
        'Formato de data inválido. Use o formato yyyy-mm-dd ou ISO 8601.'
      );
    }
  }

  getAllRequests() {
    this.holidayService.getRequests().subscribe((res) => {
      if (res && Array.isArray(res)) {
        const employeeRequests = res.map((request) => {
          if (!request.DATA_ULTIMAS_FERIAS) {
            request.DATA_ULTIMAS_FERIAS = 0;
          }
          return this.employeeListService.userById(request.ID_FUNCIONARIO).pipe(
            map((employee) => ({
              ...request,
              EMPLOYEE_NAME: employee
                ? `${employee.NOME} ${employee.SOBRENOME}`
                : 'Desconhecido',
              DATA_ADMISSAO: employee ? employee.DATA_CADASTRO : null,
              SALDO_FERIAS: employee ? employee.SALDO_FERIAS : null,
            }))
          );
        });

        forkJoin(employeeRequests).subscribe(
          (detailedRequests) => {
            this.vacations = detailedRequests;
          },
          (error) => {
            console.error('Error fetching employee details:', error);
          }
        );
      }
    });
  }

  isPendent() {
    this.holidayService.getRequests().subscribe((res) => {
      const solicitacoes = res;
      this.pendent = solicitacoes.some((solicitacao: { STATUS_SOLICITACAO: string; }) => solicitacao.STATUS_SOLICITACAO === 'PENDENTE');
    });
  }

  alter(data: any) {
    // Função alter ainda não implementada
  }

  calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcula a diferença em milissegundos
    const difference = Math.abs(end.getTime() - start.getTime());

    // Calcula o número de dias dividindo pelos milissegundos em um dia
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));

    return daysDifference;
  }

  approve(data: any) {
    const newStatus = 'APROVADO';
    const ID = data.ID_SOLICITACAO;
    console.log(data);


    // Chamada para aprovar a solicitação
    this.holidayService.approveRequest(ID, newStatus).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Férias aprovadas',
        }).then(() => {
          // Após aprovado, atualiza o saldo de férias
          const daysDifference = this.calculateDaysDifference(data.DATA_INICIO_FERIAS, data.DATA_FIM_FERIAS);
          console.log(`Intervalo de dias escolhido: ${daysDifference} dias`);



          if (daysDifference > 0) {
            // Chame o serviço para atualizar o saldo
            this.holidayService.updateBalanceVacation(ID, daysDifference).subscribe(
              () => {
                window.location.reload(); // Recarrega a página (ou atualiza os dados na tela)

              },
              (error: any) => {
                console.error(`Erro ao atualizar saldo de férias para a solicitação ${ID}:`, error);
                Swal.fire({
                  icon: 'error',
                  title: 'Erro ao atualizar saldo de férias',
                  text: 'Por favor, tente novamente mais tarde.',
                });
              }
            );
          } else {
            // Caso a diferença de dias seja zero ou negativa (erro de lógica de datas)
            Swal.fire({
              icon: 'warning',
              title: 'Erro ao calcular dias de férias',
              text: 'Verifique as datas de início e fim das férias.',
            });
          }
        });
      },
      (error) => {
        console.error(`Erro ao aprovar solicitação de férias ${ID}:`, error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao aprovar solicitação de férias',
          text: 'Por favor, tente novamente mais tarde.',
        });
      }
    );
  }

  reject(data: any) {
    const newStatus = 'REPROVADO';
    const ID = data.ID_SOLICITACAO;

    this.holidayService.approveRequest(ID, newStatus).subscribe(
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Férias reprovadas',
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error) => {
        console.error(`Erro ao aprovar solicitação de férias ${ID}:`, error);
      }
    );
  }
}
