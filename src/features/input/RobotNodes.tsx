import React from 'react';
import { RobotInput } from './RobotInput';
import { Robot } from '../../app/utils';

export const RobotNodes: React.FC<any> = ({
  robots,
  setRobots,
}: {
  robots: Robot[];
  setRobots: any;
}) => {
  if (robots.length > 0) {
    return (
      <div>
        {robots.map((r: Robot, i: number) => (
          <RobotInput key={i} index={i} robots={robots} setRobots={setRobots} />
        ))}
      </div>
    );
  }
  return null;
};
