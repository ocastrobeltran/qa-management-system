import React, { useEffect } from 'react';
import { useForm } from '../../../hooks/useForm';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import { CLIENTS, QA_TEAM, FRONTEND_DEVS, BACKEND_DEVS, PROJECT_MANAGERS } from '../../../utils/constants';
import { validateProject } from '../../../utils/validators';

const ProjectForm = ({ initialData, onSubmit, isEditing = false }) => {
  const { formData, errors, handleChange, handleSubmit, setFormData, setErrors } = useForm({
    initialValues: initialData || {
      name: '',
      client: '',
      status: 'No iniciado',
      qaAssigned: '',
      frontDev: '',
      backDev: '',
      projectManager: '',
      repositoryUrl: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      comments: ''
    },
    onSubmit: (data) => onSubmit(data),
    validate: validateProject
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h2>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
      
      <div className="form-group">
        <Input
          label="Nombre del Proyecto"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
      </div>

      <div className="form-group">
        <Dropdown
          label="Cliente"
          name="client"
          value={formData.client}
          onChange={handleChange}
          options={CLIENTS}
          error={errors.client}
          required
        />
      </div>

      {isEditing && (
        <div className="form-group">
          <Dropdown
            label="Estado"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={['No iniciado', 'Documentación', 'Ejecución', 'Ajustes', 'Finalizado']}
            error={errors.status}
            required
          />
        </div>
      )}

      <div className="form-group">
        <Dropdown
          label="QA Asignado"
          name="qaAssigned"
          value={formData.qaAssigned}
          onChange={handleChange}
          options={QA_TEAM}
          error={errors.qaAssigned}
          required
        />
      </div>

      <div className="form-group">
        <Dropdown
          label="Desarrollador Frontend"
          name="frontDev"
          value={formData.frontDev}
          onChange={handleChange}
          options={FRONTEND_DEVS}
          error={errors.frontDev}
          required
        />
      </div>

      <div className="form-group">
        <Dropdown
          label="Desarrollador Backend"
          name="backDev"
          value={formData.backDev}
          onChange={handleChange}
          options={BACKEND_DEVS}
          error={errors.backDev}
          required
        />
      </div>

      <div className="form-group">
        <Dropdown
          label="Project Manager"
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange}
          options={PROJECT_MANAGERS}
          error={errors.projectManager}
          required
        />
      </div>

      <div className="form-group">
        <Input
          label="URL del Repositorio"
          name="repositoryUrl"
          value={formData.repositoryUrl}
          onChange={handleChange}
          error={errors.repositoryUrl}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <Input
            label="Fecha de Ingreso"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="Fecha de Culminación"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />
        </div>
      </div>

      <div className="form-group">
        <Input
          label="Comentarios"
          name="comments"
          type="textarea"
          value={formData.comments}
          onChange={handleChange}
          error={errors.comments}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary">
          {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
