import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent {
  isRh: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment() {
    const department = localStorage.getItem('departamento');
    if (department === 'RH') {
      this.isRh = true;
    }
  }

  newVacation() {
    this.router.navigate(['/vacation/new-vacation']);
  }

  list() {
    this.router.navigate(['/vacation/vacation-list']);
  }

  request() {
    this.router.navigate(['/vacation/vacation-request']);
  }
}
