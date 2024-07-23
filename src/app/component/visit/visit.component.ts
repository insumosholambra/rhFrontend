import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitService } from '../../core/services/visit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
  providers: [FormBuilder, VisitService, DatePipe],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
 export class VisitComponent implements OnInit {

  visitForm!: FormGroup;
  currentDate: any
  formattedDate: any
  formattedDateBrl: any
  name!: string
  subname!: string

  characterCount: number = 0;
  maxCharacters: number = 254; // Defina o número máximo de caracteres permitidos


  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    const id = localStorage.getItem('id');
    this.name = localStorage.getItem(String('name')) || '';
    this.subname = localStorage.getItem(String('subname')) || '';

    this.currentDate = new Date();
    const formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.formattedDateBrl = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');


    this.visitForm = this.fb.group({
      DATA_VISITA: [''],
      NOME: [this.name],
      SOBRENOME: [this.subname],
      CONTATO: [''],
      CLIENTE: [''],
      PROPRIEDADE: [''],
      CIDADE: [''],
      CULTURA: [''],
      OBJETIVO: [''],
      CHEGADA: ['', Validators.required],
      SAIDA: ['', Validators.required],
      MOTIVO: [''],
      ASSUNTO: [''],
      PROBLEMAS: [''],
      CONDICOES_PROP: [''],
      MELHORIAS: [''],
      VISITA_FUTU: [false],
      NEW_DATE: [''],
      ID: [id],
      DATA_FORM: [formattedDate]
    });

    window.addEventListener('keydown', this.preventEnterKey, true);

  }

  preventEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.preventEnterKey, true);
  }

  formatTime(time: string): string {
    // Adiciona :00 para garantir hh:mm:ss

    if(time){
      return time.length === 5 ? time + ':00' : time;

    } else {
      return time = '00:00:00'
    }
  }
  submitForm() {
    const formData = this.visitForm.value;

    formData.CHEGADA = this.formatTime(formData.CHEGADA);
    formData.SAIDA = this.formatTime(formData.SAIDA);

    if (this.visitForm.valid) {
      this.visitService.newVisit(formData).subscribe(
        res => {
          if (res) {
            Swal.fire({
              title: 'Sucesso',
              text: 'Visita cadastrada com sucesso',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(result => {
              if (result.isConfirmed) {
                this.visitForm.reset();
                window.location.reload();
              }
            });
          }
        },
        err => {
          console.error('Erro ao cadastrar visita:', err);
        }
      );
    } else {
      if (!this.visitForm.controls['CHEGADA'].valid || !this.visitForm.controls['SAIDA'].valid) {
        Swal.fire({
          title: 'Erro',
          text: 'Os campos Chegada e Saída são obrigatórios',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Preencha todos os campos corretamente',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      console.error('Formulário inválido');
    }
  }

  updateCharacterCount(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.characterCount = inputElement.value.length;
  }

}
