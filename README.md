# Archer

Un jeu de tir à l'arc en pixel art : un tournoi de 15 épreuves dans des lieux différents, avec cibles, ballons et plateaux, du vent, et jusqu'à 3 étoiles par épreuve. Plus un tir rapide de 60 secondes.

*English version: [README.en.md](README.en.md)*

## Flèches spéciales, cibles mobiles, arc et saison (nouveau en 1.2.0)

- **Trois flèches**, au choix avant chaque tir (boutons sous l'archer, ou touches 1, 2, 3) : la **normale**, sans limite ; la **lourde** (pointe sombre, empennage jaune), que le vent pousse six fois moins mais qui tombe un peu plus vite ; la **fendante** (empennage bleu), qui se sépare en trois au sommet de sa course, idéale pour les ballons et les cerfs-volants. Chaque épreuve donne une lourde et une fendante ; le carquois en ajoute.
- **Des cibles qui bougent** : des **cerfs-volants** qui louvoient dans le vent (12 points), une cible posée sur un **chariot** qui roule d'un côté à l'autre. Trois épreuves de plus : **Cerfs-volants**, **Le chariot du marché** et **La grande finale** (15 épreuves en tout).
- **L'arc à améliorer** : les points gagnés deviennent des **pièces**. À l'atelier (bouton L'ARC du menu) : la **puissance** (+4 % de vitesse par niveau), le **viseur** (pointillés de visée plus longs) et le **carquois** (+1 lourde et +1 fendante par épreuve).
- **Le tournoi de saison** (bouton SAISON) : chaque mois, trois épreuves tirées au sort, jouées d'affilée, contre sept archers aux scores fixés pour tout le mois. À la fin, le **classement** sur 8 ; la colonne garde ta meilleure place du mois et ton nombre de podiums.

## Comment tirer

- **Maintiens le clic** sur la zone de jeu et **tire la souris vers l'arrière**, comme on bande un arc : la direction donne l'angle, la distance donne la force.
- Le **début de la trajectoire** s'affiche en pointillés pendant que tu vises. Attention : ce tracé ne tient pas compte du vent.
- **Lâche** pour tirer. La flèche vole en courbe, freinée par la gravité et poussée par le vent pendant tout son vol.

## Le vent

La **manche à air** indique la direction et la force du vent pour le tir en cours. Il change à chaque flèche : un vent de face raccourcit le tir, un vent de côté le dévie. Vise un peu plus haut ou à contre-vent pour compenser.

## Le tournoi

- **12 épreuves** dans des lieux différents : pré, verger, forêt, château, plage, de nuit, falaises. Chacune a son nombre de flèches, son vent et ses cibles.
- **Les cibles** : le centre rapporte **10 points**, l'anneau extérieur **1 point**. Certaines bougent.
- **Les ballons** (5 points) et **les plateaux d'argile** (8 points) se crèvent au passage : la flèche continue et peut en toucher plusieurs.
- Chaque épreuve donne **1 à 3 étoiles** selon les points (les trois paliers sont affichés en haut). Une épreuve s'ouvre quand la précédente a au moins une étoile.
- Au début, la caméra va montrer la cible puis revient (un clic pour passer). Une flèche indique les cibles hors de l'écran et leur distance.

## Le spectacle

- La **caméra suit la flèche** et **ralentit** quand elle approche d'une cible.
- Une **loupe** montre la cible de face et le trou de la flèche. Un tir « **dans le mille** » a droit à sa fanfare.
- À la fin, un **bilan** : les points, les étoiles, et les boutons Rejouer, Suivante et Menu.

## Le tir rapide

**60 secondes** pour crever le plus de ballons possible, avec jusqu'à trois flèches en l'air à la fois. Ton record est gardé.

## Statistiques

Le panneau **Records** garde tes étoiles, les épreuves réussies, les flèches « dans le mille » et ton record de tir rapide. Le bouton **Plein écran** est en haut à droite du jeu.

## Données et synchronisation

Tes records sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée. Aucune autre autorisation, aucune connexion à Internet.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Archer → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
