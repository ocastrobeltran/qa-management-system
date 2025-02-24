import React from 'react';
import Dropdown from '../../common/Dropdown/Dropdown';
import Button from '../../common/Button/Button';
import styles from './ProjectFilters.module.css';
import { 
  CLIENTS, 
  QA_TEAM, 
  PROJECT_STATUSES 
} from '../../../utils/constants';

const ProjectFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      client: '',
      qaAssigned: ''
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <h3 className={styles.filtersTitle}>Filtros</h3>
      <div className={styles.filtersGrid}>
        <Dropdown
          name="status"
          label="Estado"
          value={filters.status}
          onChange={handleFilterChange}
          options={[{ value: '', label: 'Todos los estados' }, ...PROJECT_STATUSES.map(status => ({ value: status, label: status }))]}
          className={styles.filterItem}
        />
        
        <Dropdown
          name="client"
          label="Cliente"
          value={filters.client}
          onChange={handleFilterChange}
          options={[{ value: '', label: 'Todos los clientes' }, ...CLIENTS.map(client => ({ value: client, label: client }))]}
          className={styles.filterItem}
        />
        
        <Dropdown
          name="qaAssigned"
          label="QA Asignado"
          value={filters.qaAssigned}
          onChange={handleFilterChange}
          options={[{ value: '', label: 'Todos los QA' }, ...QA_TEAM.map(qa => ({ value: qa, label: qa }))]}
          className={styles.filterItem}
        />
        
        <div className={styles.filterActions}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={clearFilters}
            className={styles.clearButton}
          >
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;