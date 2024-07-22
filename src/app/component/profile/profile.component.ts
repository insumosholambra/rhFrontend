import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Employee } from '../../model/employee.model';
import { CpfFormatPipe } from '../../shared/cpf-format';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {


  constructor(
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(){
    this.getUserData()
  }

  user!: Employee
  cpf: string = ''
  name: string = ''
  matricula: number = 0;

  getUserData(){
    const id = localStorage.getItem('id')
    return this.userService.getUserData(Number(id)).subscribe(res => {
      console.log(res);

      this.user = res
      this.cpf = this.user.CPF
      this.name = this.user.NOME + this.user.SOBRENOME;
      this.matricula = this.user.MATRICULA
    });
  }

  goToVisit() {
    this.router.navigateByUrl('/home/visit')
  }

  goToReport() {
    this.router.navigateByUrl('/home/visit-report')
  }

}
