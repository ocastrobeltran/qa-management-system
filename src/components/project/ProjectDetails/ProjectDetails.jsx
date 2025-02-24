import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button/Button';
import ProjectStatusBadge from '../ProjectStatusBadge/ProjectStatusBadge';
import ProjectComments from '../ProjectComments/ProjectComments';
import Modal from '../../common/Modal/Modal';
import { formatDate } from '../../../utils/helpers';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProjectById, updateProjectStatus, addComment, loading, error } = useProjects();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [commentText, setCommentText] = useState('');

  const project = getProjectById(id);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!project) return <div className="not-found">Proyecto no encontrado</div>;

  const handleStatusChange = () => {
    updateProjectStatus(id, newStatus, commentText);
    setShowStatusModal(false);
    setCommentText('');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="project-details">
      <div className="details-header">
        <h2>{project.name}</h2>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="details-actions">
        {isAdmin && (
          <>
            <Button
              variant="primary"
              onClick={() => navigate(`/projects/edit/${id}`)}
            >
              Editar Proyecto
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowStatusModal(true)}
            >
              Cambiar Estado
            </Button>
          </>
        )}
        <Button
          variant="outline"
          onClick={() => navigate('/projects')}
        >
          Volver a la Lista
        </Button>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h3>Información General</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Cliente:</span>
              <span className="detail-value">{project.client}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Estado:</span>
              <span className="detail-value">
                <ProjectStatusBadge status={project.status} />
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">QA Asignado:</span>
              <span className="detail-value">{project.qaAssigned}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Desarrollador Frontend:</span>
              <span className="detail-value">{project.frontDev}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Desarrollador Backend:</span>
              <span className="detail-value">{project.backDev}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Project Manager:</span>
              <span className="detail-value">{project.projectManager}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fecha de Ingreso:</span>
              <span className="detail-value">{formatDate(project.startDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fecha de Culminación:</span>
              <span className="detail-value">
                {project.endDate ? formatDate(project.endDate) : 'Pendiente'}
              </span>
            </div>
            <div className="detail-item full-width">
              <span className="detail-label">URL del Repositorio:</span>
              <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="repo-link">
                {project.repositoryUrl}
              </a>
            </div>
          </div>
        </div>

        <ProjectComments
          comments={project.comments}
          isAdmin={isAdmin}
          onAddComment={(text) => addComment(id, text)}
        />
      </div>

      {showStatusModal && (
        <Modal
          title="Cambiar Estado del Proyecto"
          onClose={() => setShowStatusModal(false)}
        >
          <div className="status-change-form">
            <div className="form-group">
              <label htmlFor="newStatus">Nuevo Estado:</label>
              <select
                id="newStatus"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                <option value="">Selecciona un estado</option>
                <option value="No iniciado">No iniciado</option>
                <option value="Documentación">Documentación</option>
                <option value="Ejecución">Ejecución</option>
                <option value="Ajustes">Ajustes</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="statusComment">Comentario:</label>
              <textarea
                id="statusComment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                placeholder="Agrega un comentario sobre el cambio de estado..."
                required
              />
            </div>
            <div className="modal-actions">
              <Button
                variant="primary"
                onClick={handleStatusChange}
                disabled={!newStatus || !commentText}
              >
                Guardar Cambio
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowStatusModal(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetails;