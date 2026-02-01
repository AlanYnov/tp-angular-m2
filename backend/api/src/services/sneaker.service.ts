import * as fs from 'fs';
import * as path from 'path';
import { Sneaker, SneakersData } from '../models/sneaker.model';
import { PaginatedSneakersDto, SneakerResponseDto, toSneakerResponseDto } from '../dto/sneaker.dto';
import { SneakerQuery } from '../validators/sneaker.validator';
import { NotFoundError } from '../errors/http.error';

class SneakerService {
  private sneakers: Sneaker[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const dataPath = path.join(__dirname, '../../../assets/data/sneakers.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data: SneakersData = JSON.parse(rawData);
    this.sneakers = data.sneakers;
  }

  findAll(query: SneakerQuery): PaginatedSneakersDto {
    let filtered = [...this.sneakers];

    // Recherche par nom
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(searchLower));
    }

    // Filtre par couleur
    if (query.colors) {
      const colorsLower = query.colors.toLowerCase();
      filtered = filtered.filter(s => s.colors.toLowerCase().includes(colorsLower));
    }

    // Tri
    if (query.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (query.sortBy) {
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'release_date':
            comparison = new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
            break;
        }
        return query.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    // Pagination
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData.map(toSneakerResponseDto),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  findById(id: number): SneakerResponseDto {
    const sneaker = this.sneakers.find(s => s.id === id);
    if (!sneaker) {
      throw new NotFoundError(`Sneaker with id ${id} not found`);
    }
    return toSneakerResponseDto(sneaker);
  }
}

export const sneakerService = new SneakerService();
