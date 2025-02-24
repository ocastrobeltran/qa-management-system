import React from 'react';
import { Link } from 'react-router-dom';
import ProjectStatusBadge from '../ProjectStatusBadge/ProjectStatusBadge';
import { formatDate } from '../../../utils/helpers';

const ProjectCard = ({ project }) => {
  const {
    id,
    name,
    client,
    status,
    qaAssigned,
    frontDev,
    backDev,
    projectManager,
    startDate,
    endDate
  } = project;

  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-name">{name}</h3>
        <ProjectStatusBadge status={status} />
      </div>
      <div className="project-card-body">
        <p><strong>Cliente:</strong> {client}</p>
        <p><strong>QA Asignado:</strong> {qaAssigned}</p>
        <p><strong>Ingreso:</strong> {formatDate(startDate)}</p>
        <p><strong>Finalización:</strong> {endDate ? formatDate(endDate) : 'Pendiente'}</p>
      </div>
      <div className="project-card-footer">
        <Link to={`/projects/${id}`} className="view-details-btn">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;