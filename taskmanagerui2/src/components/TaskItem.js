import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.isCompleted ? 'Sí' : 'No'}</td>
      <td>{formattedDate}</td>
      <td>
        <button className="btn btn-edit" onClick={() => onEdit(task)}>Editar</button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default TaskItem;