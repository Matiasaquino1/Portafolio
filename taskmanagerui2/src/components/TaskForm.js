import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, taskToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setIsCompleted(taskToEdit.isCompleted);
    } else {
      setTitle('');
      setIsCompleted(false);
    }
  }, [taskToEdit]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }
    onSave({ 
      id: taskToEdit?.id, 
      title, 
      isCompleted 
      // No enviamos CreatedAt, lo maneja el backend
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{taskToEdit ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={e => setIsCompleted(e.target.checked)}
          />
          {' '}Completada
        </label>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn btn-save">Guardar</button>
        {taskToEdit && <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default TaskForm;