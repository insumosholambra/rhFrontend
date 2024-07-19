import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat',
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: string | number): string {
    let cpf = value.toString();

    // Adiciona zeros à esquerda se necessário
    while (cpf.length < 11) {
      cpf = '0' + cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
