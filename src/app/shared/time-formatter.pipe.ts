import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatter'
})
export class TimeFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Cria um objeto Date a partir da string de data e hora
    const date = new Date(value);

    // Formata a hora no formato 'HH:mm'
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

}
