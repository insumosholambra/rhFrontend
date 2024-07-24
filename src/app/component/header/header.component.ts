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
  isRh: boolean = true;
  showCatalog: boolean = false;


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

    const id = localStorage.getItem('id')

    this.employeeService.userById(Number(id)).subscribe(res => {
      this.name = `${res.NOME} ${res.SOBRENOME}`
      this.cargo = res.CARGO?.DESCRICAO
    })

  }

  home() {
    this.router.navigate(['/home']);
  }

  profile() {
    this.router.navigate(['/home/profile']);
  }

  register() {
    this.router.navigate(['/home/register']);
  }

  list() {
    this.router.navigate(['/home/employee-list']);
  }

  registerRole() {
    this.router.navigate(['/home/role-register']);
  }

  registerDepartments() {
    this.router.navigate(['/home/department-register']);
  }

  listDepartments() {
    this.router.navigate(['/home/department-list']);
  }

  listRoles() {
    this.router.navigate(['/home/role-list']);
  }

  myProfile() {
    this.router.navigate(['/home/my-profile']);
  }

  vacations() {
    this.router.navigate(['/vacation']);
  }

  readDocs() {
    this.router.navigate(['/home/docs-list']);
  }

  sendDocs() {
    this.router.navigate(['/home/docs-register']);
  }

  exit() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  visit() {
    this.router.navigate(['/home/visit']);
  }

  visitReport() {
    this.router.navigate(['/home/visit-report']);
  }

  navigateTo(route: string) {
    console.log(route);

    this.router.navigate([route]);
  }

  toggleCatalog(event: Event) {
    event.preventDefault();
    this.showCatalog = !this.showCatalog;
  }
}
