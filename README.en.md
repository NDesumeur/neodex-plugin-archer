# Archer

A pixel art archery game: a tournament of 15 events in different places, with targets, balloons and clay discs, wind, and up to 3 stars per event. Plus a 60-second rapid fire.

*Version française : [README.md](README.md)*

## Special arrows, moving targets, bow and season (new in 1.2.0)

- **Three arrows**, chosen before each shot (buttons under the archer, or keys 1, 2, 3): the **normal** one, unlimited; the **heavy** one (dark tip, yellow fletching), pushed six times less by the wind but falling a little faster; the **splitting** one (blue fletching), which splits into three at the top of its flight, great for balloons and kites. Each event gives one heavy and one splitting arrow; the quiver adds more.
- **Moving targets**: **kites** tacking in the wind (12 points), and a target on a **cart** rolling from side to side. Three more events: **Kites**, **The market cart** and **The grand final** (15 events in all).
- **A bow to upgrade**: points you win become **coins**. In the workshop (THE BOW button in the menu): **power** (+4 % speed per level), **sight** (longer aiming dots) and **quiver** (+1 heavy and +1 splitting per event).
- **The season tournament** (SEASON button): every month, three events drawn at random, played in a row, against seven archers whose scores are set for the whole month. At the end, the **ranking** out of 8; the side column keeps your best place of the month and your number of podiums.

## How to shoot

- **Hold the mouse button** on the play area and **drag backwards**, like drawing a bow: the direction sets the angle, the distance sets the power.
- The **start of the trajectory** is shown as a dotted line while you aim. Careful: it does not include the wind.
- **Release** to shoot. The arrow flies in a curve, pulled down by gravity and pushed by the wind for its whole flight.

## The wind

The **windsock** shows the direction and strength of the wind for the current shot. It changes with every arrow: a headwind shortens the shot, a crosswind pushes it aside. Aim a little higher or against the wind to make up for it.

## The tournament

- **12 events** in different places: meadow, orchard, forest, castle, beach, at night, cliffs. Each has its own number of arrows, wind and targets.
- **Targets**: the centre is worth **10 points**, the outer ring **1 point**. Some of them move.
- **Balloons** (5 points) and **clay discs** (8 points) burst on the way: the arrow keeps going and can hit several.
- Each event gives **1 to 3 stars** depending on the points (the three levels are shown at the top). An event opens when the previous one has at least one star.
- At the start, the camera goes to show the target and comes back (click to skip). An arrow points to targets off screen with their distance.

## The show

- The **camera follows the arrow** and **slows down** as it nears a target.
- A **magnifier** shows the target face-on and the arrow's hole. A **bullseye** gets its fanfare.
- At the end, a **recap**: points, stars, and Replay, Next and Menu buttons.

## Rapid fire

**60 seconds** to burst as many balloons as you can, with up to three arrows in the air at once. Your record is kept.

## Statistics

The **Records** panel keeps your stars, events cleared, bullseyes and rapid-fire record. The **Fullscreen** button is at the top right of the game.

## Data and sync

Your records are stored by NeoDex, backed up and synced between your PCs when sync is on. No other permission, no Internet connection.

## Install

In NeoDex: **NeoStore → Discover → Archer → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
