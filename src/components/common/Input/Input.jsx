import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = null,
  className = '',
  ...props
}) => {
  const inputId = `input-${name}`;
  const isTextarea = type === 'textarea';
  
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.textarea} ${error ? styles.error : ''}`}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />
      )}
      
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Input;
