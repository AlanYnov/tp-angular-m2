import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sneaker } from '../../models/sneaker.model';
import { environment } from '../../../../../environments/environment.development';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-sneaker-card',
  standalone: true,
  imports: [RouterLink, PricePipe],
  templateUrl: './sneaker-card.component.html',
  styleUrl: './sneaker-card.component.scss'
})
export class SneakerCardComponent {
  protected readonly assetsUrl: string = environment.assetsUrl;
  sneaker = input.required<Sneaker>();
}