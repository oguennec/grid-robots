import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/';
import styles from './Output.module.css';
import { Position } from '../../app/utils';

export const Output: React.FC<{ positions: Position[] | undefined }> = ({
  positions,
}) => {
  return (
    <div>
      <h1 className={styles.header}>Output</h1>
      {positions &&
        positions.length > 0 &&
        positions.map((p: Position, i: number) => (
          <Card key={i} style={{ marginBottom: 8, height: 200 }}>
            <CardHeader title={`Robot ${i + 1}`} />
            <CardContent>
              <Typography gutterBottom>
                {`${p.x.toString()} ${p.y.toString()} ${p.d} ${
                  p.lost ? 'LOST' : ''
                }`}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
