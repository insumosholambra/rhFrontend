import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../core/services/visit.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Visit } from '../../model/visit.model';

const module = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrls: ['./visit-report.component.css'],
  standalone: true,
  imports: [...module],
  providers: [VisitService, UserService],
})
export class VisitReportComponent implements OnInit {
  visits: Visit[] = [];
  filteredVisits: Visit[] = [];
  names: any[] = [];
  clients: string[] = [];
  selectedName: string = '';
  selectedCliente: string = '';

  name: string = '';

  nomeCompleto: string = '';
  userInfo: any;
  userType: string = '';
  nameClients: string = '';
  cargo: string = '';

  constructor(
    private visitService: VisitService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getUser();
    this.getVisits();

    this.cargo = localStorage.getItem('cargo') || '';
  }

  verifyUserType() {
    if (this.userInfo && this.userInfo.CARGO === 'Gerente') {
      this.userType = 'Gerente';
    }
  }

  getUserInfo() {
    this.userInfo = this.authService.getUserInfo();

    if (this.userInfo) {
      this.verifyUserType();
      this.getVisits();
    } else {
      console.error('Erro ao obter informações do usuário');
    }
  }

  getUser() {
    this.userService.getUserNames().subscribe(
      (res: any) => {
        this.names = [];

        for (const employee of res) {
          if (
            employee.DEPARTAMENTO &&
            employee.DEPARTAMENTO.DESCRICAO === 'Vendas'
          ) {
            this.names.push({ nome: employee.NOME + employee.SOBRENOME });
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
          this.clients = [];
          this.names = [];

          const tecSet = new Set<string>();

          res.forEach((cliente) => {
            if (cliente.CLIENTE) {
              this.clients.push(cliente.CLIENTE);
            }
            if (cliente.NOME && cliente.SOBRENOME) {
              tecSet.add(cliente.NOME + ' ' + cliente.SOBRENOME);
            }
          });

          this.names = Array.from(tecSet);


          this.visits = Array.isArray(res) ? res : [res];
          this.filteredVisits = this.visits.length ? this.visits : [];
        },
        (error) => {
          console.error('Erro ao buscar todas as visitas:', error);
        }
      );
    } else {

      this.visitService.getVisitsById(Number(id)).subscribe(
        (res: Visit[]) => {
          this.clients = [];
          this.names = [];

          const tecSet = new Set<string>();

          res.forEach((cliente) => {
            if (cliente.CLIENTE) {
              this.clients.push(cliente.CLIENTE);
            }
            if (cliente.NOME && cliente.SOBRENOME) {
              tecSet.add(cliente.NOME + ' ' + cliente.SOBRENOME);
            }
          });

          this.names = Array.from(tecSet);

          this.visits = Array.isArray(res) ? res : [res];
          this.filteredVisits = this.visits.length ? this.visits : [];
        },
        (error) => {
          console.error('Erro ao buscar visitas do usuário:', error);
        }
      );
    }
  }



  filterVisitsByName() {

    if (this.selectedName) {
      console.log(this.selectedName);

      this.filteredVisits = this.visits.filter((visit) => {
        const selectedNameNormalized = this.selectedName.trim().toLowerCase();

        const visitNameNormalized = (visit.NOME + ' ' + visit.SOBRENOME).trim().toLowerCase();
        return visitNameNormalized === selectedNameNormalized;
      });
    } else {
      this.filteredVisits = this.visits;
    }
  }

  filterVisistByCliente() {
    if (this.selectedCliente) {
      this.filteredVisits = this.visits.filter(
        (visit) => visit.CLIENTE === this.selectedCliente
      );
    } else {
      this.filteredVisits = this.visits;
    }
  }

  clearFilter() {
    this.filteredVisits = this.visits;
  }

  showDetails() {
    throw new Error('Method not implemented.');
  }
}
