# Api -Puissance 4 - React (En cours de développement)

Ce projet est une reprise du jeu [Puissance 4](https://fr.wikipedia.org/wiki/Puissance_4) conçu en [React](https://react.dev/).

Cette api est dédiée à l'utilisation des websockets pour le projet [Puissance 4](https://github.com/GABLRM/React-Puissance-4)

## Sommaire

- [Sommaire](#sommaire)
- [I - Prérequis](#i---prérequis)
- [II - Installation](#ii---installation)
- [III - Lancement](#iii---lancement)
- [IV - Crédits](#iv---crédits)

## I - Prérequis

Pour le bon lancement de cette api vous avez besoin de :

- Node.js
- Docker

## II - Installation

Pour récupérer le projet, vous devez clone ce repository avec la commande suivante :

```bash
git clone https://github.com/GABLRM/api-react-puissance-4.git
```

Ensuite, il est nécessaire d'installer les dependances du projet :

```bash
npm i
```

### III - Lancement

Pour lancer l'api, vous devez lancer le container Docker de Redis avec cette commande :

```bash
docker-compose up -d
```

Et pour terminer, une fois le docker en route, vous devez lancer l'api avec cette commande :

```bash
npm run start
```

## IV - Crédits

Ce projet a été réalisé par Luka GARCIA et Gabriel LAROUMANIE dans le cadre de notre Bachelor 3 Informatique chez Bordeaux YNOV Campus.
