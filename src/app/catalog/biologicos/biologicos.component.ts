import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-biologicos',
  templateUrl: './biologicos.component.html',
  standalone: true,
  imports: [  CommonModule,
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

  styleUrls: ['./biologicos.component.css'],
  providers: [ CatalogService ]
})
export class BiologicosComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  biologicos: any[] = []; // Substitua pelo seu array de dados original
  filteredBiologicos: any[] = [];
  ordenarPorGrupo: boolean = false;
  p = 1;
  searchTerm: string = ''; // Adicione a propriedade searchTerm
  selectedFamily: any;
  uniqueFamilies: string[] = [];

  available: boolean = false;
  unavailable: boolean = false;
  selectedAvailability: string = '';


  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getBiologicos();
  }

  getBiologicos() {
    this.catalogService.findBiologicos().subscribe((biologicos: any[]) => {
      this.biologicos = biologicos;
      this.filteredBiologicos = biologicos;
      this.extractUniqueFamilies();
    });
  }

  filterByLetter(letter: string) {
    this.p = 1;

    this.filteredBiologicos = this.biologicos.filter(dado =>
      dado.DESCRICAO.startsWith(letter)
    );

  }

  filterBySearchTerm() {
    this.p = 1;
    this.searchTerm = this.searchTerm.trim().toLowerCase();

    if (this.searchTerm) {
      this.filteredBiologicos = this.biologicos.filter((dado) => {
        const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
        const searchTermFirstLetters = this.searchTerm.slice(0, firstWord.length);
        return firstWord.startsWith(searchTermFirstLetters);
      });
    } else {
      this.filteredBiologicos = this.biologicos;
    }

    // Remova essa linha: this.aplicarFiltros();
  }

  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredBiologicos.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredBiologicos.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
  }

  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredBiologicos = this.biologicos;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredBiologicos = this.biologicos.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily;
      });
    }
  }

  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredBiologicos = this.biologicos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredBiologicos = this.biologicos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredBiologicos = this.biologicos;
    }
  }


  extractUniqueFamilies() {
    const families = new Set<string>();
    this.biologicos.forEach((dado) => {
      families.add(dado.FAMILIA);
    });
    this.uniqueFamilies = Array.from(families);
  }

  aplicarFiltros() {
    console.log('Iniciando aplicarFiltros()');
    this.p = 1;

    // Aplicar o filtro por letra, se houver


    if (this.searchTerm) {
      console.log('Aplicando filtro por termo:', this.searchTerm);
      this.filterBySearchTerm();


      if (this.selectedFamily) {
        console.log('Aplicando filtro por família:', this.selectedFamily);
        this.filteredBiologicos = this.filteredBiologicos.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      console.log('Filtrados após família:', this.filteredBiologicos.length);
      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        console.log('Aplicando filtro por disponibilidade:', this.selectedAvailability);
        if (this.selectedAvailability === 'available') {
          this.filteredBiologicos = this.filteredBiologicos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredBiologicos = this.filteredBiologicos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }


    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredBiologicos = this.biologicos.slice(); // Criar uma cópia para não modificar o array original
      console.log('Filtrados inicialmente:', this.filteredBiologicos.length);

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        console.log('Aplicando filtro por família:', this.selectedFamily);
        this.filterByFamily();
      }

      console.log('Filtrados após família:', this.filteredBiologicos.length);
      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        console.log('Aplicando filtro por disponibilidade:', this.selectedAvailability);
        this.filterByAvailability();
      }


      console.log('Filtrados após disponibilidade:', this.filteredBiologicos.length);

      // Ordenar, se necessário
      this.orderByGroup();
    }

    console.log('Fim de aplicarFiltros(), filtrados atuais:', this.filteredBiologicos.length);
  }

}
