// app.component.ts ou app-routing.module.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LayoutComponent } from './component/layout/layout.component';
import { AuthGuard } from './component/login/auth.guard';
import { RoleComponent } from './component/role/role.component';
import { EmployeeListComponent } from './component/lists/employee-list/employee-list.component';
import { ListRoleComponent } from './component/lists/list-role/list-role.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'role', component: RoleComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'role-list', component: ListRoleComponent }



    ]
  }
];
