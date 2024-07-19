import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comercialNumber'
})
export class ComercialPipe implements PipeTransform {

  transform(value: string | number): string {
    if (value == null) return '';

    const phoneNumber = value.toString().replace(/\D/g, '');

    if (phoneNumber.length === 10) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    }

    return value.toString();
  }
}
