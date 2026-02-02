import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Sneaker, SneakerListResponse, SneakerFilters } from '../models/sneaker.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  async getSneakers(filters: SneakerFilters = {}): Promise<SneakerListResponse> {
    let params = new HttpParams();

    // Ajout dynamique des paramètres
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.limit) {
      params = params.set('limit', filters.limit.toString());
    }
    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.colors) {
      params = params.set('colors', filters.colors);
    }
    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters.sortOrder) {
      params = params.set('sortOrder', filters.sortOrder);
    }

    return firstValueFrom(
      this.http.get<SneakerListResponse>(`${this.apiUrl}/sneakers`, { params })
    );
  }

  async getSneakerById(id: number): Promise<Sneaker> {
    return firstValueFrom(
      this.http.get<Sneaker>(`${this.apiUrl}/sneakers/${id}`)
    );
  }
}