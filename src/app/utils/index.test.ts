import { isScent, applyInstructions, runRobots } from './index';
import { initialRobots, upperRightCorner } from '../../__mocks__/example';

describe('isScent()', () => {
  it('should be true when there is a match', () => {
    const output = isScent({
      scentGrid: [{ x: 3, y: 3 }],
      coordinates: { x: 3, y: 3 },
    });
    expect(output).toBe(true);
  });
  it('should be false when there is no match', () => {
    const output = isScent({
      scentGrid: [],
      coordinates: { x: 1, y: 1 },
    });
    expect(output).toBe(false);
  });
});

describe('applyInstructions()', () => {
  it('should move example/robots 1 correctly', () => {
    const output = applyInstructions({
      robot: initialRobots[0],
      scentGrid: [],
      topRightCorner: upperRightCorner,
    });
    expect(output).toEqual({
      position: { x: 1, y: 1, d: 'E', onScent: false },
      scentGrid: [],
    });
  });
  it('should move example/robots 2 correctly', () => {
    const output = applyInstructions({
      robot: initialRobots[1],
      scentGrid: [],
      topRightCorner: upperRightCorner,
    });
    expect(output).toEqual({
      position: { x: 3, y: 3, d: 'N', lost: true, onScent: false },
      scentGrid: [{ x: 3, y: 3 }],
    });
  });
  it('should move example/robots 3 correctly', () => {
    const output = applyInstructions({
      robot: initialRobots[2],
      scentGrid: [{ x: 3, y: 3 }],
      topRightCorner: upperRightCorner,
    });
    expect(output).toEqual({
      position: { x: 2, y: 3, d: 'S', onScent: false },
      scentGrid: [{ x: 3, y: 3 }],
    });
  });
});

describe('runRobots()', () => {
  it('should return correct positions', () => {
    const output = runRobots({ robots: initialRobots, upperRightCorner });
    expect(output).toEqual({
      positions: [
        { x: 1, y: 1, d: 'E', onScent: false },
        { x: 3, y: 3, d: 'N', lost: true, onScent: false },
        { x: 2, y: 3, d: 'S', onScent: false },
      ],
      scentGrid: [{ x: 3, y: 3 }],
    });
  });
});
