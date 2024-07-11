import { Routes } from '@angular/router';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayRequestComponent } from './holiday-request/holiday-request.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { NewVacationComponent } from './new-vacation/new-vacation.component';
import { AuthGuard } from '../login/auth.guard';
import { HolidayLayoutComponent } from './holiday-layout/holiday-layout.component';

export const holidayRoutes: Routes = [
  {
    path: 'vacation',
    component: HolidayLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HolidayComponent },
      { path: 'vacation-list', component: HolidayListComponent },
      { path: 'vacation-request', component: HolidayRequestComponent },
      { path: 'new-vacation', component: NewVacationComponent },
      { path: 'my-vacations', component: NewVacationComponent }

    ]
  }
];
