# Alyra myVote
----

### Ressource 

- [Vidéo de démonstration dApp Voting pour le projet 3](https://youtu.be/FKCMrQD8zCQ)

- [Déploiement Vercel](https://alyra-projet-3.vercel.app)

dApp réalisée par Alexandre Caliaro et Arnaud Séné 


### Technologie 

- NEXT.js
- Hardhat
- RainbowKit
- Wagmi

### Prérequis

Renommer les fichiers `.env.example` en `.env` dans les dossiers `fonrtend` et `backend`. Puis renseigner vos variables d'environnement local.

Par default le réseau de test `hardhat` est activé.
Pour le désactiver, modifier cet valeur dans `frontend/.env`:

```shell
NEXT_PUBLIC_ENABLE_TESTNETS=false
```

----
## Installation DEV
----

### Installer les dépendances
  
Lancer cet comande a partir des dossiers `voting/frontend` et `voting/backend`

```shell
npm install
```

### Lancer le projet en local


- Dans un premier terminal, lancé la commande suivante à partir de `voting/backend`

```shell
npx hardhat node
```

- Ouvrez un deuxième terminal et lancer ces commandes:

```shell
cd voting/backend

# If you're in development environment
npx hardhat run --network localhost scripts/01-deploy.ts

# If you're in test environment (Sepolia)
npx hardhat run --network sepolia scripts/01-deploy.ts
```

- Modifier votre fichier `.env` dans le dossier `backend` avec vos variables d'environnement local suivant le resaux que vous avez choisie.

- Revenir au terminal et lancer les commandes suivantes:

```shell
cd ../frontend
npm run dev
```

- Ouvrir la page [http://localhost:3000](http://localhost:3000) pour voir le résultat.
