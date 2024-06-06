import { Component } from '@angular/core';
import { DocsListService } from './docs-list.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-docs-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './docs-list.component.html',
  styleUrl: './docs-list.component.css',
  providers: [DocsListService]
})
export class DocsListComponent {


  docs: string[] = []

  constructor(
    private docsList: DocsListService
  ){}

  ngOnInit(){
    this.getDocs()
  }



  getDocs(){
    return this.docsList.getDocs().subscribe(response => {

      this.docs = response

    });
  }

  download(item: string) {
    this.docsList.downloadDoc(item).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      console.error('Erro ao baixar o arquivo:', error);
    });
  }



}
