import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '../../common/Button/Button';
import styles from './ProjectComments.module.css';

const ProjectComments = ({ comments = [], isAdmin = false, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h3 className={styles.commentsTitle}>Comentarios y Actualizaciones</h3>

      {comments.length === 0 ? (
        <p className={styles.noComments}>No hay comentarios aún</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.author}</span>
                <span className={styles.commentDate}>{formatDate(comment.date)}</span>
              </div>
              
              {comment.statusChange && (
                <div className={styles.statusChange}>
                  <span>
                    Cambió el estado de{' '}
                    <span className={styles.oldStatus}>{comment.statusChange.from}</span>
                    {' '}a{' '}
                    <span className={styles.newStatus}>{comment.statusChange.to}</span>
                  </span>
                </div>
              )}
              
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <h4 className={styles.formTitle}>Añadir comentario</h4>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className={styles.commentInput}
            rows={4}
            required
          />
          <Button type="submit" variant="primary" disabled={!newComment.trim()}>
            Añadir Comentario
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProjectComments;