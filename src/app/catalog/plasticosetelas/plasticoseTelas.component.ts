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
  selector: 'app-plasticoseTelas',
  templateUrl: './plasticoseTelas.component.html',
  styleUrls: ['./plasticoseTelas.component.css'],
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
    NgxPaginationModule,

  ],
  providers: [
    CatalogService
  ]

})
export class PlasticoseTelasComponent {

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  plastelas: any[] = []; // Substitua pelo seu array de dados original
  filteredplastelas: any[] = [];
  ordenarPorGrupo: boolean = false;
  p = 1;
  searchTerm: string = ''; // Adicione a propriedade searchTerm
  selectedFamily: any;
  uniqueFamilies: string[] = []

  available:  boolean = false;
  unavailable:  boolean = false;
  selectedAvailability: any;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getDefensivos(); // Chama o método para buscar os dados
  }

  getDefensivos() {
    this.catalogService.findPLasticosetelas().subscribe((fertil: any[]) => {
      this.plastelas = fertil;
      this.filteredplastelas = fertil; // Inicialmente, ambos serão iguais

      this.extractUniqueFamilies();

    });
  }

  filterByLetter(letter: string) {
    this.p = 1

    this.filteredplastelas = this.plastelas.filter(dado =>
      dado.DESCRICAO.startsWith(letter)
    );

  }

  filterBySearchTerm() {
    this.p = 1;
    this.filteredplastelas = this.plastelas.filter((dado) => {
      const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
      const searchTermFirstLetters = this.searchTerm.toLowerCase().slice(0, firstWord.length);
      return firstWord.startsWith(searchTermFirstLetters);
    });
  }

  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredplastelas = this.plastelas;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredplastelas = this.plastelas.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily;
      });
    }
  }

  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredplastelas = this.plastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredplastelas = this.plastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredplastelas = this.plastelas;
    }
  }


  extractUniqueFamilies() {
    const families = new Set<string>();
    this.plastelas.forEach((dado) => {
      families.add(dado.FAMILIA);
    });
    this.uniqueFamilies = Array.from(families);
  }

  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredplastelas.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredplastelas.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
  }

  aplicarFiltros() {
    this.p = 1;

    // Aplicar o filtro por letra, se houver
    if (this.searchTerm) {
      this.filterBySearchTerm();

      if (this.selectedFamily) {
        this.filteredplastelas = this.filteredplastelas.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredplastelas = this.filteredplastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredplastelas = this.filteredplastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }
    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredplastelas = this.plastelas.slice(); // Criar uma cópia para não modificar o array original

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        this.filteredplastelas = this.filteredplastelas.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredplastelas = this.filteredplastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredplastelas = this.filteredplastelas.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }

      // Ordenar, se necessário
      this.orderByGroup();
    }
  }


}
