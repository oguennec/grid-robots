import React, { useState } from 'react';
import styles from './Input.module.css';
import { Robot, Coordinates, applyInstructions } from '../../app/utils';
import { RobotNodes } from './RobotNodes';
import { InputCoordinate } from './InputCoordinate';
import {
  exampleRobots,
  upperRightCorner as initRightCorner,
} from '../../__mocks__/example';
export interface InputProps {
  upperRightCorner: Coordinates;
  setUpperRightCorner: any;
  setOutput: any;
}

const initRobots: Robot | any[] = [];

export const Input: React.FC<InputProps> = (props) => {
  const { upperRightCorner, setUpperRightCorner, setOutput } = props;
  const [robots, setRobots] = useState(initRobots);

  const setExample = () => {
    setUpperRightCorner(initRightCorner);
    setOutput();
    setRobots(exampleRobots);
  };

  const reset = () => {
    setUpperRightCorner({ x: 0, y: 0 });
    setRobots([]);
    setOutput();
  };

  const addRobot = () => {
    const newRobot: Robot = {
      initialPosition: { x: 0, y: 0, d: 'E' },
      instructions: [],
    };
    setRobots((robots: Robot[]) => [...robots, newRobot]);
  };

  const handleRun = () => {
    if (robots && robots.length > 0) {
      const outputs = robots.reduce(
        ({ positions, scentGrid }: any, robot) => {
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
      setOutput(outputs.positions);
    }
  };

  return (
    <div>
      {/* <h1 className={styles.button}>Input</h1> */}
      <div className={styles.row}>
        <button className={styles.button} onClick={() => addRobot()}>
          Add Robot
        </button>
        <button className={styles.button} onClick={() => setExample()}>
          Set Example
        </button>
        <button className={styles.button} onClick={() => reset()}>
          Reset
        </button>
        <button className={styles.button} onClick={() => handleRun()}>
          Run
        </button>
      </div>
      <div className={styles.row} style={{ alignItems: 'flex-end' }}>
        <label style={{ marginRight: 60 }}>Grid size</label>
        <InputCoordinate
          coordinates={upperRightCorner}
          setCoordinate={setUpperRightCorner}
          isX={true}
          label={'X'}
        />
        <InputCoordinate
          coordinates={upperRightCorner}
          setCoordinate={setUpperRightCorner}
          isX={false}
          label={'Y'}
        />
      </div>
      <RobotNodes robots={robots} setRobots={setRobots} />
    </div>
  );
};
