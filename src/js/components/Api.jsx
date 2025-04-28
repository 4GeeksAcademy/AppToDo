export async function getTasks() {
  const res = await fetch("https://playground.4geeks.com/todo/users/ayakta");
  if (!res.ok) throw new Error("Error al cargar tareas");
  const user = await res.json();
  return user.todos; 
}

export async function addTask(label) {
  const payload = { label, done: false };
  const res = await fetch("https://playground.4geeks.com/todo/todos/ayakta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Error al agregar tarea");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
   method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar tarea");
  return;  
}

export async function updateTask(id, { label, done }) {
  const res = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label, done }),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
}

export async function deleteAllTasks() {
  const res = await fetch("https://playground.4geeks.com/todo/users/ayakta", {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar todas las tareas");
}