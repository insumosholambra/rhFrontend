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
  filteredVisits: any[] = [];
  names: any[] = [];
  selectedName: string = '';
  selectedCliente: string = '';

  name: string = ''

  nomeCompleto: string = '';
  userInfo: any;
  userType: string = '';
  nameClients: string = ''
  cargo: string = ''

  constructor(
    private visitService: VisitService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getUser();

    this.cargo = localStorage.getItem('cargo') || ''
  }

  verifyUserType() {
    if (this.userInfo && this.userInfo.CARGO === 'Gerente') {
      this.userType = 'Gerente';
    }
  }

  getUserInfo() {
    this.userInfo = this.authService.getUserInfo(); // Obter informações do token

    if (this.userInfo) {
      this.verifyUserType();
      this.getVisits(); // Chamar getVisits após obter informações do usuário
    } else {
      console.error('Erro ao obter informações do usuário');
    }
  }

  getUser() {
    this.userService.getUserNames().subscribe(
      (res: any) => {
        this.names = [];

        for (const employee of res) {
          if (employee.DEPARTAMENTO && employee.DEPARTAMENTO.DESCRICAO === 'Vendas') {
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

    if (this.userInfo.cargo === 'Gerente' || this.userInfo.cargo === 'Diretor Executivo') {
      this.visitService.getAllVisits().subscribe(
        (res) => {
          this.visits = Array.isArray(res) ? res : [res];
          this.filteredVisits = this.visits.length ? this.visits : [];
        },
        (error) => {
          console.error('Erro ao buscar todas as visitas:', error);
        }
      );
    } else {
      console.log('Entrou no else');
      this.visitService.getVisitsByUser(Number(id)).subscribe(
        (res) => {
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
      this.filteredVisits = this.visits.filter(
        (visit) => visit.NOME + visit.SOBRENOME === this.selectedName
      );
    } else {
      this.filteredVisits = this.visits;
    }
  }

  filterVisistByCliente(){
    if (this.selectedCliente) {
      this.filteredVisits = this.visits.filter(
        (visit) => visit.CLIENTE === this.selectedCliente
      );
    } else {
      this.filteredVisits = this.visits;
    }
  }
}
