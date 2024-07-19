import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string | number): string {
    if (value == null) return '';

    // Converte o valor para uma string e remove caracteres não numéricos
    const phoneNumber = value.toString().replace(/\D/g, '');

    // Aplica a máscara se o número tiver 11 dígitos
    if (phoneNumber.length === 11) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    }

    // Se não tiver 11 dígitos, retorna o valor original
    return value.toString();
  }
}
