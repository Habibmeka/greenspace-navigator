
# Documentation Complète du Projet GreenSpace

## Vue d'ensemble

**GreenSpace** est une application web moderne développée en React/TypeScript qui permet aux utilisateurs d'explorer les espaces verts parisiens, de suivre la qualité de l'air et d'adopter des gestes écologiques pour une ville plus durable.

## Technologies Utilisées

### Frontend Framework
- **React 18.3.1** : Bibliothèque JavaScript pour créer des interfaces utilisateur
- **TypeScript 5.6.2** : Superset de JavaScript qui ajoute le typage statique
- **Vite 5.4.10** : Outil de build moderne et rapide

### Styling et Design System
- **Tailwind CSS 3.4.13** : Framework CSS utility-first
- **shadcn/ui** : Collection de composants React basée sur Radix UI
- **Radix UI** : Bibliothèque de composants primitifs accessibles
- **Lucide React** : Bibliothèque d'icônes SVG

### Routage
- **React Router DOM 6.26.2** : Routage côté client pour React

### Gestion des Données
- **TanStack Query 5.56.2** : Gestion des requêtes, cache et synchronisation des données
- **React Hook Form 7.53.0** : Gestion des formulaires performante
- **Zod 3.23.8** : Validation et parsing de schémas TypeScript

### Visualisation de Données
- **Recharts 2.12.7** : Bibliothèque de graphiques pour React

## Structure du Projet

```
src/
├── components/           # Composants réutilisables
│   ├── ui/              # Composants UI de base (shadcn/ui)
│   ├── Navbar.tsx       # Navigation principale
│   ├── InteractiveMap.tsx # Carte interactive
│   ├── AirQualityCard.tsx # Carte qualité de l'air
│   ├── EcoTipsCard.tsx  # Carte écogestes
│   └── TreeReportDialog.tsx # Dialog de signalement d'arbres
├── pages/               # Pages principales
│   ├── Index.tsx        # Page d'accueil
│   ├── Map.tsx          # Page carte
│   ├── AirQuality.tsx   # Page qualité de l'air
│   ├── Biodiversity.tsx # Page biodiversité
│   ├── EcoTips.tsx      # Page écogestes
│   ├── SignIn.tsx       # Page de connexion
│   ├── SignUp.tsx       # Page d'inscription
│   └── NotFound.tsx     # Page 404
├── hooks/               # Hooks personnalisés
│   └── useTreeRemovalData.ts # Hook pour les données d'abattage d'arbres
├── lib/                 # Utilitaires et configuration
├── App.tsx              # Composant racine avec routage
├── main.tsx             # Point d'entrée de l'application
└── index.css            # Styles globaux et Tailwind
```

## Composants Principaux

