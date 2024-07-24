// Seu componente TypeScript
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-fertilizantes',
  templateUrl: './fertilizantes.component.html',
  styleUrls: ['./fertilizantes.component.css'],
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
export class FertilizantesComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  fertilizantes: any[] = []; // Substitua pelo seu array de dados original
  filteredFertilizantes: any[] = [];
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
    this.getFertilizantes(); // Chama o método para buscar os dados
  }

  getFertilizantes() {
    this.catalogService.findFertilizantes().subscribe((fertil: any[]) => {
      this.fertilizantes = fertil;
      this.filteredFertilizantes = fertil; // Inicialmente, ambos serão iguais
      this.extractUniqueFamilies(); // Chame a função aqui
    });
  }


  filterByLetter(letter: string) {
    this.p = 1

    this.filteredFertilizantes = this.fertilizantes.filter(dado =>
      dado.DESCRICAO.startsWith(letter)
    );
  }

  filterBySearchTerm() {
    this.p = 1;
    this.filteredFertilizantes = this.fertilizantes.filter((dado) => {
      const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
      const searchTermFirstLetters = this.searchTerm.toLowerCase().slice(0, firstWord.length);
      return firstWord.startsWith(searchTermFirstLetters);
    });
  }

  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredFertilizantes.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredFertilizantes.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
  }

  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredFertilizantes = this.fertilizantes;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredFertilizantes = this.fertilizantes.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily;
      });
    }
  }




  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredFertilizantes = this.fertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredFertilizantes = this.fertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredFertilizantes = this.fertilizantes;
    }
  }




  extractUniqueFamilies() {
    const families = new Set<string>();
    this.fertilizantes.forEach((dado) => {
      families.add(dado.FAMILIA);
    });
    this.uniqueFamilies = Array.from(families);
  }


  aplicarFiltros() {
    this.p = 1;

    // Aplicar o filtro por letra, se houver
    if (this.searchTerm) {
      this.filterBySearchTerm();

      if (this.selectedFamily) {
        this.filteredFertilizantes = this.filteredFertilizantes.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredFertilizantes = this.filteredFertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredFertilizantes = this.filteredFertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }
    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredFertilizantes = this.fertilizantes.slice(); // Criar uma cópia para não modificar o array original

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        this.filteredFertilizantes = this.filteredFertilizantes.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredFertilizantes = this.filteredFertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredFertilizantes = this.filteredFertilizantes.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }

      // Ordenar, se necessário
      this.orderByGroup();
    }
  }
}


