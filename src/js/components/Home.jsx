import React, { useState, useEffect, useCallback } from "react";
import { getTasks, addTask, deleteTask, updateTask, deleteAllTasks } from "./Api";
import { TaskItem } from "./TaskItem";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const refresh = useCallback(async () => {
    const todos = await getTasks(); 
    setTasks(
      todos.map(t => ({ ...t, isEditing: false }))
    );
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleAdd = async () => {
    await addTask("Nueva tarea");
    await refresh();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await refresh();
  };

  const handleToggleEdit = (id) => {
    setTasks((ts) => ts.map(t =>
        t.id === id
          ? { ...t, isEditing: true }
          : t)
    );
  };

  const handleSave = async (id, newLabel) => {
    setTasks(ts =>
      ts.map(t =>
        t.id === id
          ? { ...t, label: newLabel, isEditing: false }
          : t
      )
    );
    await updateTask(id, { label: newLabel, done: false });
    await refresh();
  };

  const handleDeleteAll = async () => {
	try {
	  await deleteAllTasks();
  
	  // Para volver a crear el usuario
	  await fetch("https://playground.4geeks.com/todo/users/ayakta", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify([])
	  });
  
	  await refresh(); // Refrescar la lista
	} catch (e) {
	  console.error(e);
	}
  };
  

  return (
    <div className="container my-4">
      <h1 className="text-center">Lista de tareas</h1>

      {tasks.length === 0 ? (
        <p className="text-center">No hay tareas.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
		  	key={task.id}
		  	task={task}
		  	onToggleEdit={handleToggleEdit} 
		  	onSave={handleSave}         
		  	onDelete={handleDelete}
            isHovered={hoveredId === task.id}
            onHover={setHoveredId}
            onUnhover={() => setHoveredId(null)}
          />
        ))
      )}

      	<div className="text-center mt-3">
        	<button className="btn btn-primary" onClick={handleAdd}>
          		Añadir tarea
        	</button>
			<button onClick={handleDeleteAll} className="btn btn-danger m-2">
  				Borrar todas las tareas
			</button>
      	</div>
    </div>
  );
}
