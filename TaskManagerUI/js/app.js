const API_URL = "https://localhost:7052/api/tasks";

async function fetchTasks() {
    try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
    } catch (err) {
        console.error("Error cargando tareas:", err);
    }
}

function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item fade-in";
    
    // ✅ Verificación de seguridad
    const statusClass = task.status ? task.status.toLowerCase() : '';
    
    li.innerHTML = `
      <div>
        <span class="task-title">${task.title}</span>
        <span class="task-date">⏳ ${new Date(task.dueDate).toLocaleDateString()}</span>
        <span class="task-status ${statusClass}">${task.status || ''}</span>
      </div>
      <button class="btn btn-danger" onclick="deleteTask(${task.id})">Eliminar</button>
    `;
    list.appendChild(li);
  });
}


async function addTask(e) {
    e.preventDefault();
    const title = document.getElementById("titleInput").value;
    const dueDate = document.getElementById("dueDateInput").value;
    const status = document.getElementById("statusInput").value;
    
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, dueDate, status })
        });
        if (res.ok) {
          document.getElementById("taskForm").reset();
          fetchTasks();
        }
        } catch (err) {
            console.error("Error agregando tarea:", err);
        }
    }

async function deleteTask(id) {
    if (!confirm("¿Seguro que querés eliminar esta tarea?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchTasks();
    } catch (err) {
        console.error("Error eliminando tarea:", err);
    }
}

async function searchTask() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        fetchTasks();
        return;
    }
    try {
        let res;
        if (!isNaN(query)) {
            res = await fetch(`${API_URL}/${query}`);
            if (res.ok) {
                const task = await res.json();
                renderTasks([task]);
                return;
            }
        }
        res = await fetch(`${API_URL}/search/${query}`);
        if (res.ok) {
            const tasks = await res.json();
            renderTasks(tasks);
        } 
        else {
          alert("No se encontraron tareas.");
        }
        } catch (err) {
            console.error("Error buscando tarea:", err);
        }
    }
    document.getElementById("taskForm").addEventListener("submit", addTask);
    fetchTasks();
