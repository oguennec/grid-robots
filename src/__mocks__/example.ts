import { Position, Robot, Coordinates, Instruction } from '../app/utils';

// Sample Input (somehow through the GUI)
// 53
// 11 E RFRFRFRF
// 32 N FRRFLLFFRRFLL
// 03 W LLFFFLFLFL

export const upperRightCorner: Coordinates = { x: 5, y: 3 };

export const initialRobots: Robot[] = [
  {
    initialPosition: { x: 1, y: 1, d: 'E' },
    instructions: 'RFRFRFRF'.split('') as Instruction[],
  },
  {
    initialPosition: { x: 3, y: 2, d: 'N' },
    instructions: 'FRRFLLFFRRFLL'.split('') as Instruction[],
  },
  {
    initialPosition: { x: 0, y: 3, d: 'W' },
    instructions: 'LLFFFLFLFL'.split('') as Instruction[],
  },
];

// Sample Output
// 11 E
// 3 3 N LOST
// 23 S

export const finalPositions: Position[] = [
  { x: 1, y: 1, d: 'E', lost: false },
  { x: 3, y: 3, d: 'N', lost: true },
  { x: 2, y: 3, d: 'S' },
];

export const exampleRobots: any[] = [
  {
    initialPosition: { x: 1, y: 1, d: 'E' },
    instructions: 'RFRFRFRF',
  },
  {
    initialPosition: { x: 3, y: 2, d: 'N' },
    instructions: 'FRRFLLFFRRFLL',
  },
  {
    initialPosition: { x: 0, y: 3, d: 'W' },
    instructions: 'LLFFFLFLFL',
  },
];
