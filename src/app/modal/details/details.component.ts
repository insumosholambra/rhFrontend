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

  isDefaultDate(date: Date | string | undefined): boolean {
    console.log(this.visit);
    if (!date) return false;
    const defaultDate = '1970-01-01T03:00:00.000Z';
    if (typeof date === 'string') {
      return date === defaultDate;
    } else if (date instanceof Date) {
      return date.toISOString().startsWith(defaultDate);
    }
    return false;
  }
  printPdf() {
    const part1 = document.getElementById('contentToConvertPart1');
    const part2 = document.getElementById('contentToConvertPart2');
    const part3 = document.getElementById('contentToConvertPart3');

    if (part1 && part2 && part3) {
      // Mostrar o loading
      const loadingElement = document.getElementById('loading');
      const buttonDownload = document.getElementById('button')
      if (loadingElement && buttonDownload) {
        buttonDownload.style.display = 'none'
        loadingElement.style.display = 'block';
      }

      html2canvas(part1, { scale: 2, scrollY: -window.scrollY }).then(
        (canvas1) => {
          html2canvas(part2, { scale: 2, scrollY: -window.scrollY }).then(
            (canvas2) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const pageWidth = pdf.internal.pageSize.getWidth();
              const pageHeight = pdf.internal.pageSize.getHeight();

              const imgWidth1 = canvas1.width / 2;
              const imgHeight1 = canvas1.height / 2;
              const imgWidth2 = canvas2.width / 2;
              const imgHeight2 = canvas2.height / 2;

              const ratio1 = Math.min(
                pageWidth / imgWidth1,
                pageHeight / imgHeight1
              );
              const ratio2 = Math.min(
                pageWidth / imgWidth2,
                pageHeight / imgHeight2
              );

              // Adiciona a primeira parte na posição inicial (0, 0)
              pdf.addImage(
                canvas1.toDataURL('image/png', 1.0),
                'PNG',
                0,
                0,
                imgWidth1 * ratio1,
                imgHeight1 * ratio1
              );

              // Adiciona a segunda parte logo abaixo da primeira
              const secondPartY = imgHeight1 * ratio1 + 10; // 10 mm de espaço entre as partes
              pdf.addImage(
                canvas2.toDataURL('image/png', 1.0),
                'PNG',
                0,
                secondPartY,
                imgWidth2 * ratio2,
                imgHeight2 * ratio2
              );

              // Captura a terceira parte e adiciona na segunda página
              html2canvas(part3, { scale: 2, scrollY: -window.scrollY }).then(
                (canvas3) => {
                  const imgWidth3 = canvas3.width / 2;
                  const imgHeight3 = canvas3.height / 2;
                  const ratio3 = Math.min(
                    pageWidth / imgWidth3,
                    pageHeight / imgHeight3
                  );

                  pdf.addPage();
                  pdf.addImage(
                    canvas3.toDataURL('image/png', 1.0),
                    'PNG',
                    0,
                    0,
                    imgWidth3 * ratio3,
                    imgHeight3 * ratio3
                  );

                  // Esconder o loading


                  pdf.save('relatorio-de-visitas.pdf');
                }
              );

              if(loadingElement && buttonDownload){
                loadingElement.style.display = 'none';
                buttonDownload.style.display = 'block'

              }
            }
          );
        }
      );
    }
  }
}
