import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListService } from '../../core/services/employee-list.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [EmployeeListService]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private location: Location,
    private employeeService: EmployeeListService
  ) {}

  rota: string = '';
  name: string = '';
  cargo: any;
  isHome: boolean = true;
  isRh: boolean = false;

  ngOnInit() {
    this.updateRoute();
    this.getName();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateRoute();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updateRoute() {
    this.rota = this.router.url;
    this.isHome = this.rota === '/home';
  }

  back() {
    this.location.back();
  }

  getName() {
    const id = localStorage.getItem('id');

    this.employeeService.userById(Number(id)).subscribe(res => {
      this.name = `${res.NOME} ${res.SOBRENOME}`;
      this.cargo = res.CARGO?.DESCRICAO;
      this.isRh = this.cargo === 'Gerente' || this.cargo === 'Diretor Executivo';
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  exit() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
