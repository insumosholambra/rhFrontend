import { Component } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-diversos',
  templateUrl: './diversos.component.html',
  styleUrls: ['./diversos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    NgxPaginationModule
  ],
  providers: [ CatalogService]
})
export class DiversosComponent {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  filteredDiversos: any[] = [];
  ordenarPorGrupo: boolean = false;
  p = 1;
  searchTerm: string = ''; // Adicione a propriedade searchTerm
  selectedFamily: any;
  diversos: any[] = []
  uniqueFamilies: string[] = [];
  available:  boolean = false;
  unavailable:  boolean = false;
  selectedAvailability: any;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getDiversos(); // Chama o método para buscar os dados
    this.extractUniqueFamilies();
  }

  getDiversos() {
    this.catalogService.findDiversos().subscribe((defe: any[]) => {
      this.diversos = defe;
      this.filteredDiversos = defe;

      this.extractUniqueFamilies(); // Chame extractUniqueFamilies após receber os dados
    });
  }

  filterByLetter(letter: string) {
    this.p = 1; // Define o valor de p para 1

    this.filteredDiversos = this.diversos.filter(dado =>
      dado.DESCRICAO.startsWith(letter.toUpperCase()) // Certifique-se de comparar a letra em maiúscula
    );
  }



  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredDiversos = this.diversos;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredDiversos = this.diversos.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily
      });
    }
  }



  extractUniqueFamilies() {
    const families = new Set<string>();
    this.diversos.forEach((dado) => {
      families.add(dado.FAMILIA);
    });
    this.uniqueFamilies = Array.from(families);
  }

  filterBySearchTerm() {
    this.p = 1;
    this.filteredDiversos = this.diversos.filter((dado) => {
      const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
      const searchTermFirstLetters = this.searchTerm.toLowerCase().slice(0, firstWord.length);
      return firstWord.startsWith(searchTermFirstLetters);
    });
  }


  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredDiversos = this.diversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredDiversos = this.diversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredDiversos = this.diversos;
    }
  }


  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredDiversos.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredDiversos.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
  }


  aplicarFiltros() {
    this.p = 1;

    // Aplicar o filtro por letra, se houver
    if (this.searchTerm) {
      this.filterBySearchTerm();

      if (this.selectedFamily) {
        this.filteredDiversos = this.filteredDiversos.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredDiversos = this.filteredDiversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredDiversos = this.filteredDiversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }
    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredDiversos = this.diversos.slice(); // Criar uma cópia para não modificar o array original

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        this.filteredDiversos = this.filteredDiversos.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredDiversos = this.filteredDiversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredDiversos = this.filteredDiversos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }

      // Ordenar, se necessário
      this.orderByGroup();
    }
  }
}
