import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListRoleService } from './list-role.service';

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css',
  providers: [ListRoleService]
})
export class ListRoleComponent {

  constructor(
    private roleService: ListRoleService
  ){}

  roles!: any

  ngOnInit(){
    this.getAllRoles()
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe(response => {
      console.log(response);

      this.roles = response

    })
  }

}
