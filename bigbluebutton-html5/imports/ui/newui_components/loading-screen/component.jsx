import React from 'react';
import { styles } from './styles.scss';

const LoadingScreen = ({ children }) => (
  <div className={styles.background}>
    <h1>Hello</h1>
    {/* <object type="img/svg+xml" data="./loadingicon.svg">
      <img src="./loadingicon.svg"/>
    </object> */}
  </div>
);

export default LoadingScreen;
