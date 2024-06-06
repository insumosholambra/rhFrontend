import { Component } from '@angular/core';
import { PdfService } from './pdf.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PdfService]

})
export class PdfComponent {

  constructor(private pdfService: PdfService) {}

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  enviar(){
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    this.pdfService.sendDoc(this.selectedFile).subscribe(
      (response) => {
        console.log('Arquivo enviado com sucesso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Arquivo enviado com sucesso',
          confirmButtonText: 'Ok'
        }).then(res => {
          if(res.isConfirmed){
            window.location.reload()
          }
        })
        // Faça algo com a resposta, se necessário
      },
      (error) => {
        console.error('Erro ao enviar arquivo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Arquivo com o mesmo nome já existe!',
          denyButtonText: 'Ok'
        })
        // Faça algo com o erro, se necessário
      }
    );
  }
}
