import React from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  required = false,
  disabled = false,
  error = null,
  className = '',
  ...props
}) => {
  const dropdownId = `dropdown-${name}`;
  
  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      {label && (
        <label htmlFor={dropdownId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <select
        id={dropdownId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.select} ${error ? styles.error : ''}`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {Array.isArray(options) ? (
          options.map((option, index) => (
            typeof option === 'object' ? (
              <option key={option.value || index} value={option.value}>
                {option.label}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          ))
        ) : null}
      </select>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Dropdown;
