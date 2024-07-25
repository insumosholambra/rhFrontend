import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Employee } from '../../model/employee.model';
import { CpfFormatPipe } from '../../shared/cpf-format';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  employee!: Employee;
  cpf: string = '';
  name: string = '';
  matricula: number = 0;
  photoUrl: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const id = localStorage.getItem('id');
    if (id) {
      this.userService.getUserData(Number(id)).subscribe(
        res => {
          this.employee = res;
          this.cpf = this.employee.CPF;
          this.name = `${this.employee.NOME} ${this.employee.SOBRENOME}`;
          this.matricula = this.employee.MATRICULA;

          // Busca a foto separadamente
          this.getUserPhoto(Number(id));
        },
        error => {
          console.error('Erro ao carregar os dados do usuário:', error);
        }
      );
    }
  }

  getUserPhoto(id: number) {
    this.userService.getUserPhoto(id).subscribe(
      blob => {
        this.convertBlobToBase64(blob);
      },
      error => {
        console.error('Erro ao carregar a foto do usuário:', error);
      }
    );
  }

  convertBlobToBase64(blob: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.photoUrl = reader.result as string;
    };
    reader.readAsDataURL(blob);
  }

  goToVisit() {
    this.router.navigateByUrl('/home/visit');
  }

  goToReport() {
    this.router.navigateByUrl('/home/visit-report');
  }
}
