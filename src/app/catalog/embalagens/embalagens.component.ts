// Seu componente TypeScript
import { Component, OnInit } from '@angular/core';
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
import { CatalogService } from '../../core/services/catalog.service';

@Component({
  selector: 'app-embalagens',
  templateUrl: './embalagens.component.html',
  styleUrls: ['./embalagens.component.css'],
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
  providers: [CatalogService]
})
export class EmbalagensComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  embalagens: any[] = []; // Substitua pelo seu array de dados original
  filteredembalagens: any[] = [];
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
    this.getEmbalagens(); // Chama o método para buscar os dados
  }

  getEmbalagens() {
    this.catalogService.getEmbalagens().subscribe((fertil: any[]) => {
      this.embalagens = fertil;
      this.filteredembalagens = fertil; // Inicialmente, ambos serão iguais

      this.extractUniqueFamilies();

    });
  }

  filterByLetter(letter: string) {
    this.p = 1

    this.filteredembalagens = this.embalagens.filter(dado =>
      dado.DESCRICAO.startsWith(letter)
    );
  }

  filterBySearchTerm() {
    this.p = 1;
    this.filteredembalagens = this.embalagens.filter((dado) => {
      const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
      const searchTermFirstLetters = this.searchTerm.toLowerCase().slice(0, firstWord.length);
      return firstWord.startsWith(searchTermFirstLetters);
    });
  }

  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredembalagens = this.embalagens;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredembalagens = this.embalagens.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily;
      });
    }
  }



  extractUniqueFamilies() {
    const families = new Set<string>();
    this.embalagens.forEach((dado) => {
      families.add(dado.FAMILIA);
    });
    this.uniqueFamilies = Array.from(families);
  }

  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredembalagens = this.embalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredembalagens = this.embalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredembalagens = this.embalagens;
    }
  }

  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredembalagens.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredembalagens.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
    this.p = 1

  }

  aplicarFiltros() {
    this.p = 1;

    // Aplicar o filtro por letra, se houver
    if (this.searchTerm) {
      this.filterBySearchTerm();

      if (this.selectedFamily) {
        this.filteredembalagens = this.filteredembalagens.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredembalagens = this.filteredembalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredembalagens = this.filteredembalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }
    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredembalagens = this.embalagens.slice(); // Criar uma cópia para não modificar o array original

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        this.filteredembalagens = this.filteredembalagens.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredembalagens = this.filteredembalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredembalagens = this.filteredembalagens.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }

      // Ordenar, se necessário
      this.orderByGroup();
    }
  }
}


