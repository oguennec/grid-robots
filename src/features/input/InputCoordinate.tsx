import React from 'react';
import styles from './Input.module.css';

interface Props {
  coordinates: { x: number; y: number };
  setCoordinate: any;
  isX: boolean;
  label?: string;
  width?: number;
}

export const InputCoordinate: React.FC<Props> = ({
  coordinates: { x, y },
  setCoordinate,
  isX,
  label,
  width = 60,
}) => (
  <div
    style={{
      width,
      marginRight: width / 2,
    }}>
    <label>{label}</label>
    <input
      className={styles.textbox}
      value={isX ? x : y}
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      onChange={(e) =>
        setCoordinate({
          x: isX
            ? parseInt(e.target.value || '0') > 50
              ? 50
              : parseInt(e.target.value || '0')
            : x,
          y: isX
            ? y
            : parseInt(e.target.value || '0') > 50
            ? 50
            : parseInt(e.target.value || '0'),
        })
      }
    />
  </div>
);
