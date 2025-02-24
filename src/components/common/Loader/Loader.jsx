import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', text = 'Cargando...', fullPage = false }) => {
  const loaderClasses = `
    ${styles.loader}
    ${styles[size]}
    ${fullPage ? styles.fullPage : ''}
  `.trim();

  return (
    <div className={loaderClasses}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;

