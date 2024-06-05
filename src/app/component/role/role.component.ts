import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Role } from '../../model/role.model';
import Swal from 'sweetalert2';
import { RoleService } from './role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
  providers: [RoleService]

})
export class RoleComponent {


  roleForm!: FormGroup;
  role!: Role


  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private http: HttpClient
  ) {
    this.roleForm = this.fb.group({
      DESCRICAO: ['', Validators.required],
    })}


    ngOnInit(){
      this.getRoles()
    }



  getRoles() {
    this.roleService.getAllRoles().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error parsing response:', error);
      }
    );
  }


  onSubmit(){
    if(this.roleForm.valid){
      this.roleService.newRole(this.roleForm.value)
    } else {
      Swal.fire({
        title: 'Erro, por favor, verifique se o campo foi preenchido corretamente.'
      })
    }

  }




}
