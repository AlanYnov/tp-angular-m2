# Tutorial : Installation Frontend Angular Standalone

Ce guide explique comment mettre en place un projet Angular standalone pour consommer l'API Sneakers.

---

## Table des matières

1. [Installation du CLI Angular](#1-installation-du-cli-angular)
2. [Création du projet](#2-création-du-projet)
3. [Architecture du projet](#3-architecture-du-projet)
4. [Fichiers racine](#4-fichiers-racine)
5. [Configuration de l'application](#5-configuration-de-lapplication)
6. [Core Module](#6-core-module)
7. [Features Module](#7-features-module)
8. [Shared Module](#8-shared-module)
9. [Routing](#9-routing)
10. [Appels API avec RxJS](#10-appels-api-avec-rxjs)

---

## 1. Installation du CLI Angular

### Prérequis

- Node.js (version 18+)
- npm (version 9+)

### Installation globale du CLI

```bash
npm install -g @angular/cli
```

Vérifier l'installation :

```bash
ng version
```

---

## 2. Création du projet

```bash
ng new frontend --standalone --routing --style=scss
cd frontend
```

Options utilisées :
- `--standalone` : Utilise les composants standalone (sans NgModules)
- `--routing` : Génère le fichier de routing
- `--style=scss` : Utilise SCSS pour les styles

---

## 3. Architecture du projet

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                       # Services singleton, guards, interceptors
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── api.interceptor.ts
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       └── api-response.model.ts
│   │   │
│   │   ├── features/                   # Modules fonctionnels
│   │   │   └── sneakers/
│   │   │       ├── components/
│   │   │       │   └── sneaker-card/
│   │   │       │       ├── sneaker-card.component.ts
│   │   │       │       ├── sneaker-card.component.html
│   │   │       │       └── sneaker-card.component.scss
│   │   │       ├── pages/
│   │   │       │   ├── sneaker-list/
│   │   │       │   │   ├── sneaker-list.component.ts
│   │   │       │   │   ├── sneaker-list.component.html
│   │   │       │   │   └── sneaker-list.component.scss
│   │   │       │   └── sneaker-detail/
│   │   │       │       ├── sneaker-detail.component.ts
│   │   │       │       ├── sneaker-detail.component.html
│   │   │       │       └── sneaker-detail.component.scss
│   │   │       ├── services/
│   │   │       │   └── sneaker.service.ts
│   │   │       └── models/
│   │   │           └── sneaker.model.ts
│   │   │
│   │   ├── shared/                     # Composants, pipes, directives réutilisables
│   │   │   ├── components/
│   │   │   │   └── header/
│   │   │   │       ├── header.component.ts
│   │   │   │       ├── header.component.html
│   │   │   │       └── header.component.scss
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   │       └── price.pipe.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts               # Configuration de l'app
│   │   └── app.routes.ts               # Définition des routes
│   │
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   ├── main.ts                         # Point d'entrée
│   └── styles.scss                     # Styles globaux
│
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 4. Fichiers racine

### index.html

Le fichier HTML principal qui charge l'application Angular.

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Sneakers Shop</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- Fonts (optionnel) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**Explications :**
- `<base href="/">` : Définit l'URL de base pour le routing
- `<app-root>` : Le sélecteur du composant racine (AppComponent)

---

### main.ts

Le point d'entrée de l'application Angular.

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**Explications :**
- `bootstrapApplication()` : Démarre l'application avec un composant standalone
- `AppComponent` : Le composant racine de l'application
- `appConfig` : La configuration (providers, routing, etc.)

---

### styles.scss

Les styles globaux de l'application.

```scss
// Reset CSS
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// Variables
:root {
  --primary-color: #1a1a1a;
  --secondary-color: #666;
  --accent-color: #ff4444;
  --background-color: #f5f5f5;
  --white: #ffffff;
  --border-radius: 8px;
}

// Base styles
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background-color);
  color: var(--primary-color);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

// Utility classes
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

---

## 5. Configuration de l'application

### app.config.ts

Configuration centrale de l'application avec les providers.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { apiInterceptor } from './core/interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor]))
  ]
};
```

**Explications :**
- `provideRouter(routes)` : Configure le routing avec les routes définies
- `provideHttpClient()` : Fournit le HttpClient pour les appels API
- `withInterceptors([])` : Ajoute les interceptors HTTP

---

### environments/environment.ts

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### environments/environment.prod.ts

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

---

## 6. Core Module

### core/models/api-response.model.ts

```typescript
export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### core/models/user.model.ts

```typescript
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}
```

---

### core/services/auth.service.ts

```typescript
import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  login(user: User): void {
    this.currentUser.set(user);
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
```

---

### core/guards/auth.guard.ts

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
```

---

### core/interceptors/api.interceptor.ts

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Ajoute l'URL de base si c'est un appel relatif
  if (!req.url.startsWith('http')) {
    req = req.clone({
      url: `${environment.apiUrl}${req.url}`
    });
  }

  // Ajoute les headers communs
  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(req);
};
```

---

## 7. Features Module

### features/sneakers/models/sneaker.model.ts

```typescript
export interface Sneaker {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  releaseDate: string;
  colors: string;
  deliveryTime: number;
  deliveryPrice: number;
  reduction: number;
  images: string[];
  available: boolean;
  sizes: number[];
}

export interface SneakerListResponse {
  data: Sneaker[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SneakerFilters {
  page?: number;
  limit?: number;
  search?: string;
  colors?: string;
  sortBy?: 'price' | 'name' | 'release_date';
  sortOrder?: 'asc' | 'desc';
}
```

---

### features/sneakers/services/sneaker.service.ts

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Sneaker, SneakerListResponse, SneakerFilters } from '../models/sneaker.model';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {
  private readonly http = inject(HttpClient);

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
      this.http.get<SneakerListResponse>('/sneakers', { params })
    );
  }

  async getSneakerById(id: number): Promise<Sneaker> {
    return firstValueFrom(
      this.http.get<Sneaker>(`/sneakers/${id}`)
    );
  }
}
```

**Explications :**
- `HttpParams` : Construction propre des query parameters
- `firstValueFrom()` : Convertit l'Observable en Promise (alternative moderne à `.toPromise()`)
- Pas de `subscribe()` : On utilise `async/await` dans les composants

---

### features/sneakers/components/sneaker-card/sneaker-card.component.ts

```typescript
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sneaker } from '../../models/sneaker.model';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-sneaker-card',
  standalone: true,
  imports: [RouterLink, PricePipe],
  templateUrl: './sneaker-card.component.html',
  styleUrl: './sneaker-card.component.scss'
})
export class SneakerCardComponent {
  sneaker = input.required<Sneaker>();
}
```

### features/sneakers/components/sneaker-card/sneaker-card.component.html

```html
<article class="sneaker-card">
  <a [routerLink]="['/sneakers', sneaker().id]">
    @if (sneaker().images.length > 0) {
      <img [src]="sneaker().images[0]" [alt]="sneaker().name" class="sneaker-image">
    }

    <div class="sneaker-info">
      <h3 class="sneaker-name">{{ sneaker().name }}</h3>
      <p class="sneaker-colors">{{ sneaker().colors }}</p>

      <div class="sneaker-price">
        @if (sneaker().reduction > 0) {
          <span class="original-price">{{ sneaker().price | price }}</span>
          <span class="final-price">{{ sneaker().finalPrice | price }}</span>
          <span class="reduction">-{{ sneaker().reduction }}%</span>
        } @else {
          <span class="final-price">{{ sneaker().price | price }}</span>
        }
      </div>

      @if (!sneaker().available) {
        <span class="unavailable">Indisponible</span>
      }
    </div>
  </a>
</article>
```

---

### features/sneakers/pages/sneaker-list/sneaker-list.component.ts

```typescript
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
```

### features/sneakers/pages/sneaker-list/sneaker-list.component.html

```html
<section class="sneaker-list-page">
  <h1>Nos Sneakers</h1>

  <!-- Filtres -->
  <div class="filters">
    <input
      type="text"
      [(ngModel)]="searchQuery"
      (keyup.enter)="onSearch()"
      placeholder="Rechercher une sneaker..."
      class="search-input"
    >

    <select [(ngModel)]="sortBy" (change)="loadSneakers()">
      <option [ngValue]="undefined">Trier par...</option>
      <option value="price">Prix</option>
      <option value="name">Nom</option>
      <option value="release_date">Date de sortie</option>
    </select>

    <select [(ngModel)]="sortOrder" (change)="loadSneakers()">
      <option value="asc">Croissant</option>
      <option value="desc">Décroissant</option>
    </select>

    <button (click)="onSearch()">Rechercher</button>
  </div>

  <!-- Loading -->
  @if (loading()) {
    <p class="loading">Chargement...</p>
  }

  <!-- Error -->
  @if (error()) {
    <p class="error">{{ error() }}</p>
  }

  <!-- Liste -->
  @if (!loading() && !error()) {
    <div class="sneakers-grid">
      @for (sneaker of sneakers(); track sneaker.id) {
        <app-sneaker-card [sneaker]="sneaker" />
      } @empty {
        <p>Aucune sneaker trouvée.</p>
      }
    </div>

    <!-- Pagination -->
    @if (totalPages() > 1) {
      <div class="pagination">
        @for (page of [].constructor(totalPages()); track $index) {
          <button
            [class.active]="currentPage() === $index + 1"
            (click)="onPageChange($index + 1)"
          >
            {{ $index + 1 }}
          </button>
        }
      </div>
    }
  }
</section>
```

---

### features/sneakers/pages/sneaker-detail/sneaker-detail.component.ts

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SneakerService } from '../../services/sneaker.service';
import { Sneaker } from '../../models/sneaker.model';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
  selector: 'app-sneaker-detail',
  standalone: true,
  imports: [RouterLink, PricePipe],
  templateUrl: './sneaker-detail.component.html',
  styleUrl: './sneaker-detail.component.scss'
})
export class SneakerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sneakerService = inject(SneakerService);

  sneaker = signal<Sneaker | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedImage = signal(0);

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadSneaker(id);
  }

  private async loadSneaker(id: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const sneaker = await this.sneakerService.getSneakerById(id);
      this.sneaker.set(sneaker);
    } catch (err) {
      this.error.set('Sneaker non trouvée');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  selectImage(index: number): void {
    this.selectedImage.set(index);
  }
}
```

---

## 8. Shared Module

### shared/components/header/header.component.ts

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
```

### shared/components/header/header.component.html

```html
<header class="header">
  <nav class="container">
    <a routerLink="/" class="logo">SneakersShop</a>

    <ul class="nav-links">
      <li>
        <a routerLink="/sneakers" routerLinkActive="active">Sneakers</a>
      </li>
    </ul>
  </nav>
</header>
```

---

### shared/pipes/price.pipe.ts

```typescript
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
```

**Utilisation :**
```html
{{ sneaker.price | price }}           <!-- 470,00 € -->
{{ sneaker.price | price:'$':'en-US' }} <!-- 470.00 $ -->
```

---

## 9. Routing

### app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sneakers',
    pathMatch: 'full'
  },
  {
    path: 'sneakers',
    loadComponent: () =>
      import('./features/sneakers/pages/sneaker-list/sneaker-list.component')
        .then(m => m.SneakerListComponent)
  },
  {
    path: 'sneakers/:id',
    loadComponent: () =>
      import('./features/sneakers/pages/sneaker-detail/sneaker-detail.component')
        .then(m => m.SneakerDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'sneakers'
  }
];
```

**Explications :**
- `loadComponent` : Lazy loading des composants (chargés à la demande)
- `path: '**'` : Wildcard pour les routes non trouvées
- `:id` : Paramètre dynamique pour l'ID de la sneaker

---

### app.component.ts

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    main {
      padding: 2rem 1rem;
      min-height: calc(100vh - 60px);
    }
  `]
})
export class AppComponent {}
```

---

## 10. Appels API avec RxJS

### Pourquoi `firstValueFrom` plutôt que `subscribe` ?

| Approche | Avantages | Inconvénients |
|----------|-----------|---------------|
| `subscribe()` | Gestion fine des streams | Callback hell, gestion manuelle unsubscribe |
| `firstValueFrom()` | Syntaxe async/await, code lisible | Ne convient pas pour les streams continus |

### Exemple comparatif

**Avec subscribe (à éviter) :**
```typescript
loadSneakers(): void {
  this.loading = true;
  this.sneakerService.getSneakers().subscribe({
    next: (response) => {
      this.sneakers = response.data;
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Erreur';
      this.loading = false;
    }
  });
}
```

**Avec firstValueFrom (recommandé) :**
```typescript
async loadSneakers(): Promise<void> {
  this.loading.set(true);
  try {
    const response = await this.sneakerService.getSneakers();
    this.sneakers.set(response.data);
  } catch (err) {
    this.error.set('Erreur');
  } finally {
    this.loading.set(false);
  }
}
```

---

## Commandes utiles

```bash
# Générer un composant standalone
ng generate component features/sneakers/components/sneaker-card --standalone

# Générer un service
ng generate service features/sneakers/services/sneaker

# Générer un pipe
ng generate pipe shared/pipes/price --standalone

# Générer un guard
ng generate guard core/guards/auth --functional

# Lancer le serveur de développement
ng serve

# Build production
ng build --configuration=production
```

---

## Résumé

| Fichier | Rôle |
|---------|------|
| `main.ts` | Point d'entrée, bootstrap l'application |
| `app.config.ts` | Configuration des providers (HttpClient, Router) |
| `app.routes.ts` | Définition des routes avec lazy loading |
| `index.html` | Template HTML principal |
| `styles.scss` | Styles CSS globaux |
| `environment.ts` | Variables d'environnement (API URL) |

---

## Lancer le projet complet

```bash
# Terminal 1 - Backend
cd api
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
ng serve
```

L'application sera disponible sur `http://localhost:4200` et consommera l'API sur `http://localhost:3000`.
