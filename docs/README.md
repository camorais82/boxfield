# Boxfield

### Background
Boxfield is a remake of an old Flash game called Cubefield. The main draw of Boxfield is that it immerses the player in an ominous dark and retro environment (think Tron). The player is always moving forward and has to dodge obstacles. The game keeps track of the players score based on how long they have been alive for. The game does not end and the level gets repeated until an obstacle is hit.

### Functionality & MVP
Main functionalities for Boxfield are:
- Player is continuously moving forward
- Player is able to sway left and right through arrow keys or A & D
- Obstacles are moving towards the player
- Game is over when the player hits an obstacle
- Game keeps track of the player's score

### Architecture
Boxfield will be seperated out into a few files.

- `boxfield.js` will be the entry file for the game
- `game.js` handles all of the game logic (game start, game end)
- `gameView.js` takes `Field.js`, `Obstacle.js`, and `Player.js` and renders them onto the screen
- `Field.js` contains information about the current level (player location, num obstacles)
- `MovingObject.js` will contain basic top level properties for the moving objects
(obstacle and player)
- `Obstacle.js` inherits from MovingObject
- `Player.js` inherits from MovingObject
- `util.js` contains helper methods

### Wireframes
<img src="https://raw.githubusercontent.com/jinchen93/boxfield/master/docs/boxfield-wireframe.png?token=APTthjTj506aIk42vULJNQZ3-ry76UHuks5ZNGpCwA%3D%3D">

### Implementation Timeline
**Day 1:** Basic setup with webpack. Get HTML5 canvas up and running. Display basic representation of player and obstacles.

**Day 2:** Add visual logic. Player is able to move forward and obstacles are moving visually towards the player. Make obstacles look like and behave like boxes, make player look like a pointer.

**Day 3:** Add game logic and player controls. Game ends when a player hits an obstacle.

**Day 4:** Finishing touches on styling and smooth out the game physics.

### Bonus Features
If I have extra time I would like to add:
- Special effects for each level
- Abilities like slow motion, speed boost, and invincibility.
- Sprite animations