import React from 'react';
import styles from './ProjectStatusBadge.module.css';

const ProjectStatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'No iniciado':
        return styles.notStarted;
      case 'Documentación':
        return styles.documentation;
      case 'Ejecución':
        return styles.execution;
      case 'Ajustes':
        return styles.adjustments;
      case 'Finalizado':
        return styles.finished;
      default:
        return styles.default;
    }
  };

  return (
    <span className={`${styles.badge} ${getStatusStyle()}`}>
      {status}
    </span>
  );
};

export default ProjectStatusBadge;