### 1. Navbar.tsx
Navigation responsive avec :
- Logo et nom de l'application
- Menu de navigation (Carte, Qualité de l'air, Biodiversité, Écogestes)
- Boutons de connexion/inscription
- Menu mobile hamburger

### 2. InteractiveMap.tsx
Carte interactive affichant :
- Espaces verts parisiens
- Filtres par type d'espace
- Informations détaillées sur chaque lieu

### 3. AirQualityCard.tsx
Composant affichant :
- Indice ATMO du jour
- Niveau de pollution
- Polluant principal
- Recommandations

### 4. TreeReportDialog.tsx
Dialog modal pour signaler un arbre avec :
- Formulaire de saisie (localisation, type, problème, description)
- Validation avec React Hook Form et Zod
- Interface utilisateur intuitive

## Pages Détaillées

### Index.tsx (Page d'Accueil)
- Section héro avec appel à l'action
- Carte interactive intégrée
- Informations météo et qualité de l'air
- Écogestes du jour
- Section d'inscription à la communauté
- Footer complet

### Map.tsx
- Carte plein écran avec filtres avancés
- Barre de recherche
- Filtres par type, équipements, surface
- Onglets pour différents critères

### AirQuality.tsx
- Indice ATMO en temps réel
- Prévisions sur 3 jours
- Graphiques d'évolution des émissions
- Données détaillées par polluant
- Conseils en cas de pic de pollution

### Biodiversity.tsx
- Arbres remarquables de Paris
- Répartition des essences (graphique en camembert)
- Projets de végétalisation
- Données d'abattage et replantation d'arbres
- Fonctionnalité de signalement d'arbres

### EcoTips.tsx
- Conseils écologiques par catégorie
- Onglets thématiques (maison, jardinage, mobilité, consommation)
- Initiatives locales
- Challenge écologique mensuel

## Hooks Personnalisés

### useTreeRemovalData.ts
Hook pour récupérer les données d'abattage d'arbres :
- Intégration avec l'API Open Data de Paris
- Gestion du cache avec TanStack Query
- Gestion des erreurs et du loading
- Interface TypeScript complète

## APIs Externes Utilisées

### API Open Data Paris
- **Endpoint** : `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbres-a-abattre-pour-raison-sanitaires-et-essence-de-remplacement/records`
- **Données** : Arbres à abattre pour raisons sanitaires et essence de remplacement
- **Format** : JSON
- **Utilisation** : Affichage des données d'abattage et de replantation

## Fonctionnalités Clés

### 1. Navigation et Routage
- Routage côté client avec React Router
- Navigation responsive
- Pages dédiées pour chaque fonctionnalité

### 2. Visualisation de Données
- Graphiques interactifs avec Recharts
- Cartes et visualisations géographiques
- Tableaux de données temps réel

### 3. Formulaires et Interactions
- Formulaires validés avec React Hook Form
- Dialogs modaux pour les interactions
- Filtres et recherche avancée

### 4. Design System
- Composants cohérents avec shadcn/ui
- Design responsive avec Tailwind CSS
- Thème personnalisé avec couleurs vertes

### 5. Performance
- Optimisation avec Vite
- Mise en cache des données avec TanStack Query
- Lazy loading des composants

## Configuration et Variables

### Tailwind Configuration
- Couleurs personnalisées (greenspace-primary, greenspace-light, etc.)
- Classes utilitaires pour les animations
- Configuration responsive

### TypeScript Configuration
- Strict mode activé
- Alias de chemins configurés (@/ pour src/)
- Types personnalisés pour les données API

## Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Aperçu du build
npm run preview
```

## Architecture et Patterns

### 1. Composition de Composants
- Composants réutilisables et modulaires
- Props typées avec TypeScript
- Separation of concerns

### 2. Gestion d'État
- State local avec useState
- Gestion des formulaires avec React Hook Form
- Cache et synchronisation avec TanStack Query

### 3. Styling Pattern
- Utility-first avec Tailwind CSS
- Composants stylés avec class-variance-authority
- Design system cohérent

### 4. Data Fetching
- Hooks personnalisés pour l'API
- Gestion des états loading/error/success
- Cache intelligent et refetch automatique

## Sécurité et Bonnes Pratiques

### 1. TypeScript
- Typage strict de toutes les données
- Interfaces pour les réponses API
- Validation des props

### 2. Validation
- Validation côté client avec Zod
- Sanitisation des entrées utilisateur
- Gestion des erreurs gracieuse

### 3. Performance
- Optimisation des re-renders
- Lazy loading des routes
- Optimisation des images

### 4. Accessibilité
- Composants Radix UI accessibles
- Navigation clavier
- Labels et descriptions ARIA

## APIs et Intégrations Futures

Le projet est conçu pour être facilement extensible avec :
- Intégration Supabase pour l'authentification
- APIs météo en temps réel
- Géolocalisation des utilisateurs
- Notifications push
- Partage social

## Maintenance et Évolution

### Structure Modulaire
- Composants découplés et testables
- Hooks réutilisables
- Configuration centralisée

### Scalabilité
- Architecture component-based
- Gestion d'état prévisible
- Performance optimisée

Cette documentation couvre l'ensemble du projet GreenSpace, ses technologies, son architecture et ses fonctionnalités principales.
