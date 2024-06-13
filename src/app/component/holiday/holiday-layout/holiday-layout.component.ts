import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-holiday-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class HolidayLayoutComponent { }
