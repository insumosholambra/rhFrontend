import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.css'
})
export class HolidayListComponent {
departments: any;

}
