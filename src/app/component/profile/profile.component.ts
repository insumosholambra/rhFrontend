import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
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

  getUserData(){
    const id = localStorage.getItem('id')
    return this.userService.getUserData(Number(id)).subscribe(res => {
      this.user = res
      this.cpf = this.user.CPF
    });
  }

  goToVisit() {
    this.router.navigateByUrl('/home/visit')
  }

  goToReport() {
    this.router.navigateByUrl('/home/visit-report')
  }

}
