import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { isArray } from 'lodash';
import styles from './Input.module.css';
import { InputCoordinate } from './InputCoordinate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export const RobotInput = ({ index, robots, setRobots }: any) => {
  const classes = useStyles();
  const [robot, setRobot] = useState({
    x: robots[index].initialPosition.x,
    y: robots[index].initialPosition.y,
    d: robots[index].initialPosition.d,
    instructions: robots[index].instructions,
  });

  useEffect(() => {
    if (robots.length > 0 && robot && robots[index] !== robot) {
      // if (robots.length > 0 && robot && robots[index] !== robot) {
      setRobots((robots: any) => {
        robots[index].initialPosition = {
          x: parseInt(robot.x),
          y: parseInt(robot.y),
          d: robot.d,
        };
        robots[index].instructions =
          robot.instructions && robot.instructions.length > 0
            ? isArray(robot.instructions)
              ? robot.instructions
              : robot.instructions.split('')
            : [];
        return robots;
      });
    }
  }, [robot, index, robots, setRobots]);

  return (
    <Card style={{ marginBottom: 8, height: 200 }}>
      <CardHeader title={`Robot ${index + 1}`} />
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
          }}>
          <InputCoordinate
            coordinates={robot}
            setCoordinate={setRobot}
            isX={true}
            label={'X'}
          />
          <InputCoordinate
            coordinates={robot}
            setCoordinate={setRobot}
            isX={false}
            label={'Y'}
          />
          <div
            style={{
              width: 60,
              marginLeft: 120,
            }}>
            <label>Direction</label>
            <input
              className={styles.textbox}
              aria-label='Robot direction'
              value={robot.d}
              onKeyPress={(event) => {
                if (
                  !/['N','E','S','W']/.test(event.key) ||
                  robot.d.length === 1
                ) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setRobot({ ...robot, d: e.target.value })}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: 20,
          }}>
          <label>Instructions</label>
          <input
            style={{ flex: 1, fontSize: '16px', padding: '2px' }}
            aria-label='Robot instructions'
            value={robot.instructions}
            onKeyPress={(event) => {
              if (
                !/['L','R','F']/.test(event.key) ||
                robot.instructions.length === 99
              ) {
                event.preventDefault();
              }
            }}
            onChange={(e) =>
              setRobot({ ...robot, instructions: e.target.value })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
