import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) return <p>No hay tareas para mostrar.</p>;

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Completada</th>
          <th>Creada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;