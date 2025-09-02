import React, { useState, useEffect } from 'react';
import api from './Api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/');
      setTasks(res.data);
    } catch (error) {
      console.error('Error al obtener tareas', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task) => {
    try {
      if (task.id) {
        // Editar
        await api.put(`/${task.id}`, task);
      } else {
        // Agregar
        await api.post('/', task);
      }
      setTaskToEdit(null);
      fetchTasks();
    } catch (error) {
      console.error('Error al guardar tarea', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await api.delete(`/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error al eliminar tarea', error);
      }
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <TaskList tasks={filteredTasks} onEdit={setTaskToEdit} onDelete={handleDelete} />
      <TaskForm onSave={handleSave} taskToEdit={taskToEdit} onCancel={() => setTaskToEdit(null)} />
    </div>
  );
}

export default App;