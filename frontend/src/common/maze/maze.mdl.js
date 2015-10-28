/**
 * Maze component modul
 */
angular.module('flocs.maze', [])

/**
 * Enum type for types of boxes (squares) in a maze
 */
.constant('BoxType', {
  FREE:  0,
  WALL:  1,
  GOAL:  2,
  RED:   3,
  GREEN: 4,
  BLUE:  5
});
