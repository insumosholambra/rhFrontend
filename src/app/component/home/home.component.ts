import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LayoutComponent } from '../layout/layout.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  constructor(
    private router: Router
  ) { }

  register() {
    this.router.navigate(['/home/register'])
  }

  registerRole() {
    this.router.navigate(['/home/role'])
  }

  list() {
    this.router.navigate(['/home/employee-list'])
  }

  listRoles() {
    this.router.navigate(['/home/role-list'])
  }

  vacations() {
    throw new Error('Method not implemented.');
  }
  myProfile() {
    throw new Error('Method not implemented.');
  }

}
