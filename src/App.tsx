import React, { useState } from 'react';
import { Input, Output, InputProps } from './features';
import styles from './App.module.css';

export const App: React.FC<{}> = () => {
  const [upperRightCorner, setUpperRightCorner] = useState({ x: 0, y: 0 });
  const [output, setOutput] = useState([]);

  const inputProps: InputProps = {
    upperRightCorner,
    setUpperRightCorner,
    setOutput,
  };

  return (
    <div className={styles.app}>
      <div className={styles.input}>
        <Input {...inputProps} />
      </div>
      <div className={styles.divider} />
      <div className={styles.output}>
        <Output positions={output} />
      </div>
    </div>
  );
};

export default App;
