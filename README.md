# Archer

Un jeu de tir à l'arc : dix flèches par manche, une cible qui s'éloigne puis se met à bouger, et un vent qui change à chaque tir. Dose la force, vise en tenant compte du vent et cherche la meilleure manche sur 100 points.

*English version: [README.en.md](README.en.md)*

## Comment tirer

- **Maintiens le clic** sur la zone de jeu et **tire la souris vers l'arrière**, comme on bande un arc : la direction donne l'angle, la distance donne la force.
- Le **début de la trajectoire** s'affiche en pointillés pendant que tu vises. Attention : ce tracé ne tient pas compte du vent.
- **Lâche** pour tirer. La flèche vole en courbe, freinée par la gravité et poussée par le vent pendant tout son vol.

## Le vent

La **manche à air** indique la direction et la force du vent pour le tir en cours. Il change à chaque flèche : un vent de face raccourcit le tir, un vent de côté le dévie. Vise un peu plus haut ou à contre-vent pour compenser.

## Une manche

- Une manche compte **10 flèches**.
- Le centre de la cible rapporte **10 points**, l'anneau extérieur **1 point** ; une flèche hors de la cible est ratée.
- La cible **recule toutes les trois flèches**, puis, en fin de manche, elle **se déplace** : il faut anticiper sa position.
- À la fin, le total sur 100 s'affiche ; un clic lance une nouvelle manche.

## Statistiques

Le panneau **Records** garde ta meilleure manche, le nombre de manches jouées et le nombre de flèches plantées en plein centre (« dans le mille »).

## Données et synchronisation

Tes records sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée. Aucune autre autorisation, aucune connexion à Internet.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Archer → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
