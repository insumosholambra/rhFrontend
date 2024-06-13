import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router
  ){}


  ngOnInit(){
    this.getName()
  }


  name: string = ''
  cargo: any


  getName(){
    const nome = localStorage.getItem('name')
    const subname = localStorage.getItem('subname')
    const cargo = localStorage.getItem(String('cargo'))

    this.name = nome + ' ' + subname
    this.cargo = cargo
  }

  inicio(){
    this.router.navigate(['/home'])
  }

  exit(){
    this.router.navigate(['/login'])
    localStorage.clear()
  }



}
