import { isEqual } from 'lodash';

export type Direction = 'N' | 'E' | 'S' | 'W';

export type Instruction = 'R' | 'L' | 'F';

export type Instructions = Instruction[];

export interface Position {
  x: number;
  y: number;
  d: Direction;
  lost?: boolean;
  onScent?: boolean;
}

export interface Robot {
  initialPosition: Position;
  instructions: Instructions;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type ScentGrid = Coordinates[];

const applyForward = (input: Position): Position => {
  let output: Position;
  switch (input.d) {
    case 'N':
      output = { ...input, y: input.y + 1 };
      break;
    case 'S':
      output = { ...input, y: input.y - 1 };
      break;
    case 'E':
      output = { ...input, x: input.x + 1 };
      break;
    case 'W':
      output = { ...input, x: input.x - 1 };
  }
  return output;
};

const applyRight = (input: Position): Position => {
  let output: Position;
  switch (input.d) {
    case 'N':
      output = { ...input, d: 'E' };
      break;
    case 'E':
      output = { ...input, d: 'S' };
      break;
    case 'S':
      output = { ...input, d: 'W' };
      break;
    case 'W':
      output = { ...input, d: 'N' };
  }
  return output;
};

const applyLeft = (input: Position): Position => {
  let output: Position;
  switch (input.d) {
    case 'N':
      output = { ...input, d: 'W' };
      break;
    case 'W':
      output = { ...input, d: 'S' };
      break;
    case 'S':
      output = { ...input, d: 'E' };
      break;
    case 'E':
      output = { ...input, d: 'N' };
  }
  return output;
};

interface Move {
  position: Position;
  instruction: Instruction;
}

const move = (args: Move): Position => {
  const { position, instruction } = args;
  let nextPosition: Position = position;
  switch (instruction) {
    case 'R':
      nextPosition = applyRight(position);
      break;
    case 'L':
      nextPosition = applyLeft(position);
      break;
    case 'F':
      nextPosition = applyForward(position);
  }

  return nextPosition;
};

const isLost = ({
  topRightCorner,
  position,
}: {
  topRightCorner: { x: number; y: number };
  position: Position;
}): boolean => {
  if (
    position.x < 0 ||
    position.x > topRightCorner.x ||
    position.y < 0 ||
    position.y > topRightCorner.y
  ) {
    return true;
  }
  return false;
};

export const isScent = ({
  scentGrid,
  coordinates,
}: {
  scentGrid: Coordinates[] | [];
  coordinates: Coordinates;
}): boolean => {
  if (scentGrid.length > 0) {
    if (
      scentGrid.find((c) => {
        return isEqual(c, coordinates);
      })
    ) {
      return true;
    }
  }
  return false;
};

export const applyInstructions = ({
  robot,
  scentGrid,
  topRightCorner,
}: {
  robot: Robot;
  scentGrid: Coordinates[];
  topRightCorner: Coordinates;
}): { position: Position; scentGrid: Coordinates[] } => {
  const position = robot.instructions.reduce(
    (position: Position, i: Instruction) => {
      let nextPosition: Position;
      if (!position.lost) {
        nextPosition = move({ position, instruction: i });
        const onScent = isScent({
          scentGrid,
          coordinates: { x: nextPosition.x, y: nextPosition.y },
        });
        nextPosition = { ...nextPosition, onScent };
        if (isLost({ topRightCorner, position: nextPosition })) {
          if (position.onScent) {
            return { ...position, d: nextPosition.d };
          }
          scentGrid.push({ x: position.x, y: position.y });
          return { ...position, lost: true };
        }
        return nextPosition;
      }
      return position;
    },
    robot.initialPosition
  );
  return { position, scentGrid };
};

export const runRobots = ({
  robots,
  upperRightCorner,
}: {
  robots: Robot[];
  upperRightCorner: Coordinates;
}) =>
  robots.reduce(
    ({ positions, scentGrid }: any, robot, i) => {
      const output = applyInstructions({
        robot,
        scentGrid,
        topRightCorner: upperRightCorner,
      });
      positions.push(output.position);
      return { positions, scentGrid };
    },
    { positions: [], scentGrid: [] }
  );
