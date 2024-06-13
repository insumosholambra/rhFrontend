import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  isRh: boolean = false


  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    this.getUserRole()
  }

  getUserRole(){
    const departamento = localStorage.getItem('departamento')
    if(departamento == 'R.H'){
      this.isRh = true
    }
  }

  register() {
    this.router.navigate(['/home/register'])
  }

  registerRole() {
    this.router.navigate(['/home/role-register'])
  }

  list() {
    this.router.navigate(['/home/employee-list'])
  }

  listRoles() {
    this.router.navigate(['/home/role-list'])
  }
  registerDepartments() {
    this.router.navigate(['/home/department-register'])
  }

  listDepartments() {
    this.router.navigate(['/home/department-list'])
  }

  readDocs() {
    this.router.navigate(['/home/docs-list'])
  }

  sendDocs() {
    this.router.navigate(['/home/docs-register'])
  }

  vacations() {
    this.router.navigate(['/vacation'])
  }

  myProfile() {
    throw new Error('Method not implemented.');
  }

  // myProfile() {
  //   throw new Error('Method not implemented.');
  // }

}
