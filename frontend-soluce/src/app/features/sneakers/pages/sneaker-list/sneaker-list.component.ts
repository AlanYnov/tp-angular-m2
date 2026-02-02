import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SneakerService } from '../../services/sneaker.service';
import { SneakerCardComponent } from '../../components/sneaker-card/sneaker-card.component';
import { Sneaker, SneakerFilters } from '../../models/sneaker.model';

@Component({
  selector: 'app-sneaker-list',
  standalone: true,
  imports: [FormsModule, SneakerCardComponent],
  templateUrl: './sneaker-list.component.html',
  styleUrl: './sneaker-list.component.scss'
})
export class SneakerListComponent implements OnInit {
  private readonly sneakerService = inject(SneakerService);

  sneakers = signal<Sneaker[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Filtres
  searchQuery = '';
  sortBy: SneakerFilters['sortBy'] = undefined;
  sortOrder: SneakerFilters['sortOrder'] = 'asc';

  // Pagination
  currentPage = signal(1);
  totalPages = signal(1);

  async ngOnInit(): Promise<void> {
    await this.loadSneakers();
  }

  async loadSneakers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await this.sneakerService.getSneakers({
        page: this.currentPage(),
        limit: 10,
        search: this.searchQuery || undefined,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder
      });
      console.log(response);
      this.sneakers.set(response.data);
      this.totalPages.set(response.pagination.totalPages);
    } catch (err) {
      this.error.set('Erreur lors du chargement des sneakers');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  async onSearch(): Promise<void> {
    this.currentPage.set(1);
    await this.loadSneakers();
  }

  async onPageChange(page: number): Promise<void> {
    this.currentPage.set(page);
    await this.loadSneakers();
  }
}