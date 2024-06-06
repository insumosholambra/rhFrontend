import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  sendDoc(file: File) {
    console.log('Arquivo preparado para envio:', file);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('http://localhost:3000/pdf/upload', formData)
      .pipe(
        catchError((error) => {
          console.error('Erro ao enviar o documento:', error);
          return throwError(error);
        })
      );
  }
}
