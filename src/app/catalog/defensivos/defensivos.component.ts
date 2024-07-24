import { Component, OnInit } from "@angular/core";
import { CatalogService } from "../../core/services/catalog.service";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NgxPaginationModule } from "ngx-pagination";

@Component({
  selector: 'app-defensivos',
  templateUrl: './defensivos.component.html',
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

  styleUrls: ['./defensivos.component.css'],
  providers: [ CatalogService]
})
export class DefensivosComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  defensivos: any[] = [];
  filteredDefensivos: any[] = [];
  p = 1;
  searchTerm: string = ''; // Adicione a propriedade searchTerm
  selectedFamily: any;
  uniqueFamilies: string[] = [];
  selected = 'option2';
  searchFormControl: any

  available:  boolean = false;
  unavailable:  boolean = false;
  selectedAvailability: any;
  ordenarPorGrupo: any;
  openFispq: any;

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.getDefensivos();
    this.extractUniqueFamilies();  }

    getDefensivos() {
      this.catalogService.findDefensivos().subscribe((defe: any[]) => {
        this.defensivos = defe;
        this.filteredDefensivos = defe;
        console.log(defe)
        this.extractUniqueFamilies(); // Chame extractUniqueFamilies após receber os dados
      });
    }

    mostrarFISPQ(dado: any){
      this.openFispq = dado
      window.open(this.openFispq, '_blank');
    }

  filterByLetter(letter: string) {
    this.p = 1;
    this.filteredDefensivos = this.defensivos.filter((dado) =>
      dado.DESCRICAO.startsWith(letter)
    );
  }

  filterBySearchTerm() {
    this.p = 1;
    this.filteredDefensivos = this.defensivos.filter((dado) => {
      const firstWord = dado.DESCRICAO.split(' ')[0].toLowerCase();
      const searchTermFirstLetters = this.searchTerm.toLowerCase().slice(0, firstWord.length);
      return firstWord.startsWith(searchTermFirstLetters);
    });
  }

  filterByFamily() {
    this.p = 1;

    if (!this.selectedFamily) {
      this.filteredDefensivos = this.defensivos;
    } else {
      const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();

      this.filteredDefensivos = this.defensivos.filter((dado) => {
        const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
        return familia === lowercaseSelectedFamily;
      });
    }
  }

  filterByAvailability() {
    this.p = 1;

    if (this.selectedAvailability === 'available') {
      this.filteredDefensivos = this.defensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
    } else if (this.selectedAvailability === 'unavailable') {
      this.filteredDefensivos = this.defensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
    } else {
      // Se nada for selecionado, exibe todos os itens
      this.filteredDefensivos = this.defensivos;
    }
  }

  orderByGroup() {
    if (this.ordenarPorGrupo) {
      this.filteredDefensivos.sort((a, b) => a.GRUPO.localeCompare(b.GRUPO));
    } else {
      // Caso não esteja ordenando por grupo, volta à ordenação original por descrição
      this.filteredDefensivos.sort((a, b) => a.DESCRICAO.localeCompare(b.DESCRICAO));
    }
  }

  extractUniqueFamilies() {
    const families = new Set<string>();
    this.defensivos.forEach((dado) => {
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
        this.filteredDefensivos = this.filteredDefensivos.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredDefensivos = this.filteredDefensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredDefensivos = this.filteredDefensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }
    } else {
      // Se não houver filtro por letra, aplicar outros filtros
      this.filteredDefensivos = this.defensivos.slice(); // Criar uma cópia para não modificar o array original

      // Aplicar filtro por família, se houver
      if (this.selectedFamily) {
        this.filteredDefensivos = this.filteredDefensivos.filter((dado) => {
          const lowercaseSelectedFamily = this.selectedFamily.toLowerCase();
          const familia = dado.FAMILIA ? dado.FAMILIA.toLowerCase() : '';
          return familia === lowercaseSelectedFamily;
        });
      }

      // Aplicar filtro por disponibilidade, se houver
      if (this.selectedAvailability) {
        if (this.selectedAvailability === 'available') {
          this.filteredDefensivos = this.filteredDefensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL > 0);
        } else if (this.selectedAvailability === 'unavailable') {
          this.filteredDefensivos = this.filteredDefensivos.filter(fertilizante => fertilizante.SALDO_DISPONIVEL <= 0);
        }
      }

      // Ordenar, se necessário
      this.orderByGroup();
    }
  }


}
