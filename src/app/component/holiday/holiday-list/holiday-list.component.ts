import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HolidayRequestService } from '../holiday-request/holiday-request.service';
import { HttpClientModule } from '@angular/common/http';
import { filter, forkJoin, map, pipe, switchMap, toArray } from 'rxjs';
import { EmployeeListService } from '../../../core/services/employee-list.service';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.css',
  providers: [HolidayRequestService, EmployeeListService]
})
export class HolidayListComponent {
  scheduled: any;

  constructor(
    private holidayService: HolidayRequestService,
    private employeeListService: EmployeeListService
  ){}

  ngOnInit(){
    this.getRequestList()
  }

// Filtrando solicitações aprovadas: Usamos map para filtrar as solicitações aprovadas.
// Obtendo detalhes dos funcionários: Usamos switchMap para transformar o array de solicitações aprovadas em um array de observables, cada um obtendo os detalhes do funcionário correspondente.
// forkJoin: Combina os resultados de todos os observables em um único observable que emite um array com todas as solicitações aprovadas incluindo os nomes dos funcionários.
// Adicionando nomes dos funcionários: Usamos map para adicionar os nomes dos funcionários às solicitações aprovadas.
// Inscrição e armazenamento: Inscrevemos no observable resultante e armazenamos os dados com os nomes dos funcionários em this.scheduled.

getRequestList() {
  this.holidayService.getRequests().pipe(
    map((requests: any[]) => requests.filter(item => item.STATUS_SOLICITACAO === 'APROVADO')),
    switchMap((approvedRequests) =>
      // Cria um array de observables para obter os detalhes dos funcionários
      forkJoin(approvedRequests.map(request =>
        this.employeeListService.userById(request.ID_FUNCIONARIO).pipe(
          map(employee => ({
            ...request,
            EMPLOYEE_NAME: employee.NOME + ' ' + employee.SOBRENOME
          }))
        )
      ))
    )
  ).subscribe(data => {
    // Armazena os dados com os nomes dos funcionários e adiciona o período de dias
    this.scheduled = data.map(item => ({
      ...item,
      PERIOD_DAYS: this.calculateDaysDifference(item.DATA_INICIO_FERIAS, item.DATA_FIM_FERIAS)
    }));

    console.log(this.scheduled);
  });
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

  calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcula a diferença em milissegundos
    const difference = Math.abs(end.getTime() - start.getTime());

    // Calcula o número de dias dividindo pelos milissegundos em um dia
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));

    return daysDifference;
  }




}
