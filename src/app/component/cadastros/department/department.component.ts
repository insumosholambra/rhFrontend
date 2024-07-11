import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentService } from './department.service';
import { environment } from '../../../environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  providers: [DepartmentService],
})
export class DepartmentComponent {
  departmentForm!: FormGroup<any>;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      DESCRICAO: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService
        .newDepartment(this.departmentForm.value)
        .subscribe((res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso.',
              text: 'Departamento cadastrado com sucesso',
            }).then((res) => {
              if (res.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title:
          'Erro, por favor, verifique se o campo foi preenchido corretamente.',
      });
    }
  }
}
