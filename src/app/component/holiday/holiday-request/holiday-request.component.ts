import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HolidayRequestService } from './holiday-request.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-holiday-request',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, HttpClientModule],
  templateUrl: './holiday-request.component.html',
  styleUrl: './holiday-request.component.css',
  providers: [HolidayRequestService]
})
export class HolidayRequestComponent {
  vacations: any;

  constructor(
    private holidayService: HolidayRequestService
  ){}

  ngOnInit(){
    this.getAllRequests();
  }

  formatDate(dateString: any) {
    if (!dateString) {
      return ''; // Ou qualquer valor padrão que você prefira, como 'Data inválida'
    }

    // Verifica se a string está no formato esperado
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(datePattern)) {
      throw new Error("Formato de data inválido. Use o formato yyyy-mm-dd.");
    }

    // Divide a string de data em partes
    const [year, month, day] = dateString.split('-');

    // Retorna a data formatada como dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }


  getAllRequests(){
    this.holidayService.getRequests().subscribe(res => {
      console.log(res);
      if(res.DATA_ULTIMAS_FERIAS == null || res.DATA_ULTIMAS_FERIAS == ''){
        res.DATA_ULTIMAS_FERIAS = 0
      }
      this.vacations = res


    })

  }

}
