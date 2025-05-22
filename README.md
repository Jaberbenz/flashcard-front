# MemoCard

MemoCard est une application web de gestion de flashcards permettant de créer, organiser et réviser des cartes de mémorisation par catégories et thèmes. Elle propose une authentification utilisateur, une gestion avancée des catégories/thèmes, et une expérience moderne grâce à Vue 3 et Vite.

## Fonctionnalités principales

- **Authentification** : Inscription, connexion, gestion du token utilisateur.
- **Catégories** : Création, modification, suppression, affichage de catégories.
- **Thèmes** : Gestion des thèmes associés à chaque catégorie, duplication, modification, suppression.
- **Cartes** : Ajout, suppression de cartes dans chaque thème.
- **Navigation** : Interface fluide avec Vue Router (Home, Register, Login, Dashboard, détails de catégorie/thème).
- **PWA** : Application installable (manifest, service worker).
- **Notifications toast** : Feedback utilisateur via `vue3-toastify`.

## Structure du projet

```
.
├── public/                # Fichiers statiques, icons PWA
├── src/
│   ├── assets/            # Images et ressources statiques
│   ├── components/        # Composants réutilisables (Card, CategoryCard, ThemeCard)
│   ├── pages/             # Pages principales (Home, Login, Register, Dashboard, CategoryDetails, ThemeDetails)
│   ├── router/            # Configuration des routes
│   ├── stores/            # Stores Pinia (user, category, theme)
│   ├── App.vue            # Composant racine
│   ├── main.js            # Point d'entrée de l'application
│   └── style.css          # Styles globaux
├── index.html             # Fichier HTML principal
├── manifest.json          # Manifest PWA
├── package.json           # Dépendances et scripts
├── service-worker.js      # Service worker PWA
└── vite.config.js         # Configuration Vite
```

## Installation & Lancement

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/Jaberbenz/flashcard-front.git
   cd flashcard-front
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

4. **Build pour la production**
   ```bash
   npm run build
   ```

## Scripts disponibles

- `npm run dev` : Démarre le serveur de développement Vite.
- `npm run build` : Génère la version de production.
- `npm run preview` : Prévisualise la build de production.

## Dépendances principales

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [vue3-toastify](https://vue3-toastify.js.org/) (notifications)

## Fonctionnement général

- **Accueil** : Liste des catégories, possibilité d'en ajouter (si connecté).
- **Détail catégorie** : Affiche les thèmes associés, gestion des thèmes.
- **Détail thème** : Gestion des cartes de révision (ajout, suppression).
- **Dashboard** : Vue personnalisée pour l'utilisateur connecté.
- **Authentification** : Accès restreint à certaines fonctionnalités.

## PWA

L'application est installable sur mobile/desktop (manifest, service worker).
