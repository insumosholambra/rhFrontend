import { Component, Input } from '@angular/core';
import { Visit } from '../../model/visit.model';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModule, CommonModule, MatIconModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() visit!: Visit;

  ngOnInit() {
    console.log(this.visit);
  }
  printPdf() {
    const part1 = document.getElementById('contentToConvertPart1');
    const part2 = document.getElementById('contentToConvertPart2');
    const part3 = document.getElementById('contentToConvertPart3');

    if (part1 && part2 && part3) {
      html2canvas(part1, { scrollY: -window.scrollY }).then((canvas1) => {
        const imgWidth = 210; // Largura A4 em mm
        const pageHeight = 295; // Altura A4 em mm
        const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas1, 'PNG', 0, 0, imgWidth, imgHeight1);

        html2canvas(part2, { scrollY: -window.scrollY }).then((canvas2) => {
          const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;

          pdf.addImage(canvas2, 'PNG', 0, imgHeight1, imgWidth, imgHeight2);

          html2canvas(part3, { scrollY: -window.scrollY }).then((canvas3) => {
            const imgHeight3 = (canvas3.height * imgWidth) / canvas3.width;

            pdf.addPage();
            pdf.addImage(canvas3, 'PNG', 0, 0, imgWidth, imgHeight3);

            pdf.save('relatorio-de-visitas.pdf');
          });
        });
      });
    }
  }



}
