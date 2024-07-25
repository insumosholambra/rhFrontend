import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/cadastros/user/user.component';
import { LayoutComponent } from './component/layout/layout.component';
import { AuthGuard } from './component/login/auth.guard';
import { RoleComponent } from './component/cadastros/role/role.component';
import { EmployeeListComponent } from './component/lists/employee-list/employee-list.component';
import { ListRoleComponent } from './component/lists/role-list/list-role.component';
import { DepartmentComponent } from './component/cadastros/department/department.component';
import { DepartmentListComponent } from './component/lists/department-list/department-list.component';
import { PdfComponent } from './component/pdf/pdf.component';
import { DocsListComponent } from './component/lists/docs-list/docs-list.component';
import { holidayRoutes } from './component/holiday/holiday-routes';
import { VisitComponent } from './component/visit/visit.component';
import { VisitReportComponent } from './component/visit-report/visit-report.component';
import { BiologicosComponent } from './catalog/biologicos/biologicos.component';
import { DefensivosComponent } from './catalog/defensivos/defensivos.component';
import { FertilizantesComponent } from './catalog/fertilizantes/fertilizantes.component';
import { PlasticoseTelasComponent } from './catalog/plasticosetelas/plasticoseTelas.component';
import { EmbalagensComponent } from './catalog/embalagens/embalagens.component';
import { ProfileComponent } from './component/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'register', component: UserComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'department-register', component: DepartmentComponent },
      { path: 'department-list', component: DepartmentListComponent },
      { path: 'role-list', component: ListRoleComponent },
      { path: 'role-register', component: RoleComponent },
      { path: 'docs-register', component: PdfComponent },
      { path: 'docs-list', component: DocsListComponent },
      { path: 'visit', component: VisitComponent },
      { path: 'visit-report', component: VisitReportComponent },
      { path: 'catalog/biologicos', component: BiologicosComponent },
      { path: 'catalog/defensivos', component: DefensivosComponent},
      { path: 'catalog/fertilizantes', component: FertilizantesComponent},
      { path: 'catalog/plast', component: PlasticoseTelasComponent},
      { path: 'catalog/embalagens', component: EmbalagensComponent}


    ]
  },
  ...holidayRoutes
];

export const appRoutes = provideRouter(routes);
