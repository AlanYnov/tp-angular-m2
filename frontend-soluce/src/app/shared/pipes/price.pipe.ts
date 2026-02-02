import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {
  transform(value: number, currency: string = '€', locale: string = 'fr-FR'): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    return `${formatted} ${currency}`;
  }
}