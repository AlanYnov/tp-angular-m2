# Sneakers API

API REST pour la gestion des sneakers, construite avec Express et TypeScript.

## Prerequisites

- Node.js (v18 ou supérieur recommandé)
- npm

## Installation

```bash
# Naviguer vers le dossier de l'API
cd backend/api

# Installer les dépendances
npm install
```

## Scripts disponibles

```bash
# Lancer en mode développement (hot-reload)
npm run dev

# Compiler le TypeScript
npm run build

# Lancer en production (après build)
npm start
```

## Structure du projet

```
src/
├── app.ts          # Point d'entrée de l'application
├── controllers/    # Contrôleurs des routes
├── dto/            # Data Transfer Objects
├── errors/         # Gestion des erreurs personnalisées
├── middlewares/    # Middlewares Express
├── models/         # Modèles de données
├── routes/         # Définition des routes
├── services/       # Logique métier
└── validators/     # Validation des données (Zod)
```

## Technologies

- **Express** - Framework web
- **TypeScript** - Typage statique
- **Zod** - Validation de schémas
- **CORS** - Cross-Origin Resource Sharing
