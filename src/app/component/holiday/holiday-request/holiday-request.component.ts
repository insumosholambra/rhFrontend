import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HolidayRequestService } from './holiday-request.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from '../../lists/employee-list/employee-list.service';
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

  constructor(
    private holidayService: HolidayRequestService,
    private employeeListService: EmployeeListService
  ) {}

  ngOnInit() {
    this.getAllRequests();
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
              employeeName: employee
                ? `${employee.NOME} ${employee.SOBRENOME}`
                : 'Desconhecido',
              dataAdmissao: employee ? employee.DATA_CADASTRO : null,
              saldo: employee ? employee.SALDO_FERIAS : null,
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

  approve(data: any) {
    const newStatus = 'APROVADO';
    console.log(data);
    const ID = data.ID_SOLICITACAO;

    this.holidayService.approveRequest(ID, newStatus).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Férias aprovadas',
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

  reject(data: any) {
    const newStatus = 'REPROVADO';
    console.log(data);
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
