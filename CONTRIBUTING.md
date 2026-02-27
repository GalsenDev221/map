# Guide de Contribution 🫱🏾‍🫲🏾

Merci de ton intérêt pour **Galsen DEV Map** !  
Ce guide va t'aider à contribuer au projet de manière efficace.

## Table des Matières

- [Comment puis-je contribuer](#comment-puis-je-contribuer)
- [Sécurité & Vie Privée](#sécurité--vie-privée)
- [Ajouter ton profil](#ajouter-ton-profil)
- [Développement](#développement)

## Comment puis-je contribuer

Il y a plusieurs façons de contribuer :

### 🆕 Ajouter ton profil

La contribution la plus simple ! Ajoute-toi sur la carte.

### 🐛 Reporter des bugs

Tu as trouvé un bug ? Crée une issue en utilisant le template approprié.

### 💡 Proposer des features

Tu as une idée ? Ouvre une issue pour en discuter avec la communauté.

### 🔧 Corriger des bugs

Consulte les issues avec le label `bug` et propose une solution.

### ✨ Développer de nouvelles features

Choisis une issue avec le label `enhancement` ou `good first issue`.

### 📖 Améliorer la documentation

La doc n'est jamais parfaite. Toute amélioration est la bienvenue !

## Sécurité & Vie Privée

Voici les règles à suivre :

### Pour les coordonnées GPS :

- ✅ **À FAIRE** : Utiliser les coordonnées du centre de ta ville
- ✅ **À FAIRE** : Utiliser un point de repère public (monument, place, mairie)
- ❌ **À ÉVITER** : Ton adresse personnelle ou lieu de travail exact
- ❌ **À ÉVITER** : Les coordonnées de ton quartier résidentiel

### Exemples de coordonnées sûres :

- **Dakar** : Place de l'Indépendance (14.6937, -17.4441)
- **Thiès** : Centre-ville (14.7886, -16.9260)
- **Saint-Louis** : Place Faidherbe (16.0179, -16.4897)
- **Ziguinchor** : Centre-ville (12.5600, -16.2630)

### Données personnelles :

- Ne partage que les informations que tu es à l'aise de rendre publiques
- Ton nom peut être un pseudo si tu préfères
- Seules les données dans `contributors.json` seront publiques
- Tu peux demander la suppression de tes données à tout moment

### En cas de problème :

Si tu remarques des coordonnées trop précises ou des informations sensibles, contacte immédiatement les mainteneurs à **galsendev221@gmail.com** ou ouvre une issue privée.

## Ajouter ton profil

### Étape 1 : Fork le repo

Clique sur le bouton "Fork" en haut à droite du repo.

### Étape 2 : Clone ton fork

```bash
git clone https://github.com/TON-USERNAME/map.git
cd map
```

### Étape 3 : Crée une branche

```bash
git checkout -b add-mon-profil
```

### Étape 4 : Crée un nouveau fichier JSON avec ton `username` GitHub dans le dossier `data/contributors`

1. Ouvre le dossier `data` et va dans le dossier `contributors`
2. Crée un nouveau fichier JSON avec ton username GitHub
3. Ajoute tes informations le nouveau fichier en suivant ce format :

```json
{
  "name": "Ton Nom",
  "city": "Ta Ville",
  "stack": ["Techno 1", "Techno 2", "etc"],
  "github": "https://github.com/username",
  "lat": 14.xxxx,
  "lng": -17.xxxx
}
```

**Important** :

- `name` : Ton nom complet ou pseudo
- `city` : Une ville au Sénégal (Dakar, Thiès, Saint-Louis, etc.)
- `stack` : Un tableau de tes technologies principales (3-5 max)
- `github` : URL complète de ton profil GitHub
- `lat` / `lng` : Coordonnées GPS du **centre de ta ville** (utilise [gps-coordinates.net](https://www.gps-coordinates.net))

**⚠️ IMPORTANT - Sécurité & Vie Privée** :

- **NE METS JAMAIS** tes coordonnées exactes (ton domicile, ton lieu de travail)
- Utilise **UNIQUEMENT** les coordonnées du centre-ville ou d'un point public connu de ta ville
- Ne pas **UTILISER** les coordonnées (lat & lng) d'un autre contributeur.

### Étape 5 : Teste localement

```bash
npm install
npm run dev
```

Vérifie que ton profil s'affiche correctement sur la carte.

**⚠️ Vérification de sécurité** :

- Assure-toi que le marqueur est bien placé sur le centre de ta ville, pas sur ton domicile
- Zoom sur la carte et vérifie que les coordonnées ne révèlent pas d'information personnelle sensible

### Étape 6 : Commit et Push

```bash
git add data/contributors/<ton-username>.json
git commit -m "feat: add [Ton Nom] from [Ta Ville]"
git push origin add-mon-profil
```

Le fichier `data/contributors.json` (qui regroupe tout les profils) est généré automatiquement quand on lance la commande `npm run`, il n'est donc pas nécessaire de le commiter.

### Étape 7 : Crée une Pull Request

1. Va sur ton fork sur GitHub
2. Clique sur "Compare & pull request"
3. Remplis le template de PR
4. Soumets ta PR !

### Review Process

1. Une fois ta PR soumise, un mainteneur va la review
2. Des changements peuvent être demandés
3. Une fois approuvée, ta PR sera mergée !
4. Ton profil apparaîtra sur la carte 🎉

## Développement

### Setup de développement

```bash
# Installation
npm install

# Lancement du serveur de dev
npm run dev

# Build de production
npm run build

# Lancement en prod
npm start

# Lint du code
npm run lint
```

### Technologies utilisées

- **Next.js 14** : Framework React
- **TypeScript** : Typage statique
- **TailwindCSS** : Styling
- **React Leaflet** : Cartes interactives
- **Leaflet** : Bibliothèque de cartes

## Questions ?

Si tu as des questions, n'hésite pas à :

- Ouvrir une [Issue](https://github.com/GalsenDev221/map/issues)
- Rejoindre notre [Discord](https://discord.gg/CKZcKqf)
- Contacter les mainteneurs

## Jajeuf 👏🏾
