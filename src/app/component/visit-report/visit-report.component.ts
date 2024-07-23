import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisitService } from '../../core/services/visit.service';
import { UserService } from '../../core/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from '../../modal/details/details.component';
import { Visit } from '../../model/visit.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const module = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatIconModule
];

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrls: ['./visit-report.component.css'],
  imports: [ module ],
  standalone: true,
  providers: [VisitService, UserService, BsModalService],
})
export class VisitReportComponent implements OnInit, AfterViewInit {
  modalRef?: BsModalRef;
  visits: Visit[] = [];
  filteredVisits: Visit[] = [];
  names: any[] = [];
  clients: string[] = [];
  selectedName: string = '';
  selectedCliente: string = '';
  selectedVisit!: Visit;
  cargo: string = '';

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'desc'; // Definido para 'desc' por padrão

  displayedColumns: string[] = ['nome', 'dataVisita', 'cliente', 'detalhes'];
  dataSource = new MatTableDataSource<Visit>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private visitService: VisitService,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getVisits();
    this.cargo = localStorage.getItem('cargo') || '';
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // Configura a ordenação inicial
    this.sort.sort({
      id: 'dataVisita',
      start: 'desc',
      disableClear: false
    });
  }

  getUser() {
    this.userService.getUserNames().subscribe(
      (res: any) => {
        this.names = [];
        for (const employee of res) {
          if (employee.DEPARTAMENTO && employee.DEPARTAMENTO.DESCRICAO === 'Vendas') {
            this.names.push(employee.NOME + ' ' + employee.SOBRENOME);
          }
        }
      },
      (error) => {
        console.error('Erro ao buscar nomes de usuários:', error);
      }
    );
  }

  getVisits() {
    const id = localStorage.getItem('id');
    const cargo = localStorage.getItem('cargo');

    if (cargo === 'Gerente' || cargo === 'Diretor Executivo') {
      this.visitService.getAllVisits().subscribe(
        (res: Visit[]) => {
          this.processVisitData(res);
        },
        (error) => {
          console.error('Erro ao buscar todas as visitas:', error);
        }
      );
    } else {
      this.visitService.getVisitsById(Number(id)).subscribe(
        (res: Visit[]) => {
          this.processVisitData(res);
        },
        (error) => {
          console.error('Erro ao buscar visitas do usuário:', error);
        }
      );
    }
  }

  processVisitData(res: Visit[]) {
    this.clients = [];
    this.names = [];

    const tecSet = new Set<string>();

    res.forEach((visit) => {
      if (visit.CLIENTE) {
        this.clients.push(visit.CLIENTE);
      }
      if (visit.NOME && visit.SOBRENOME) {
        tecSet.add(visit.NOME + ' ' + visit.SOBRENOME);
      }
    });

    this.names = Array.from(tecSet);
    this.visits = Array.isArray(res) ? res : [res];
    this.filteredVisits = [...this.visits];
    this.dataSource.data = this.filteredVisits;
    this.sortDataByDate(); // Ordena os dados pela data mais recente
  }

  sortDataByDate() {
    this.filteredVisits = this.filteredVisits.sort((a, b) => {
      const dateA = new Date(a.DATA_VISITA);
      const dateB = new Date(b.DATA_VISITA);

      if (isNaN(dateA.getTime())) {
        return 1;
      }
      if (isNaN(dateB.getTime())) {
        return -1;
      }

      return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
    });
    this.dataSource.data = this.filteredVisits;
  }

  filterVisitsByName() {
    if (this.selectedName) {
      this.filteredVisits = this.visits.filter((visit) => {
        const selectedNameNormalized = this.selectedName.trim().toLowerCase();
        const visitNameNormalized = (visit.NOME + ' ' + visit.SOBRENOME).trim().toLowerCase();
        return visitNameNormalized === selectedNameNormalized;
      });
    } else {
      this.filteredVisits = [...this.visits];
    }
    this.dataSource.data = this.filteredVisits;
  }

  filterVisistByCliente() {
    if (this.selectedCliente) {
      this.filteredVisits = this.visits.filter(
        (visit) => visit.CLIENTE === this.selectedCliente
      );
    } else {
      this.filteredVisits = [...this.visits];
    }
    this.dataSource.data = this.filteredVisits;
  }

  clearFilter() {
    this.filteredVisits = [...this.visits];
    this.dataSource.data = this.filteredVisits;
    this.selectedCliente = ''
    this.selectedName = ''
  }

  showDetails(visit: Visit) {
    this.selectedVisit = visit;
    const initialState = { visit: this.selectedVisit };
    this.modalRef = this.modalService.show(DetailsComponent, { initialState,  class: 'gray custom-modal-width' // Adicione suas classes aqui
    });
  }

  sortByDate() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.filteredVisits = this.visits.sort((a, b) => {
      const dateA = new Date(a.DATA_VISITA);
      const dateB = new Date(b.DATA_VISITA);

      if (isNaN(dateA.getTime())) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      if (isNaN(dateB.getTime())) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }

      if (dateA < dateB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.dataSource.data = this.filteredVisits;
  }
}
