import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormField,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ID: ['', Validators.required],
      PASSWORD: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      const { ID, PASSWORD } = this.form.value;
      this.loginService.login({ ID, PASSWORD }).subscribe(
        response => {
          this.setItems(response)
          this.router.navigate(['/home']);
        },
        error => {
          let errorMessage = 'Parece que nosso sistema está instável. Por favor, aguarde enquanto solucionamos o problema';

          if (error.error && error.error.message) {
            if (error.error.message === 'User not found') {
              errorMessage = 'Usuário não encontrado. Verifique seu ID e senha e tente novamente.';
            } else {
              errorMessage
            }
          }

          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: errorMessage
          });
          console.error('Login failed', error);
        }


      );
    } else {
      console.log('Formulário inválido');
    }
  }

  setItems(response: any){
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('name', response.username);
    localStorage.setItem('subname', response.subname);
    localStorage.setItem('cargo', response.cargo.DESCRICAO);
    localStorage.setItem('departamento', response.departamento.DESCRICAO);
    localStorage.setItem('id', response.id);

  }
}
