# Alyra myVote

## Technologie 

- NEXT.js
- Hardhat
- RainbowKit
- Wagmi

## Prérequis

Renommer les fichiers `.env.example` en `.env` dans les dossiers `fonrtend` et `backend`. Puis renseigner vos variables d'environnement local.

Par default le réseau de test `hardhat` est activé.
Pour le désactiver, modifier cet valeur dans `frontend/.env`:

```shell
NEXT_PUBLIC_ENABLE_TESTNETS=false
```

# Installation DEV
## Frontend Installation

### Installer les dépendances

```shell
cd voting/frontend
npm install
```

## Backend Installation

### Installer les dépendances

```shell
cd ../backend
npm install
```

## Lancer le projet en local

- Dans un premier terminal, lancé la commandea suivante à partir de `voting/backend`

```shell
npx hardhat node
```

- Ouvrez un deuxième terminal et lancer ces commandes:

```shell
cd voting/backend

# If you're in development environment
npx hardhat run --network localhost scripts/deploy.ts

# If you're in test environment (Sepolia)
npx hardhat run --network sepolia scripts/deploy.ts
```

- Dirigez vous vers votre fichier `.env` dans le dossier `backend`. Ensuite modifier vos variables d'environnement local suivant le resaux que vous avez choisie.

- Revenir au terminal et lancer les commandes suivantes:

```shell
cd ../frontend
npm run dev
```

- Ouvrir la page [http://localhost:3000](http://localhost:3000) pour voir le résultat.