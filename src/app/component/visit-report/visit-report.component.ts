import { Component } from '@angular/core';
import { Visit } from '../../model/visit.model';
import { CommonModule } from '@angular/common';
import { VisitService } from '../../core/services/visit.service';

@Component({
  selector: 'app-visit-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-report.component.html',
  styleUrl: './visit-report.component.css',
  providers: [VisitService]
})
export class VisitReportComponent {

  constructor(
    private visitService: VisitService
  ){}
  visits: Visit[] = [];

  ngOnInit(){
    this.getVisits()
  }


  getVisits(){
    this.visitService.getAllVisits().subscribe((res: any) => {
      console.log(res);
      this.visits = res;
    })
  }
}
