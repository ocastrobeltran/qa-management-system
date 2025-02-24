// import { useState, useCallback } from 'react';

// export const useForm = ({ initialValues, onSubmit, validate }) => {
//   const [formData, setFormData] = useState(initialValues || {});
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: newValue
//     }));

//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   }, [errors]);

//   const handleSubmit = useCallback((e) => {
//     e.preventDefault();
    
//     if (validate) {
//       const validationErrors = validate(formData);
//       setErrors(validationErrors);
      
//       if (Object.keys(validationErrors).length > 0) {
//         return;
//       }
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       onSubmit(formData);
//     } catch (error) {
//       console.error('Form submission error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [formData, onSubmit, validate]);

//   const resetForm = useCallback(() => {
//     setFormData(initialValues || {});
//     setErrors({});
//   }, [initialValues]);

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     handleChange,
//     handleSubmit,
//     resetForm,
//     setFormData,
//     setErrors
//   };
// };

import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    callback(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};

export { useForm };