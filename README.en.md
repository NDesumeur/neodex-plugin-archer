# Archer

An archery game: ten arrows per round, a target that moves further away and then starts moving, and a wind that changes with every shot. Judge the power, aim with the wind in mind and go for the best round out of 100 points.

*Version française : [README.md](README.md)*

## How to shoot

- **Hold the mouse button** on the play area and **drag backwards**, like drawing a bow: the direction sets the angle, the distance sets the power.
- The **start of the trajectory** is shown as a dotted line while you aim. Careful: it does not include the wind.
- **Release** to shoot. The arrow flies in a curve, pulled down by gravity and pushed by the wind for its whole flight.

## The wind

The **windsock** shows the direction and strength of the wind for the current shot. It changes with every arrow: a headwind shortens the shot, a crosswind pushes it aside. Aim a little higher or into the wind to make up for it.

## A round

- A round has **10 arrows**.
- The centre of the target is worth **10 points**, the outer ring **1 point**; an arrow off the target is a miss.
- The target **moves back every three arrows**, then, at the end of the round, it **moves around**: you have to anticipate where it will be.
- At the end, your total out of 100 is shown; one click starts a new round.

## Statistics

The **Records** panel keeps your best round, the number of rounds played and the number of arrows right in the centre (bullseyes).

## Data and sync

Your records are stored by NeoDex, backed up and synced between your PCs when sync is on. No other permission, no Internet connection.

## Install

In NeoDex: **NeoStore → Discover → Archer → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
