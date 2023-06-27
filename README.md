# Projet - Système de vote 3

- Revoir la sécurité et l’optimisation de votre smart contract
  - fixer la faille DoS gas limit
- Créer une DApp qui répond aux spécifications citées ci-dessous 
  - l’enregistrement d’une liste blanche d'électeurs.
  - à l'administrateur de commencer la session d'enregistrement de la proposition.
  - à l'administrateur de mettre fin à la session d'enregistrement des propositions.
  - à l'administrateur de commencer la session de vote.
  - à l'administrateur de mettre fin à la session de vote.
  - à l'administrateur de comptabiliser les votes.
  - aux électeurs inscrits d’enregistrer leurs propositions.
  - aux électeurs inscrits de voter pour leurs propositions préférées.
  - à tout le monde de consulter le résultat.
- Mettre en place des scripts (optionnel)
  - déployer votre DApp sur Vercel
  - déployer le smart contract (hardhat-deploy) 

# Technologie 

- NEXT.js
- Hardhat
- RainbowKit
- Wagmi

## Installation Frontend

### Installer les dépendances

```shell
cd frontend
npm install
```

### Prérequis

Export les variables d'environnements
```shell
export NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<projectId>
```

Activer le réseau de test `hardhat`
```shell
export NEXT_PUBLIC_ENABLE_TESTNETS=true
```

### Démarrer le serveur
En développement

```shell
npm run dev
```
